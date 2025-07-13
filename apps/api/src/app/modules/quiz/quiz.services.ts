import db from "@quibly/database";
import { Prisma } from "@quibly/database/client";
import { StatusCodes } from "http-status-codes";
import { ApiError } from "../../handlers/ApiError";
import { BatchQuizQuestion, QuizCreatePayload } from "./quiz.types";

const create = async (payload: QuizCreatePayload) => {
  return await db.quiz.create({ data: payload });
};

// TODO: Add filters
const getAll = async () => {
  const quizzes = await db.quiz.findMany({
    include: {
      questions: {
        select: { id: true, timeLimit: true, points: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const result = quizzes.map((q) => {
    const { questions, ...rest } = q;
    return {
      ...rest,
      questionCount: q.questions.length,
      estimateTime: q.questions.reduce((total, el) => (total += el.timeLimit), 0),
      totalPoints: q.questions.reduce((total, el) => (total += el.points), 0),
    };
  });

  return result;
};

const getByUserId = async (userId: string) => {
  const quizzes = await db.quiz.findMany({
    where: { userId },
    include: {
      questions: {
        select: { id: true, timeLimit: true, points: true },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const result = quizzes.map((q) => {
    const { questions, ...rest } = q;
    return {
      ...rest,
      questionCount: q.questions.length,
      estimateTime: q.questions.reduce((total, el) => (total += el.timeLimit), 0),
      totalPoints: q.questions.reduce((total, el) => (total += el.points), 0),
    };
  });

  return result;
};

const getWithQuestions = async (id: string) => {
  return await db.quiz.findUnique({
    where: {
      id,
    },
    include: {
      questions: {
        include: {
          options: {
            include: {
              correctAnswer: true,
              correctMultiSelectOptions: true,
            },
          },
        },
      },
    },
  });
};

const batchQuestions = async ({ quizId, create, update, remove }: BatchQuizQuestion, userId: string) => {
  const quiz = await db.quiz.findUnique({
    where: {
      id: quizId,
      userId,
    },
  });

  if (!quiz) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Quiz not found!");
  }

  await db.$transaction(async (tx) => {
    //  DELETE
    if (remove.length > 0) {
      await tx.correctAnswer.deleteMany({
        where: { questionId: { in: remove } },
      });
      await tx.correctMultiSelectOption.deleteMany({
        where: { questionId: { in: remove } },
      });
      await tx.questionOption.deleteMany({
        where: { questionId: { in: remove } },
      });
      await tx.question.deleteMany({
        where: { id: { in: remove } },
      });
    }

    // CREATE
    if (create.length > 0) {
      for (const q of create) {
        const question = await tx.question.create({
          data: {
            quizId,
            text: q.text,
            index: +q.index,
            timeLimit: +q.timeLimit,
            points: +q.points,
            type: q.type,
            required: q.required,
            randomizeOrder: q.randomizeOrder,
            mediaUrl: null,
            explanation: q.explanation ?? null,
          },
        });
        if (q.type !== "short_answer") {
          for (const o of q.options) {
            await tx.questionOption.create({
              data: {
                text: o.text,
                index: o.index,
                questionId: question.id,
                correctAnswer:
                  question.type !== "multiple_choice_multi" && o.isCorrect
                    ? { create: { questionId: question.id } }
                    : undefined,
                correctMultiSelectOptions:
                  question.type === "multiple_choice_multi" && o.isCorrect
                    ? { create: { questionId: question.id } }
                    : undefined,
              },
            });
          }
        } else {
          await tx.correctAnswer.create({
            data: {
              questionId: question.id,
              textAnswer: q.options[0]!.correctAnswer,
            },
          });
        }
      }
    }

    // UPDATE
    if (update.length > 0) {
      for (const q of update) {
        const dbQsn = await tx.question.findUnique({
          where: { id: q.questionId },
        });

        if (!dbQsn) {
          throw new ApiError(StatusCodes.NOT_FOUND, "Question not found");
        }

        // Define the fields to check for differences
        const fieldsToCheck: Partial<Record<keyof typeof q, any>> = {
          text: q.text,
          points: q.points,
          explanation: q.explanation ?? null,
          required: q.required,
          randomizeOrder: q.randomizeOrder,
          type: q.type,
          index: q.index,
          timeLimit: q.timeLimit,
        };

        const updateData: Prisma.QuestionUpdateArgs["data"] = {};

        for (const [key, value] of Object.entries(fieldsToCheck)) {
          const dbValue = dbQsn[key as keyof typeof dbQsn];
          if (dbValue !== value) {
            updateData[key as keyof Prisma.QuestionUpdateArgs["data"]] = value;
          }
        }

        if (Object.keys(updateData).length > 0) {
          await tx.question.update({
            where: { id: q.questionId },
            data: updateData,
          });
        }
        if (q.options.length > 0) {
          await tx.questionOption.deleteMany({
            where: { questionId: dbQsn.id },
          });
          await tx.correctAnswer.deleteMany({ where: { questionId: dbQsn.id } });
          await tx.correctMultiSelectOption.deleteMany({ where: { questionId: dbQsn.id } });

          if (q.type !== "short_answer") {
            for (const o of q.options) {
              await tx.questionOption.create({
                data: {
                  text: o.text,
                  index: o.index,
                  questionId: dbQsn.id,
                  correctAnswer:
                    dbQsn.type !== "multiple_choice_multi" && o.isCorrect
                      ? { create: { questionId: dbQsn.id } }
                      : undefined,
                  correctMultiSelectOptions:
                    dbQsn.type === "multiple_choice_multi" && o.isCorrect
                      ? { create: { questionId: dbQsn.id } }
                      : undefined,
                },
              });
            }
          } else {
            await tx.correctAnswer.create({
              data: {
                questionId: dbQsn.id,
                textAnswer: q.options[0]!.correctAnswer,
              },
            });
          }
        }
      }
    }
  });
};

export const QuizServices = { create, getAll, getByUserId, getWithQuestions, batchQuestions };
