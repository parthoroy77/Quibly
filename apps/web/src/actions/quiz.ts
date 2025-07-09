"use server";
import { serverFetcher } from "@/lib/server-fetcher";
import { Quiz, QuizWithQsn } from "@quibly/utils/types";
import { CreateQuizFormData } from "@quibly/utils/validations";

export const createQuiz = async (data: CreateQuizFormData) => {
  return await serverFetcher<Quiz>("/quizzes/", { body: data, method: "POST" });
};

export const getUserQuizzes = async () => {
  const result = await serverFetcher<Quiz[]>("/quizzes/teacher/", { method: "GET" });
  return result.data;
};

export const getQuizWithQuestion = async (id: string) => {
  const result = await serverFetcher<QuizWithQsn>("/quizzes/with-question/" + id, { method: "GET" });
  return result.data;
};
