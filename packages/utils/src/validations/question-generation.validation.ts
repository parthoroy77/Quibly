import { z } from "zod";
import { QuestionType } from "../types/index";

export const GenerateQuestionValidationSchema = z.object({
  topic: z
    .string()
    .min(20, "Write your question topic at least 20 char long")
    .max(300, "Topic must not exceed 300 characters"),
  level: z.enum(["easy", "medium", "hard"], {
    required_error: "Please select a difficulty level",
  }),
  type: z.enum([
    QuestionType.multiple_choice_multi,
    QuestionType.multiple_choice_single,
    QuestionType.short_answer,
    QuestionType.true_false,
    "mixed",
  ]),
  numberOfQsn: z
    .number()
    .min(1, "You must generate at least 1 question")
    .max(50, "You can generate a maximum of 50 questions"),
  timeLimitPerQuestion: z.number().min(1).max(5),
});

export type GenerateQuestionFormData = z.infer<typeof GenerateQuestionValidationSchema>;
