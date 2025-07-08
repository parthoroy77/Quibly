import { z } from "zod";

export const CreateQuizSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long").max(100, "Title must not exceed 100 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description must not exceed 500 characters"),
});

export type CreateQuizFormData = z.infer<typeof CreateQuizSchema>;
