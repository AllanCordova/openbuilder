import { z } from "zod";

export const getProjectPagesSchema = z.object({
  projectId: z.string(),
});

export const getPageBySlugSchema = z.object({
  projectId: z.string(),
  slug: z.string(),
});

export const createPageSchema = z.object({
  projectId: z.string().min(1, "Project ID is required"),
  name: z.string().min(1, "Page name is required").max(100),
});

export const updatePageSchema = z.object({
  name: z.string().min(1, "Page name is required").max(100),
});

export const savePageCanvasSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  schema: z.any(),
});

export const updatePageInputSchema = z.object({
  id: z.string(),
  projectId: z.string(),
  data: updatePageSchema,
});

export const deletePageSchema = z.object({
  id: z.string(),
  projectId: z.string(),
});

export type GetProjectPagesSchema = z.infer<typeof getProjectPagesSchema>;
export type GetPageBySlugSchema = z.infer<typeof getPageBySlugSchema>;
export type CreatePageSchema = z.infer<typeof createPageSchema>;
export type UpdatePageSchema = z.infer<typeof updatePageSchema>;
export type SavePageCanvasSchema = z.infer<typeof savePageCanvasSchema>;
export type UpdatePageInputSchema = z.infer<typeof updatePageInputSchema>;
export type DeletePageSchema = z.infer<typeof deletePageSchema>;
