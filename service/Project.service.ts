import prisma from "@/lib/prisma";
import {
  ProjectDto,
  CreateProjectData,
  UpdateProjectData,
} from "@/types/Project.dto";
import { BaseService } from "./Base.service";

export type UpdateProjectInput = { id: string; data: UpdateProjectData };
export type DeleteProjectInput = { id: string };
export type GetProjectInput = { id: string };

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
}

export const projectService = new ProjectService();
