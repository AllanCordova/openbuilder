import prisma from "@/lib/prisma";
import {
  ProjectDto,
  CreateProjectData,
  UpdateProjectData,
  ProjectWithPagesDto,
  ProjectWithPagesAndUserDto,
} from "@/types/Project.dto";
import { BaseService } from "./Base.service";
import JSZip from "jszip";
import { schemaToASTNode } from "@/types/AstNode.type";
import { createReactFileContent } from "@/lib/compiler";
import { ValidationError } from "@/lib/errors";

export type UpdateProjectInput = { id: string; data: UpdateProjectData };
export type DeleteProjectInput = { id: string };
export type GetProjectInput = { id: string };
export type GenerateProjectZip = { id: string };

export class ProjectService extends BaseService {
  async getAll(userId: string): Promise<ProjectDto[]> {
    return await prisma.project.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async getById(userId: string, input: GetProjectInput): Promise<ProjectDto> {
    return await this.ensureOwnership(prisma.project, input.id, userId);
  }

  async create(userId: string, input: CreateProjectData): Promise<ProjectDto> {
    return await prisma.project.create({
      data: {
        userId,
        name: input.name,
        isPublic: false,
        build_status: "pending",
      },
    });
  }

  async update(userId: string, input: UpdateProjectInput): Promise<ProjectDto> {
    await this.ensureOwnership(prisma.project, input.id, userId);

    return await prisma.project.update({
      where: { id: input.id },
      data: input.data,
    });
  }

  async delete(userId: string, input: DeleteProjectInput): Promise<ProjectDto> {
    await this.ensureOwnership(prisma.project, input.id, userId);

    return await prisma.project.delete({
      where: { id: input.id },
    });
  }

  async getPublicProjects(): Promise<ProjectDto[]> {
    return await prisma.project.findMany({
      where: { isPublic: true },
      orderBy: { createdAt: "desc" },
      include: { user: { select: { name: true, avatar_url: true } } },
    });
  }

  async getViewableProject(
    id: string,
    userId?: string | null,
  ): Promise<ProjectWithPagesAndUserDto> {
    const project = await prisma.project.findFirst({
      where: {
        id,
        OR: [{ isPublic: true }, { userId: userId || undefined }],
      },
      include: {
        pages: true,
        user: { select: { name: true, avatar_url: true } },
      },
    });

    if (!project) {
      throw new ValidationError("Project not found or is private.");
    }

    return project as unknown as ProjectWithPagesAndUserDto;
  }

  async generateProjectZip(userId: string, input: GenerateProjectZip) {
    await this.ensureOwnership(prisma.project, input.id, userId);

    const project = await prisma.project.findUnique({
      where: { id: input.id },
      include: { pages: true },
    });

    if (!project) throw new ValidationError("Project not found");

    const zip = this.addPageToZip(project as unknown as ProjectWithPagesDto);

    const base64 = await zip.generateAsync({ type: "base64" });

    return {
      projectName: project.name.replace(/\s+/g, "_"),
      base64File: base64,
    };
  }

  private addPageToZip(project: ProjectWithPagesDto): JSZip {
    const zip = new JSZip();
    for (const page of project.pages) {
      const raw = page.schema_json as any;

      const schema =
        raw && Array.isArray(raw.root)
          ? { type: "root", props: {}, children: raw.root }
          : schemaToASTNode(raw);

      const rawSlug = page.slug.substring(1);

      const componentName = this.toPascalCase(rawSlug);

      const reactCode = createReactFileContent(schema, componentName);

      zip.file(`${componentName}.tsx`, reactCode);
    }

    return zip;
  }

  private toPascalCase(text: string): string {
    return text
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  }
}

export const projectService = new ProjectService();
