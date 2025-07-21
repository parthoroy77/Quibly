import { z } from "@quibly/utils/validations";

export const QuizSessionValidationSchema = z.object({
  quizId: z.string(),
  type: z.enum(["live", "scheduled"]),
  startTime: z.union([z.string(), z.date()]).transform((val) => new Date(val)),
  endTime: z
    .union([z.string(), z.date()])
    .optional()
    .transform((val) => (val ? new Date(val) : undefined)),
  title: z
    .string()
    .min(5, { message: "Title must be 5 character long" })
    .max(200, { message: "Title must not exceed 100 character" }),
  description: z
    .string()
    .max(500, {
      message: "Description must not exceed 500 character",
    })
    .optional(),
});
