"use server";

import { Wrapper } from "@/lib/wrappers/wrapper";
import {
  getProjectByIdSchema,
  getPublicProjectByIdSchema,
  createProjectSchema,
  updateProjectInputSchema,
  deleteProjectSchema,
  downloadProjectZipSchema,
} from "@/schemas/Project.schema";
import { projectService } from "@/service/Project.service";

export const getUserProjects = Wrapper.private(async (userId) => {
  return await projectService.getAll(userId);
});

export const getProjectById = Wrapper.privateValidated(
  getProjectByIdSchema,
  async (userId, input) => {
    return await projectService.getById(userId, input);
  },
);

export const getPublicProjectsList = Wrapper.public(async () => {
  return await projectService.getPublicProjects();
});

export const getPublicProjectById = Wrapper.publicValidated(
  getPublicProjectByIdSchema,
  async (input) => {
    return await projectService.getViewableProject(input.id, null);
  },
);

export const createProject = Wrapper.privateValidated(
  createProjectSchema,
  async (userId, input) => {
    return await projectService.create(userId, input);
  },
);

export const updateProject = Wrapper.privateValidated(
  updateProjectInputSchema,
  async (userId, input) => {
    return await projectService.update(userId, input);
  },
);

export const deleteProject = Wrapper.privateValidated(
  deleteProjectSchema,
  async (userId, input) => {
    await projectService.delete(userId, input);
    return { success: true };
  },
);

export const downloadProjectZip = Wrapper.privateValidated(
  downloadProjectZipSchema,
  async (userId, input) => {
    return await projectService.generateProjectZip(userId, input);
  },
);
