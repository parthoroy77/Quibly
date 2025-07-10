import { z } from "zod";
import { QuestionType } from "../types/index";

export const CreateQuizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must not exceed 500 characters"),
});

export type CreateQuizFormData = z.infer<typeof CreateQuizSchema>;

const QuestionOptionSchema = z.object({
  text: z.string(),
  index: z.number(),
  isCorrect: z.boolean(),
  correctAnswer: z.string().optional(), // This is to determine the correct answer for Short Answer
});

const QuestionSchema = z.object({
  text: z.string(),
  type: z.enum([
    QuestionType.multiple_choice_multi,
    QuestionType.multiple_choice_single,
    QuestionType.short_answer,
    QuestionType.true_false,
  ]),
  required: z.boolean(),
  randomizeOrder: z.boolean(),
  index: z.number(),
  points: z.number(),
  timeLimit: z.number(),
  explanation: z.string().optional(),
  options: z.array(QuestionOptionSchema),
});

export const CreateQuestionSchema = z.object({
  quizId: z.string(),
  questions: z.array(QuestionSchema),
});

export type CreateQuestionFormData = z.infer<typeof CreateQuestionSchema>;
