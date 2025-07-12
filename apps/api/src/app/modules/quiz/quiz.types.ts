import { CreateQuestionFormData } from "@quibly/utils/validations";

export type QuizCreatePayload = {
  userId: string;
  title: string;
  description: string;
};

export type BatchQuizQuestion = {
  create: CreateQuestionFormData["questions"];
  update: CreateQuestionFormData["questions"];
  remove: string[];
  quizId: string;
};
