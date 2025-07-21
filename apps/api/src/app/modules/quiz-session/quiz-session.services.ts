import db from "@quibly/database";
import { generateUniqueId } from "@quibly/utils/functions";
import { CreateQuizSessionFormData } from "@quibly/utils/validations";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";

const create = async (
  { quizId, type, startTime: rawStartTime, endTime: rawEndTime, title, description }: CreateQuizSessionFormData,
  userId: string
) => {
  const now = new Date();
  const startTime = new Date(rawStartTime);
  const endTime = rawEndTime && new Date(rawEndTime);

  if (startTime < now) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Start time cannot be in the past");
  }

  const quiz = await db.quiz.findUnique({
    where: { id: quizId },
    select: {
      questions: {
        select: { timeLimit: true },
      },
    },
  });

  if (!quiz) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Quiz not found");
  }

  if (quiz.questions.length === 0) {
    throw new ApiError(StatusCodes.NOT_ACCEPTABLE, "No questions found in quiz to host a session");
  }

  const totalEstimateTime = quiz.questions.reduce((sum, q) => sum + q.timeLimit, 0);

  if (type === "scheduled") {
    if (!endTime) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "End time is required for scheduled sessions");
    }

    const sessionDuration = (endTime.getTime() - startTime.getTime()) / 1000 / 60; // in minutes

    if (sessionDuration < totalEstimateTime) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        "Session duration must be longer than total time required for all questions"
      );
    }

    const sessionSlug = generateUniqueId("SESSION-");

    return db.quizSession.create({
      data: {
        quizId,
        type,
        startTime,
        endTime,
        title,
        description,
        userId,
        sessionSlug,
      },
    });
  }

  if (type === "live") {
    const sessionCode = generateUniqueId("ROOM-");

    return db.quizSession.create({
      data: {
        quizId,
        type,
        startTime,
        title,
        description,
        userId,
        sessionCode,
      },
    });
  }

  throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid session type");
};

export const QuizSessionServices = {
  create,
};
