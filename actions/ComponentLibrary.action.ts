"use server";

import { Wrapper } from "@/lib/wrappers/wrapper";
import {
  componentLibraryService,
  type ComponentLibraryUpdateData,
} from "@/service/ComponentLibrary.service";

export const getComponents = Wrapper.private(async (userId, paginator?) => {
  return await componentLibraryService.getAll(paginator);
});

export const updateComponent = Wrapper.private(
  async (userId, id: string, data: ComponentLibraryUpdateData) => {
    return await componentLibraryService.update(id, data);
  },
);
