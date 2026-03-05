import prisma from "@/lib/prisma";
import { BaseService } from "./Base.service";
import { ComponentLibraryDto } from "@/types/ComponentLibrary.dto";
import { PaginatedResponse } from "@/types/Paginator.type";
import { GetComponentsSchema } from "@/schemas/ComponentLibrary.schema";

export class ComponentLibraryService extends BaseService {
  async getComponents(
    input: GetComponentsSchema,
  ): Promise<PaginatedResponse<ComponentLibraryDto>> {
    const { page, limit, tag } = input;
    const skip = (page - 1) * limit;

    const whereClause = tag ? { tag } : {};

    const [components, totalCount] = await prisma.$transaction([
      prisma.componentLibrary.findMany({
        skip,
        take: limit,
        where: whereClause,
        orderBy: { name: "asc" },
      }),
      prisma.componentLibrary.count({ where: whereClause }),
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
}

export const componentLibraryService = new ComponentLibraryService();
