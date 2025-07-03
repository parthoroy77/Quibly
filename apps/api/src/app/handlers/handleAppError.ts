import { TErrorSource, TGenericErrorResponse } from "../interface/error";
import { ApiError } from "./ApiError";

const handleApiError = (error: ApiError): TGenericErrorResponse => {
  const message = error.message || "Something went wrong";
  const statusCode = error.statusCode;
  const errorSources: TErrorSource[] = [
    {
      message: error.message,
      path: "",
    },
  ];

  return {
    message,
    statusCode,
    errorSources,
  };
};

export default handleApiError;
