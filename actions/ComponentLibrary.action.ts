"use server";

import { Wrapper } from "@/lib/wrappers/wrapper";
import { componentLibraryService } from "@/service/ComponentLibrary.service";
import { getComponentsSchema } from "@/schemas/ComponentLibrary.schema";

export const getComponents = Wrapper.privateValidated(
  getComponentsSchema,
  async (userId, input) => {
    return await componentLibraryService.getComponents(input);
  },
);
