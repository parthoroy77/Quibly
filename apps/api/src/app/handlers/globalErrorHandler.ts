import { Prisma } from "@quibly/database/client";
import { ZodError } from "@quibly/utils/validations";
import { ErrorRequestHandler } from "express";
import config from "../config";
import logger from "../logger";
import { ApiError } from "./ApiError";
import handleApiError from "./handleAppError";
import { handlePrismaError } from "./handlePrismaErrors";
import handleZodError from "./handleZodError";

const globalErrorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  const success = false;
  let statusCode = 500;
  let message = error.message || "Internal Server Error";
  let errorSources = null;

  if (config.NODE_ENV === "development") {
    logger.error(error.message);
  }

  // handle prisma errors
  if (
    error instanceof Prisma.PrismaClientKnownRequestError ||
    error instanceof Prisma.PrismaClientValidationError ||
    error instanceof Prisma.PrismaClientRustPanicError ||
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientUnknownRequestError
  ) {
    const prismaError = handlePrismaError(error);
    statusCode = prismaError.statusCode;
    message = prismaError.message;
    errorSources = prismaError.errorSources;
  }

  // handle zod error
  if (error instanceof ZodError) {
    const simplifiedError = handleZodError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorSources = simplifiedError.errorSources;
  }

  //handle instance of app error
  if (error instanceof ApiError) {
    const simplifiedError = handleApiError(error);
    message = simplifiedError.message;
    statusCode = simplifiedError.statusCode;
    errorSources = simplifiedError.errorSources;
  }
  // send response
  res.status(statusCode).json({
    success,
    message,
    errorSources,
    stack: config.NODE_ENV === "development" ? error?.stack : null,
  });
};

export default globalErrorHandler;
