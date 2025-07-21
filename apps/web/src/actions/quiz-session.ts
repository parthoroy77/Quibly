import { serverFetcher } from "@/lib/server-fetcher";
import { QuizSession } from "@quibly/utils/types";
import { CreateQuizSessionFormData } from "@quibly/utils/validations";

export const createQuizSession = async (data: CreateQuizSessionFormData) => {
  return await serverFetcher<QuizSession>("/quiz-sessions/", {
    body: {
      ...data,
      startTime: new Date(data.startTime),
      endTime: data.endTime ? new Date(data.endTime) : undefined,
    },
    method: "POST",
  });
};
