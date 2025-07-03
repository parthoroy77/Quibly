import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../handlers/ApiError";

// TODO: Might not needed this still added if i feel any need

/**
 * The role matcher to match origin and user.
 * please use auth middleware before using roleMatcher.
 */

export const roleMatcher = (req: Request, _res: Response, next: NextFunction) => {
  const userRole = req?.user?.role;
  const originRole = req?.originRole;

  if (!originRole) {
    // If no origin role is set (e.g., server-to-server requests), skip the check
    return next();
  }

  if (!userRole) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User is not authorized!");
  }

  if (originRole !== userRole) {
    throw new ApiError(StatusCodes.FORBIDDEN, "User doesn't have the permission to do this!");
  }

  next();
};
