import "server-only";

import { cache } from "react";
import { LocalFileContentSource } from "@/lib/content/local-file-source";
import type { ArticleMeta, ArticleType, ProjectMeta, ProjectStatus } from "@/lib/content/types";

const source = new LocalFileContentSource();

export const getAllProjects = cache(() => source.getAllProjects());
export const getProjectBySlug = cache((slug: string) => source.getProjectBySlug(slug));
export const getAllArticles = cache(() => source.getAllArticles());
export const getArticleBySlug = cache((slug: string) => source.getArticleBySlug(slug));

export async function listFeaturedProjects(limit?: number): Promise<ProjectMeta[]> {
  const projects = await getAllProjects();
  const featured = projects.filter((project) => project.featured);
  return typeof limit === "number" ? featured.slice(0, limit) : featured;
}

export async function listProjectsByFilter(filter: string): Promise<ProjectMeta[]> {
  const projects = await getAllProjects();

  if (filter === "demo") return projects.filter((project) => project.status === "Demo");
  if (filter === "archived") {
    return projects.filter((project) => project.status === "Archived");
  }
  if (filter === "active") {
    const activeStatuses: ProjectStatus[] = ["Idea", "Building", "Live"];
    return projects.filter((project) => activeStatuses.includes(project.status));
  }

  return projects;
}

export async function listPublishedArticles(type?: ArticleType): Promise<ArticleMeta[]> {
  const articles = await getAllArticles();

  return articles.filter(
    (article) => article.status === "published" && (!type || article.type === type),
  );
}

export async function listRecentArticles(limit = 5): Promise<ArticleMeta[]> {
  const published = await listPublishedArticles();
  return published.slice(0, limit);
}

export async function groupPublishedArticlesByYear(type?: ArticleType) {
  const articles = await listPublishedArticles(type);

  return articles.reduce<Record<string, ArticleMeta[]>>((groups, article) => {
    const year = article.date.slice(0, 4);
    groups[year] ??= [];
    groups[year].push(article);
    return groups;
  }, {});
}
