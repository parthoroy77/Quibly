import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
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

const getQuizWithQuestion = asyncHandler(async (req, res) => {
  const { quizId } = req.params;

  if (!quizId) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Quiz identifier not found!");
  }

  const result = await QuizServices.getWithQuestions(quizId);

  ApiResponse(res, {
    data: result,
    message: "Quiz and questions retrieved successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const batchQuizQuestions = asyncHandler(async (req, res) => {
  const { quizId } = req.params;
  if (!quizId) throw new ApiError(StatusCodes.NOT_FOUND, "Quiz identifier not found!");

  const payload = req.body;

  await QuizServices.batchQuestions({ ...payload, quizId }, req.user.id!);

  ApiResponse(res, {
    data: {},
    message: "Questions handled successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

const generateQuizQuestionsFromAI = asyncHandler(async (req, res) => {
  const payload = req.body;
  const result = await QuizServices.generateQuestions(payload);
  ApiResponse(res, {
    data: result,
    message: "Questions generated successfully",
    success: true,
    statusCode: StatusCodes.OK,
  });
});

export const QuizControllers = {
  createQuiz,
  getAllQuiz,
  getAllQuizByUserId,
  getQuizWithQuestion,
  batchQuizQuestions,
  generateQuizQuestionsFromAI,
};
