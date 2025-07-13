"use server";
import { serverFetcher } from "@/lib/server-fetcher";
import { Quiz, QuizWithQsn } from "@quibly/utils/types";
import { CreateQuizFormData } from "@quibly/utils/validations";
import { revalidateTag } from "next/cache";

export const createQuiz = async (data: CreateQuizFormData) => {
  return await serverFetcher<Quiz>("/quizzes/", { body: data, method: "POST" });
};

export const getUserQuizzes = async () => {
  const result = await serverFetcher<
    Array<Quiz & { questionCount: number; estimateTime: number; totalPoints: number }>
  >("/quizzes/user/", {
    method: "GET",
  });
  return result.data || [];
};

export const getQuizWithQuestion = async (id: string) => {
  const result = await serverFetcher<QuizWithQsn>("/quizzes/with-question/" + id, {
    method: "GET",
    next: { tags: ["quiz", id] },
  });
  return result.data;
};

export const batchQuestions = async (data: unknown, quizId: string) => {
  const result = await serverFetcher<{}>("/quizzes/" + quizId + "/questions/batch", { method: "POST", body: data });
  if (result.success) {
    revalidateTag("quiz");
  }
  return result;
};
