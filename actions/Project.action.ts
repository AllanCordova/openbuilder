"use server";

import { z } from "zod";
import { Wrapper } from "@/lib/wrappers/wrapper";
import { projectService } from "@/service/Project.service";
import {
  createProjectSchema,
  updateProjectSchema,
} from "@/schemas/Project.schema";

export const getUserProjects = Wrapper.private(async (userId) => {
  return await projectService.getAll(userId);
});

export const createProject = Wrapper.privateValidated(
  createProjectSchema,
  async (userId, input) => {
    return await projectService.create(userId, input);
  },
);

export const updateProject = Wrapper.privateValidated(
  z.object({
    id: z.string(),
    data: updateProjectSchema,
  }),
  async (userId, input) => {
    return await projectService.update(userId, input);
  },
);

export const getProjectById = Wrapper.privateValidated(
  z.object({ id: z.string() }),
  async (userId, input) => {
    return await projectService.getById(userId, input);
  },
);

export const deleteProject = Wrapper.privateValidated(
  z.object({ id: z.string() }),
  async (userId, input) => {
    await projectService.delete(userId, input);
    return { success: true };
  },
);

export const downloadProjectZip = Wrapper.privateValidated(
  z.object({ id: z.string() }),
  async (userId, input) => {
    return await projectService.generateProjectZip(userId, input);
  },
);
