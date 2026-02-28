import { Page } from "@prisma/client";

export type ProjectDto = {
  id: string;
  userId: string;
  name: string;
  build_status: string | null;
  source_code_url: string | null;
  createdAt: Date;
};

export interface ProjectWithPagesDto extends ProjectDto {
  pages: Page[];
}

export type CreateProjectData = {
  name: string;
  userId?: string;
};

export type UpdateProjectData = {
  name?: string;
  build_status?: string;
  source_code_url?: string;
};
