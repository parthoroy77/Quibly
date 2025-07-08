import db from "@quibly/database";
import { UserRole } from "@quibly/database/client";
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import config from "../config";
import { ApiError } from "../handlers/ApiError";
import asyncHandler from "../handlers/asyncHandler";
import { verifyToken } from "../modules/auth/auth.utils";

// Helper function to verify session
const verifySession = async (token: string, userId: string) => {
  const session = await db.session.findFirst({
    where: {
      token,
      userId,
      expiresAt: {
        gt: new Date(),
      },
    },
  });

  if (!session || session.expiresAt < new Date()) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Session is invalid or has expired. Please log in again.");
  }

  return session;
};

// Helper function to fetch the user
const fetchUser = async (userId: string) => {
  const user = await db.user.findUnique({
    where: {
      id: userId,
      status: "active",
      emailVerified: true,
    },
  });

  if (!user) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "User account is inactive or email is not verified.");
  }

  return user;
};

// Auth middleware
const authMiddleware = (...requiredRoles: UserRole[]) => {
  return asyncHandler(async (req: Request, _res: Response, next: NextFunction) => {
    const session_token = req.cookies.session_token || req.headers.authorization?.split(" ")[1];

    // Check if session token exists
    if (!session_token) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "No session credential found. Please log in.");
    }

    // Verify the session token
    const decode = await verifyToken(session_token!, config.jwt_access_secret as string);
    if (!decode) {
      throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid session credential. Please log in again.");
    }

    // Verify session validity
    const session = await verifySession(session_token!, decode.userId as string);

    // Fetch the user and check account status
    const user = await fetchUser(session.userId);
    // Check if the user has the required role(s)
    if (requiredRoles.length > 0 && !requiredRoles.includes(user.role as UserRole)) {
      throw new ApiError(StatusCodes.FORBIDDEN, "You do not have the required permissions to access this resource.");
    }

    // Attach the user object to the request
    req.user = user;
    next();
  });
};

export default authMiddleware;
