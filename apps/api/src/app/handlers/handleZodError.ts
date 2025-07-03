import { ZodError, ZodIssue } from "@quibly/utils/validations";
import { StatusCodes } from "http-status-codes";
import { TErrorSource, TGenericErrorResponse } from "../interface/error";

const handleZodError = (error: ZodError): TGenericErrorResponse => {
  const statusCode = StatusCodes.BAD_REQUEST;
  let message = "Zod Validation error.";
  const errorSources: TErrorSource[] = error.issues.map((issue: ZodIssue): TErrorSource => {
    message = `${issue.path[0]} is ${issue.message.toLowerCase()}.`;
    return {
      message: `${issue.path[0]} is ${issue.message}.`,
      path: `${issue.path[0]}`,
    };
  });

  return {
    message,
    errorSources,
    statusCode,
  };
};

export default handleZodError;
