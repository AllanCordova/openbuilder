"use server";

import {
  componentLibraryService,
  ComponentLibraryUpdateData,
} from "@/service/ComponentLibrary.service";

export async function getComponents() {
  try {
    const data = await componentLibraryService.getAll();

    return data;
  } catch (error) {
    console.log(error);
  }
}

export async function updateComponent(
  id: string,
  data: ComponentLibraryUpdateData,
) {
  try {
    return await componentLibraryService.update(id, data);
  } catch (error) {
    console.error(error);
  }
}
