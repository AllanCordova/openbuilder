"use client";

import { create } from "zustand";
import { ProjectDto } from "@/types/Project.dto";
import {
  getUserProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
} from "@/actions/Project.action";
import {
  CreateProjectSchema,
  UpdateProjectSchema,
} from "@/schemas/Project.schema";

interface ProjectsStore {
  projects: ProjectDto[];
  currentProject: ProjectDto | null;
  loading: boolean;
  error: string | null;

  loadProjects: () => Promise<boolean>;
  loadProject: (id: string) => Promise<boolean>;
  addProject: (data: CreateProjectSchema) => Promise<boolean>;
  removeProject: (id: string) => Promise<boolean>;
  editProject: (id: string, data: UpdateProjectSchema) => Promise<boolean>;
  clearCurrentProject: () => void;
}

export const useProjects = create<ProjectsStore>((set) => ({
  projects: [],
  currentProject: null,
  loading: true,
  error: null,

  loadProjects: async () => {
    set({ loading: true, error: null });
    const response = await getUserProjects();

    if (response.success && response.data) {
      set({ projects: response.data, loading: false });
      return true;
    }

    set({
      error: response.error,
      loading: false,
    });

    return false;
  },

  loadProject: async (id: string) => {
    set({ loading: true, error: null });

    const response = await getProjectById({ id });

    if (response.success && response.data) {
      set({ currentProject: response.data, loading: false });
      return true;
    }

    set({ error: response.error, loading: false, currentProject: null });
    return false;
  },

  addProject: async (data: CreateProjectSchema) => {
    set({ error: null });
    const response = await createProject(data);

    if (response.success && response.data) {
      set((state) => ({
        projects: [response.data, ...state.projects],
      }));
      return true;
    }
    set({ error: response.error });

    return false;
  },

  removeProject: async (id: string) => {
    set({ error: null });

    const response = await deleteProject({ id });

    if (response.success) {
      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
      }));
      return true;
    }
    set({ error: response.error });

    return false;
  },

  editProject: async (id: string, data: UpdateProjectSchema) => {
    set({ error: null });

    const response = await updateProject({ id, data });

    if (response.success && response.data) {
      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? response.data : p)),
      }));
      return true;
    }
    set({ error: response.error });

    return false;
  },

  clearCurrentProject: () => set({ currentProject: null }),
}));
