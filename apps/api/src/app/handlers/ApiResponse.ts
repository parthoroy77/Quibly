import { Response } from "express";
export type TMeta = {
  page: number;
  limit: number;
  total: number;
};

type ApiResponseParams<T> = {
  statusCode: number;
  data: T;
  message: string;
  success: boolean;
  meta?: TMeta;
};

const ApiResponse = <T>(res: Response, { statusCode, data, message, success, meta }: ApiResponseParams<T>) => {
  return res.status(statusCode).json({
    success,
    message,
    data,
    statusCode,
    meta,
  });
};

export { ApiResponse };
