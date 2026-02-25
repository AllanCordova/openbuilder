"use client";

import { create } from "zustand";
import type { PageDto } from "@/types/Page.dto";
import type { CreatePageSchema, UpdatePageSchema } from "@/schemas/Page.schema";
import {
  getProjectPages,
  createPage,
  updatePage,
  deletePage,
} from "@/actions/Page.action";

interface PagesStore {
  pages: PageDto[];
  loading: boolean;
  error: string | null;
  loadPages: (projectId: string) => Promise<boolean>;
  addPage: (data: CreatePageSchema) => Promise<boolean>;
  removePage: (id: string, projectId: string) => Promise<boolean>;
  editPage: (
    id: string,
    projectId: string,
    data: UpdatePageSchema,
  ) => Promise<boolean>;
  clearError: () => void;
}

export const usePages = create<PagesStore>((set) => ({
  pages: [],
  loading: true,
  error: null,

  loadPages: async (projectId: string) => {
    set({ loading: true, error: null });

    const response = await getProjectPages({ projectId });

    if (response.success && response.data) {
      set({ pages: response.data, loading: false });
      return true;
    }

    set({
      error: response.error,
      loading: false,
    });

    return false;
  },

  addPage: async (data: CreatePageSchema) => {
    set({ error: null });

    const response = await createPage(data);

    if (response.success && response.data) {
      set((state) => ({
        pages: [response.data, ...state.pages],
      }));
      return true;
    }

    set({ error: response.error });
    return false;
  },

  removePage: async (id: string, projectId: string) => {
    set({ error: null });

    const response = await deletePage({ id, projectId });

    if (response.success) {
      set((state) => ({
        pages: state.pages.filter((page) => page.id !== id),
      }));
      return true;
    }

    set({ error: response.error });
    return false;
  },

  editPage: async (id: string, projectId: string, data: UpdatePageSchema) => {
    set({ error: null });

    const response = await updatePage({ id, projectId, data });

    if (response.success && response.data) {
      set((state) => ({
        pages: state.pages.map((page) =>
          page.id === id ? response.data : page,
        ),
      }));
      return true;
    }

    set({ error: response.error });
    return false;
  },

  clearError: () => set({ error: null }),
}));
