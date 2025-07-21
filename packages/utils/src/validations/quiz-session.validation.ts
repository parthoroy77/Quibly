import { z } from "zod";

export const CreateQuizSessionSchema = z
  .object({
    quizId: z.string(),
    type: z.enum(["live", "scheduled"]),
    startTime: z.date(),
    endTime: z.date().optional(),
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
  })
  .superRefine((data, ctx) => {
    if (data.type === "scheduled") {
      if (!data.endTime || !data.startTime) {
        ctx.addIssue({ path: ["startTime"], code: z.ZodIssueCode.custom, message: "Start Time Required" });
        ctx.addIssue({ path: ["endTime"], code: z.ZodIssueCode.custom, message: "End Time Required" });
      }
    }
  });

export type CreateQuizSessionFormData = z.infer<typeof CreateQuizSessionSchema>;
