import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { AuthServices } from "./auth.services";

const userRegistration = asyncHandler(async (req, res) => {
  const payload = req.body;

  await AuthServices.register(payload);

  ApiResponse(res, {
    data: {},
    message: "User registered successfully. Check your email for verification.",
    success: true,
    statusCode: StatusCodes.CREATED,
  });
});

const userLogin = asyncHandler(async (req, res) => {
  const payload = req.body;
  const { session, refreshToken } = await AuthServices.login(payload);

  res.cookie("session_token", session.token, {
    httpOnly: true,
    secure: true,
    // Should not add sameSite none. Added because of not having same domain.
    sameSite: "none",
    path: "/",
    expires: new Date(session.expiresAt),
  });

  res.cookie("refresh_token", refreshToken.token, {
    httpOnly: true,
    secure: true,
    // Should not add sameSite none. Added because of not having same domain.
    sameSite: "none",
    path: "/",
    expires: new Date(refreshToken.expiresAt),
  });

  ApiResponse(res, {
    data: {
      session,
      refreshToken,
    },
    message: "User logged in successfully.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userLogout = asyncHandler(async (req, res) => {
  const { session_token } = req.cookies;
  const response = await AuthServices.logout({ userId: req.user.id!, sessionToken: session_token });

  res.clearCookie("session_token");
  res.clearCookie("refresh_token");

  ApiResponse(res, {
    data: response,
    message: "User logged out successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userSessionRefresh = asyncHandler(async (req, res) => {
  const { refresh_token } = req.cookies;
  const { session, refreshToken } = await AuthServices.refreshSession(refresh_token);
  res.cookie("session_token", session.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(session.expiresAt),
  });

  res.cookie("refresh_token", refreshToken.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    expires: new Date(refreshToken.expiresAt),
  });

  ApiResponse(res, {
    data: {
      session,
      refreshToken,
    },
    message: "New session created successfully.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const getUserSession = asyncHandler(async (req, res) => {
  ApiResponse(res, {
    data: {
      user: req.user,
    },
    message: "User session retrieve successfully.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const userOnboarding = asyncHandler(async (req, res) => {
  const { role } = req.body;

  await AuthServices.onboarding(role, req.user.id!);

  ApiResponse(res, {
    data: {},
    message: "User onboarding successfully.",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const AuthControllers = {
  userRegistration,
  userLogin,
  userLogout,
  userSessionRefresh,
  userOnboarding,
  getUserSession,
};
