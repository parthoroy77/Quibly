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
  optionId: z.string().optional(),
  text: z
    .string()
    .min(4, "Option must be at least 5 characters long")
    .max(100, "Option must not exceed 100 characters"),
  index: z.number(),
  isCorrect: z.boolean(),
  correctAnswer: z.string().optional(), // This is to determine the correct answer for Short Answer
  correctAnswerId: z.string().optional(),
  mode: z.enum(["create", "update", "delete", "noop"]).optional(),
});

export const QuestionSchema = z
  .object({
    questionId: z.string().optional(),
    text: z
      .string()
      .min(10, "Question must be at least 10 characters long")
      .max(400, "Question must not exceed 400 characters"),
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
    explanation: z.string().max(400, "Question must not exceed 400 characters").optional(),
    options: z.array(QuestionOptionSchema),
    mode: z.enum(["create", "update", "delete", "noop"]).optional(),
  })
  .superRefine((data, ctx) => {
    const { type, options } = data;

    if (
      type === QuestionType.multiple_choice_multi ||
      type === QuestionType.multiple_choice_single ||
      type === QuestionType.true_false
    ) {
      const hasCorrect = options.some((option) => option.isCorrect);
      if (!hasCorrect) {
        options.forEach((o, idx) => {
          ctx.addIssue({
            path: ["options", idx, "isCorrect"],
            code: z.ZodIssueCode.custom,
            message: "At least one option must be marked as correct.",
          });
        });
      }
    }

    if (type === QuestionType.short_answer) {
      options.forEach((option, index) => {
        if (!option.correctAnswer || option.correctAnswer.trim() === "") {
          ctx.addIssue({
            path: ["options", index, "correctAnswer"],
            code: z.ZodIssueCode.custom,
            message: "Each option must include a correct answer for short answer questions.",
          });
        }
      });
    }
  });

export const CreateQuestionSchema = z.object({
  quizId: z.string(),
  questions: z.array(QuestionSchema),
});

export type CreateQuestionFormData = z.infer<typeof CreateQuestionSchema>;
