"use server";

import { z } from "zod";
import { Wrapper } from "@/lib/wrappers/wrapper";
import { pageService } from "@/service/Page.service";
import { createPageSchema, updatePageSchema } from "@/schemas/Page.schema";

export const getProjectPages = Wrapper.privateValidated(
  z.object({ projectId: z.string() }),
  async (userId, input) => {
    return await pageService.getByProjectId(userId, input.projectId);
  },
);

export const getPageBySlug = Wrapper.privateValidated(
  z.object({ projectId: z.string(), slug: z.string() }),
  async (userId, input) => {
    return await pageService.getBySlug(userId, input);
  },
);

export const createPage = Wrapper.privateValidated(
  createPageSchema,
  async (userId, input) => {
    return await pageService.create(userId, input);
  },
);

export const savePageCanvas = Wrapper.privateValidated(
  z.object({
    id: z.string(),
    projectId: z.string(),
    schema: z.any(),
  }),
  async (userId, input) => {
    return await pageService.saveCanvas(userId, input);
  },
);

export const updatePage = Wrapper.privateValidated(
  z.object({
    id: z.string(),
    projectId: z.string(),
    data: updatePageSchema,
  }),
  async (userId, input) => {
    return await pageService.update(userId, input);
  },
);

export const deletePage = Wrapper.privateValidated(
  z.object({
    id: z.string(),
    projectId: z.string(),
  }),
  async (userId, input) => {
    await pageService.delete(userId, input);
    return { success: true };
  },
);
