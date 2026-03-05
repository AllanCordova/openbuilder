import { z } from "zod";

export const getComponentsSchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().optional().default(10),
  tag: z.string().optional(),
});

export type GetComponentsSchema = z.infer<typeof getComponentsSchema>;
