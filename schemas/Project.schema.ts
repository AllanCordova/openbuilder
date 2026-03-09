import { z } from "zod";

export const getProjectByIdSchema = z.object({
  id: z.string(),
});

export const getPublicProjectByIdSchema = z.object({
  id: z.string(),
});

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Project name is required")
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be at most 100 characters"),
});

export const updateProjectSchema = z.object({
  name: z
    .string()
    .min(2, "Project name must be at least 2 characters")
    .max(100, "Project name must be at most 100 characters")
    .optional(),
  build_status: z.enum(["pending", "success", "failed"]).optional(),
  source_code_url: z.string().optional(),
});

export const updateProjectInputSchema = z.object({
  id: z.string(),
  data: updateProjectSchema,
});

export const deleteProjectSchema = z.object({
  id: z.string(),
});

export const downloadProjectZipSchema = z.object({
  id: z.string(),
});

export type GetProjectByIdSchema = z.infer<typeof getProjectByIdSchema>;
export type GetPublicProjectByIdSchema = z.infer<typeof getPublicProjectByIdSchema>;
export type CreateProjectSchema = z.infer<typeof createProjectSchema>;
export type UpdateProjectSchema = z.infer<typeof updateProjectSchema>;
export type UpdateProjectInputSchema = z.infer<typeof updateProjectInputSchema>;
export type DeleteProjectSchema = z.infer<typeof deleteProjectSchema>;
export type DownloadProjectZipSchema = z.infer<typeof downloadProjectZipSchema>;
