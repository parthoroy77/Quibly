import { z } from "zod";

export const CreateQuizSessionSchema = z
  .object({
    quizId: z.string(),
    type: z.enum(["live", "scheduled"]),
    startTime: z.date().optional(),
    endTime: z.date().optional(),
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
