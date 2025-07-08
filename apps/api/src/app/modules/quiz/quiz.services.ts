import db from "@quibly/database";
import { QuizCreatePayload } from "./quiz.types";

const create = async (payload: QuizCreatePayload) => {
  return await db.quiz.create({ data: payload });
};

// TODO: Add filters
const getAll = async () => {
  return await db.quiz.findMany({
    include: {
      questions: {
        select: { _count: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const getByUserId = async (userId: string) => {
  return await db.quiz.findMany({
    where: { userId },
    include: {
      questions: {
        select: { _count: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const QuizServices = { create, getAll, getByUserId };
