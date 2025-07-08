"use client";

import { serverFetcher } from "@/lib/server-fetcher";
import { Quiz } from "@quibly/utils/types";
import { CreateQuizFormData } from "@quibly/utils/validations";

export const createQuiz = async (data: CreateQuizFormData) => {
  return await serverFetcher<Quiz>("/quizzes/", { body: data, method: "POST" });
};

export const getUserQuizzes = async () => {
  return await serverFetcher("/quizzes/teacher/", { method: "GET" });
};
