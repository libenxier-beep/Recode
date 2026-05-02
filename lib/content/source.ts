import type { ArticleEntry, ProjectEntry } from "@/lib/content/types";

export interface ContentSource {
  getAllProjects(): Promise<ProjectEntry[]>;
  getProjectBySlug(slug: string): Promise<ProjectEntry | null>;
  getAllArticles(): Promise<ArticleEntry[]>;
  getArticleBySlug(slug: string): Promise<ArticleEntry | null>;
}
