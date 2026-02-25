import prisma from "@/lib/prisma";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";
import { PaginatedResponse, Paginator } from "@/types/Paginator.type";

export type ComponentLibraryUpdateData = {
  name?: string;
  default_schema_json?: object;
};

export class ComponentLibraryService {
  async getAll(
    pagination?: Paginator,
  ): Promise<PaginatedResponse<ComponentLibraryDto>> {
    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    const [components, totalCount] = await prisma.$transaction([
      prisma.componentLibrary.findMany({
        skip,
        take: limit,
      }),
      prisma.componentLibrary.count(),
    ]);

    return {
      data: components as ComponentLibraryDto[],
      meta: {
        total: totalCount,
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  }
  async update(id: string, data: ComponentLibraryUpdateData) {
    return await prisma.componentLibrary.update({
      where: { id },
      data,
    });
  }
}

export const componentLibraryService = new ComponentLibraryService();
