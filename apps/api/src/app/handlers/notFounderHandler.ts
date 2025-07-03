import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

const notFoundHandler = (req: Request, res: Response, next: NextFunction): any => {
  return res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: "Requested Api Not Found",
  });
};

export default notFoundHandler;
