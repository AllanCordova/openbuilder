import { ValidationError } from "@/lib/errors";
import prisma from "@/lib/prisma";
import type {
  PageDto,
  CreatePageData,
  UpdatePageData,
  SaveCanvasInput,
} from "@/types/Page.dto";
import { BaseService } from "./Base.service";

export type UpdatePageInput = {
  id: string;
  projectId: string;
  data: UpdatePageData;
};
export type DeletePageInput = { id: string; projectId: string };

export class PageService extends BaseService {
  private async ensureProjectOwnership(projectId: string, userId: string) {
    return await this.ensureOwnership(
      prisma.project,
      projectId,
      userId,
      "Project",
    );
  }

  async getByProjectId(userId: string, projectId: string): Promise<PageDto[]> {
    await this.ensureProjectOwnership(projectId, userId);

    return await prisma.page.findMany({
      where: { projectId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getBySlug(
    userId: string,
    input: { slug: string; projectId: string },
  ): Promise<PageDto> {
    await this.ensureProjectOwnership(input.projectId, userId);

    const page = await prisma.page.findFirst({
      where: { slug: input.slug, projectId: input.projectId },
    });

    if (!page) {
      throw new ValidationError("Page not Found!");
    }

    return page;
  }

  async create(userId: string, input: CreatePageData): Promise<PageDto> {
    await this.ensureProjectOwnership(input.projectId, userId);

    const slug = this.generateSlug(input.name);

    const existingPage = await prisma.page.findFirst({
      where: { projectId: input.projectId, slug },
    });

    if (existingPage) {
      throw new ValidationError(
        `A page with the name "${input.name}" already exists in this project`,
      );
    }

    return await prisma.page.create({
      data: {
        projectId: input.projectId,
        name: input.name,
        slug,
        schema_json: {},
      },
    });
  }

  async saveCanvas(userId: string, input: SaveCanvasInput): Promise<PageDto> {
    await this.ensureProjectOwnership(input.projectId, userId);

    return await prisma.page.update({
      where: { id: input.id },
      data: {
        schema_json: input.schema,
      },
    });
  }

  async update(userId: string, input: UpdatePageInput): Promise<PageDto> {
    await this.ensureProjectOwnership(input.projectId, userId);

    const slug = this.generateSlug(input.data.name);

    const existing = await prisma.page.findFirst({
      where: {
        projectId: input.projectId,
        slug,
        NOT: { id: input.id },
      },
    });

    if (existing) {
      throw new ValidationError(
        `A page with the name "${input.data.name}" already exists in this project`,
      );
    }

    return await prisma.page.update({
      where: { id: input.id },
      data: {
        name: input.data.name,
        slug,
      },
    });
  }

  async delete(userId: string, input: DeletePageInput): Promise<PageDto> {
    await this.ensureProjectOwnership(input.projectId, userId);

    return await prisma.page.delete({
      where: { id: input.id },
    });
  }

  private generateSlug(name: string): string {
    return (
      "/" +
      name
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/^-+|-+$/g, "")
    );
  }
}

export const pageService = new PageService();
