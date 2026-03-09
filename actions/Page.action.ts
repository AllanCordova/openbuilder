"use server";

import { Wrapper } from "@/lib/wrappers/wrapper";
import {
  getProjectPagesSchema,
  getPageBySlugSchema,
  createPageSchema,
  savePageCanvasSchema,
  updatePageInputSchema,
  deletePageSchema,
} from "@/schemas/Page.schema";
import { pageService } from "@/service/Page.service";

export const getProjectPages = Wrapper.privateValidated(
  getProjectPagesSchema,
  async (userId, input) => {
    return await pageService.getByProjectId(userId, input.projectId);
  },
);

export const getPageBySlug = Wrapper.privateValidated(
  getPageBySlugSchema,
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
  savePageCanvasSchema,
  async (userId, input) => {
    return await pageService.saveCanvas(userId, input);
  },
);

export const updatePage = Wrapper.privateValidated(
  updatePageInputSchema,
  async (userId, input) => {
    return await pageService.update(userId, input);
  },
);

export const deletePage = Wrapper.privateValidated(
  deletePageSchema,
  async (userId, input) => {
    await pageService.delete(userId, input);
    return { success: true };
  },
);
