import prisma from "@/lib/prisma";

export type ComponentLibraryUpdateData = {
  name?: string;
  default_schema_json?: object;
};

export class ComponentLibraryService {
  async getAll() {
    return await prisma.componentLibrary.findMany();
  }

  async update(id: string, data: ComponentLibraryUpdateData) {
    return await prisma.componentLibrary.update({
      where: { id },
      data,
    });
  }
}

export const componentLibraryService = new ComponentLibraryService();
