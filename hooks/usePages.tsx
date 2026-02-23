"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProjectPages,
  getPageBySlug,
  createPage,
  updatePage,
  deletePage,
  savePageCanvas,
} from "@/actions/Page.action";
import type { CreatePageSchema, UpdatePageSchema } from "@/schemas/Page.schema";

export const usePagesList = (projectId: string) => {
  return useQuery({
    queryKey: ["pages", projectId],
    queryFn: async () => {
      const response = await getProjectPages({ projectId });
      if (!response.success) throw new Error(response.error);
      return response.data || [];
    },
    enabled: !!projectId,
  });
};

export const usePageBySlugQuery = (projectId: string, slug: string) => {
  return useQuery({
    queryKey: ["page", projectId, slug],
    queryFn: async () => {
      const response = await getPageBySlug({ projectId, slug });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!projectId && !!slug,
  });
};

export const usePageMutations = (projectId: string) => {
  const queryClient = useQueryClient();

  const createMutation = useMutation({
    mutationFn: async (data: CreatePageSchema) => {
      return await createPage(data);
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["pages", projectId] });
      }
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { id: string; data: UpdatePageSchema }) => {
      return await updatePage({
        id: params.id,
        projectId,
        data: params.data,
      });
    },
    onSuccess: (response) => {
      if (response.success && response.data) {
        queryClient.invalidateQueries({ queryKey: ["pages", projectId] });
        if (response.data.slug) {
          queryClient.invalidateQueries({
            queryKey: ["page", projectId, response.data.slug],
          });
        }
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return await deletePage({ id, projectId });
    },
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["pages", projectId] });
      }
    },
  });

  const saveCanvasMutation = useMutation({
    mutationFn: async (params: { id: string; schema: any; slug: string }) => {
      return await savePageCanvas({
        id: params.id,
        projectId,
        schema: params.schema,
      });
    },
    onSuccess: (response, variables) => {
      if (response.success) {
        queryClient.invalidateQueries({
          queryKey: ["page", projectId, variables.slug],
        });
      }
    },
  });

  return {
    createPage: createMutation.mutateAsync,
    updatePage: updateMutation.mutateAsync,
    deletePage: deleteMutation.mutateAsync,
    saveCanvas: saveCanvasMutation.mutateAsync,

    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
    isSavingCanvas: saveCanvasMutation.isPending,
  };
};
