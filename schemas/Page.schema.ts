import { z } from "zod";

export const createPageSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  name: z.string().min(1, "Page name is required").max(100),
});

export const updatePageSchema = z.object({
  name: z.string().min(1, "Page name is required").max(100),
});

export type CreatePageSchema = z.infer<typeof createPageSchema>;
export type UpdatePageSchema = z.infer<typeof updatePageSchema>;
