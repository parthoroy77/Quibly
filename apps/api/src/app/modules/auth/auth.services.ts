import db from "@quibly/database";
import { RefreshToken, Session, User, UserRole } from "@quibly/database/client";
import { parseTimeToDate } from "@quibly/utils/functions";
import { StatusCodes } from "http-status-codes";
import config from "../../config";
import { ApiError } from "../../handlers/ApiError";
import { TLoginPayload, TLogoutPayload, TRegistrationPayload } from "./auth.types";
import { comparePassword, generateSessionAndRefreshToken, hashPassword, verifyToken } from "./auth.utils";

// registration
const register = async (payload: TRegistrationPayload): Promise<void> => {
  const { email, password, fullName } = payload;

  // check user exists
  const isExists = await db.user.findUnique({ where: { email } });

  if (isExists) {
    throw new ApiError(StatusCodes.CONFLICT, "User already exists with this email");
  }

  // hash password
  const encryptedPassword = await hashPassword(password);

  // create new user
  const newUser = await db.user.create({
    data: {
      email,
      fullName,
      password: encryptedPassword,
    },
  });

  if (!newUser) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Registration failed");
  }

  return;
};

const login = async (payload: TLoginPayload): Promise<{ session: Session; refreshToken: RefreshToken }> => {
  // check if user exists
  const isUserExists = await db.user.findUnique({
    where: {
      email: payload.email,
      role: payload.role,
    },
    select: { id: true, password: true, email: true, emailVerified: true, status: true, role: true },
  });

  // if not exist return error
  if (!isUserExists) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password.");
  }

  // if not verified account then verify first
  if (isUserExists.status !== "active" || !isUserExists.emailVerified) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "Please verify your account first.");
  }

  // check password valid or not
  const isPasswordValid = await comparePassword(payload.password, isUserExists.password as string);

  if (!isPasswordValid) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid email or password");
  }

  // generate session and refresh tokens
  const { newSessionToken, newRefreshToken } = await generateSessionAndRefreshToken(isUserExists.id);

  const [session, refreshToken] = await db.$transaction([
    db.session.create({
      data: {
        userId: isUserExists.id,
        token: newSessionToken,
        expiresAt: parseTimeToDate(config.jwt_access_token_expires_in as string),
      },
    }),
    db.refreshToken.create({
      data: {
        token: newRefreshToken,
        userId: isUserExists.id,
        expiresAt: parseTimeToDate(config.jwt_refresh_token_expires_in as string),
      },
    }),
  ]);

  return {
    session,
    refreshToken,
  };
};

const logout = async (payload: TLogoutPayload): Promise<void> => {
  await db.$transaction([
    db.session.deleteMany({
      where: {
        userId: payload.userId,
      },
    }),
    db.refreshToken.deleteMany({
      where: {
        userId: payload.userId,
      },
    }),
  ]);
  return;
};

// refresh session
const refreshSession = async (payload: string): Promise<{ session: Session; refreshToken: RefreshToken }> => {
  const currentTime = new Date();
  if (!payload) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Session refresh credential not found!");
  }

  // Verify the refresh token payload
  const decodedCred = await verifyToken(payload, config.jwt_refresh_secret!);

  if (!decodedCred || !decodedCred.userId) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid or malformed refresh credential");
  }

  // Find the refresh token record in the database
  const tokenRecord = await db.refreshToken.findUnique({
    where: {
      token: payload,
      userId: decodedCred.userId!,
      expiresAt: {
        gt: currentTime, // Ensure the token is still valid
      },
    },
    include: {
      user: {
        select: {
          id: true,
          role: true,
        },
      },
    },
  });
  if (!tokenRecord) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Refresh credential invalid or expired!");
  }

  // Generate new session and refresh token
  const { newRefreshToken, newSessionToken } = await generateSessionAndRefreshToken(tokenRecord.user.id);

  // Ensure tokens are successfully generated
  if (!newSessionToken || !newRefreshToken) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "Failed to generate new session or refresh token.");
  }

  // Perform database updates inside a transaction
  const { session, refreshToken } = await db.$transaction(async (tx) => {
    // Delete old session
    await tx.session.deleteMany({
      where: {
        userId: tokenRecord.user.id,
      },
    });

    // Delete old refresh token
    await tx.refreshToken.deleteMany({
      where: {
        userId: tokenRecord.user.id,
        token: payload,
      },
    });

    // Create new session
    const session = await tx.session.create({
      data: {
        userId: tokenRecord.user.id,
        token: newSessionToken,
        expiresAt: parseTimeToDate(config.jwt_access_token_expires_in!),
      },
    });

    // Create new refresh token
    const refreshToken = await tx.refreshToken.create({
      data: {
        userId: tokenRecord.user.id,
        token: newRefreshToken,
        expiresAt: parseTimeToDate(config.jwt_refresh_token_expires_in!),
      },
    });

    return { session, refreshToken };
  });
  // Return new session and refresh token
  return { session, refreshToken };
};

const getSession = async (payload: string): Promise<{ session: Session; user: Omit<User, "password"> }> => {
  const session = await db.session.findFirst({
    where: {
      userId: payload,
    },
    include: {
      user: { omit: { password: true } },
    },
  });

  if (!session) {
    throw new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, "An internal server error occurred");
  }

  return {
    session: session,
    user: session.user,
  };
};

const onboarding = async (role: UserRole, userId: string) => {
  if (role === "admin") {
    throw new ApiError(StatusCodes.FORBIDDEN, "Forbidden.");
  }

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (user.role) {
    throw new ApiError(StatusCodes.CONFLICT, "User already onboarded");
  }

  await db.user.update({ data: { role }, where: { id: user.id } });

  return;
};

export const AuthServices = {
  register,
  login,
  logout,
  refreshSession,
  getSession,
  onboarding,
};
