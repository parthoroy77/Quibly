import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { QuizSessionServices } from "./quiz-session.services";

const createQuizSession = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await QuizSessionServices.create(payload, req.user.id!);
  ApiResponse(res, {
    data: result,
    message: "Quiz session created successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const getAllSessionsByUserId = asyncHandler(async (req, res) => {
  const result = await QuizSessionServices.getByUserId(req.user.id!);
  ApiResponse(res, {
    data: result,
    message: "Sessions retrieved successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});
export const QuizSessionControllers = { createQuizSession, getAllSessionsByUserId };
