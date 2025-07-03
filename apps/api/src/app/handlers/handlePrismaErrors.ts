import { Prisma } from "@quibly/database/client";
import { StatusCodes } from "http-status-codes";
import { TGenericErrorResponse } from "../interface/error";

// Helper function to create error responses
const createErrorResponse = (
  statusCode: number,
  message: string,
  path: string,
  errorMessage: string
): TGenericErrorResponse => {
  return {
    statusCode,
    message,
    errorSources: [{ path, message: errorMessage }],
  };
};

// Helper function to handle all prisma error
export const handlePrismaError = (error: Error): TGenericErrorResponse => {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handleClientKnownError(error);
  } else if (error instanceof Prisma.PrismaClientValidationError) {
    return handleValidationError(error);
  } else if (error instanceof Prisma.PrismaClientRustPanicError) {
    return handleRustPanicError();
  } else if (error instanceof Prisma.PrismaClientInitializationError) {
    return handleInitializationError();
  } else if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return handleUnknownError();
  }

  return {
    statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
    message: "An unexpected database error occurred.",
    errorSources: [{ path: "unknown", message: "Internal server error" }],
  };
};

// Handles known client request errors with specific codes
const handleClientKnownError = (error: Prisma.PrismaClientKnownRequestError): TGenericErrorResponse => {
  const path = (error.meta?.target as string[] | undefined)?.[0] || "unknown";

  switch (error.code) {
    case "P2002":
      return createErrorResponse(
        StatusCodes.CONFLICT,
        "Unique constraint violation",
        path,
        `A record with this ${path} already exists.`
      );
    case "P2025":
      return createErrorResponse(StatusCodes.NOT_FOUND, "Not found", "id", "The requested resource does not exist.");
    case "P2011":
      return createErrorResponse(
        StatusCodes.BAD_REQUEST,
        "Null constraint violation",
        path,
        `The ${path} field cannot be null.`
      );
    case "P2014":
      return createErrorResponse(
        StatusCodes.BAD_REQUEST,
        "Invalid ID",
        "id",
        "The provided ID is invalid or does not exist."
      );
    case "P2003":
      return createErrorResponse(
        StatusCodes.BAD_REQUEST,
        "Foreign key constraint failed",
        "unknown",
        "A related record does not exist."
      );
    default:
      return createErrorResponse(StatusCodes.BAD_REQUEST, "Database error", path, error.message);
  }
};

// Handles validation errors
const handleValidationError = (error: Prisma.PrismaClientValidationError): TGenericErrorResponse => {
  const match = error.message.match(/Invalid value for argument `(\w+)`/);
  const path = match ? match[1] : "unknown";

  return createErrorResponse(StatusCodes.BAD_REQUEST, "Validation error", path as string, error.message);
};

// Handles rust panic errors
const handleRustPanicError = (): TGenericErrorResponse => {
  return createErrorResponse(
    StatusCodes.INTERNAL_SERVER_ERROR,
    "Critical database error",
    "prisma",
    "An unexpected error occurred in the database client."
  );
};

// Handles initialization errors (e.g., database connection issues)
const handleInitializationError = (): TGenericErrorResponse => {
  return createErrorResponse(
    StatusCodes.SERVICE_UNAVAILABLE,
    "Database connection error",
    "prisma",
    "Unable to connect to the database. Please try again later."
  );
};

// Handles unknown request errors
const handleUnknownError = (): TGenericErrorResponse => {
  return createErrorResponse(
    StatusCodes.INTERNAL_SERVER_ERROR,
    "Unknown database error",
    "unknown",
    "An unexpected error occurred while processing your request."
  );
};
