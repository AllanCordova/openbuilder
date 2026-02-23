"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUserProjects,
  getProjectById,
  deleteProject,
  createProject,
  updateProject,
} from "@/actions/Project.action";
import type {
  CreateProjectSchema,
  UpdateProjectSchema,
} from "@/schemas/Project.schema";

export const useProjectsList = () => {
  return useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const response = await getUserProjects();
      if (!response.success) throw new Error(response.error);
      return response.data || [];
    },
  });
};

export const useProjectByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["project", id],
    queryFn: async () => {
      const response = await getProjectById({ id });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id,
  });
};

export const useProjectMutations = () => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: CreateProjectSchema) => {
      return await createProject(data);
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { id: string; data: UpdateProjectSchema }) => {
      return await updateProject({ id: params.id, data: params.data });
    },
    onSuccess: (response, variables) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
        queryClient.invalidateQueries({ queryKey: ["project", variables.id] });
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deleteProject({ id });
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      }
    },
  });

  return {
    createProject: createMutation.mutateAsync,
    updateProject: updateMutation.mutateAsync,
    deleteProject: deleteMutation.mutateAsync,
  };
};
