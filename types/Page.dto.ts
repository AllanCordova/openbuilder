export interface PageDto {
  id: string;
  projectId: string;
  name: string;
  slug: string;
  schema_json: any;
  createdAt: Date;
}

export interface CreatePageData {
  projectId: string;
  name: string;
}

export interface UpdatePageData {
  name: string;
}

export type SaveCanvasInput = {
  id: string;
  projectId: string;
  schema: any;
};
