export enum ProjectStatus {
  DRAFT,
  PUBLISHED,
  ARCHIVED,
}

export interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  isStar: boolean;
  isPublish: boolean;
  status?: ProjectStatus,
  schema?: string;
  config?: string;
}

export interface ProjectConfig {
  title: string;
}