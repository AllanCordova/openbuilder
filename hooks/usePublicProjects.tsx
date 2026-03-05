"use client";

import { useQuery } from "@tanstack/react-query";
import {
  getPublicProjectsList,
  getPublicProjectById,
} from "@/actions/Project.action";

export const usePublicProjectsList = () => {
  return useQuery({
    queryKey: ["publicProjects"],
    queryFn: async () => {
      const response = await getPublicProjectsList();
      if (!response.success) throw new Error(response.error);
      return response.data || [];
    },
  });
};

export const usePublicProjectByIdQuery = (id: string) => {
  return useQuery({
    queryKey: ["publicProject", id],
    queryFn: async () => {
      const response = await getPublicProjectById({ id });
      if (!response.success) throw new Error(response.error);
      return response.data;
    },
    enabled: !!id,
  });
};
