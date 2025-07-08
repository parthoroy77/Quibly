import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "../../handlers/ApiResponse";
import asyncHandler from "../../handlers/asyncHandler";
import { QuizServices } from "./quiz.services";

const createQuiz = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await QuizServices.create({ ...payload, userId: req.user.id });
  ApiResponse(res, {
    data: result,
    message: "Quiz created successfully",
    success: true,
    statusCode: StatusCodes.CREATED,
  });
});

const getAllQuiz = asyncHandler(async (_, res) => {
  const result = await QuizServices.getAll();
  ApiResponse(res, {
    data: result,
    message: "Quiz retrieved successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const getAllQuizByUserId = asyncHandler(async (req, res) => {
  const result = await QuizServices.getByUserId(req.user.id!);
  ApiResponse(res, {
    data: result,
    message: "Quiz retrieved successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const QuizControllers = {
  createQuiz,
  getAllQuiz,
  getAllQuizByUserId,
};
