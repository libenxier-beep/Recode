import "server-only";

import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import {
  articleFrontmatterSchema,
  projectFrontmatterSchema,
  type ArticleEntry,
  type ProjectEntry,
} from "@/lib/content/types";
import type { ContentSource } from "@/lib/content/source";

function normalizeSlug(filename: string) {
  return filename.replace(/\.mdx?$/i, "");
}

function formatDateLabel(input: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  }).format(new Date(`${input}T00:00:00Z`));
}

async function getFilesRecursively(dir: string): Promise<string[]> {
  let entries;

  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return [];
    throw error;
  }

  const nested = await Promise.all(
    entries.map(async (entry) => {
      const resolved = path.join(dir, entry.name);
      if (entry.isDirectory()) return getFilesRecursively(resolved);
      return resolved;
    }),
  );

  return nested.flat().filter((file) => file.endsWith(".mdx"));
}

export class LocalFileContentSource implements ContentSource {
  private readonly projectsDir: string;
  private readonly articlesDir: string;

  constructor(contentRoot = path.join(process.cwd(), "content")) {
    this.projectsDir = path.join(contentRoot, "projects");
    this.articlesDir = path.join(contentRoot, "articles");
  }

  async getAllProjects(): Promise<ProjectEntry[]> {
    const files = await getFilesRecursively(this.projectsDir);
    const projects = await Promise.all(files.map((file) => this.readProject(file)));

    return projects.sort((left, right) => {
      if (left.order !== right.order) return left.order - right.order;
      return right.lastUpdated.localeCompare(left.lastUpdated);
    });
  }

  async getProjectBySlug(slug: string): Promise<ProjectEntry | null> {
    const projects = await this.getAllProjects();
    return projects.find((project) => project.slug === slug) ?? null;
  }

  async getAllArticles(): Promise<ArticleEntry[]> {
    const files = await getFilesRecursively(this.articlesDir);
    const articles = await Promise.all(files.map((file) => this.readArticle(file)));

    return articles.sort((left, right) => right.date.localeCompare(left.date));
  }

  async getArticleBySlug(slug: string): Promise<ArticleEntry | null> {
    const articles = await this.getAllArticles();
    return articles.find((article) => article.slug === slug) ?? null;
  }

  private async readProject(filePath: string): Promise<ProjectEntry> {
    const raw = await readFile(filePath, "utf8");
    const parsed = matter(raw);
    const frontmatter = projectFrontmatterSchema.parse(parsed.data);

    return {
      ...frontmatter,
      slug: normalizeSlug(path.basename(filePath)),
      content: parsed.content.trim(),
    };
  }

  private async readArticle(filePath: string): Promise<ArticleEntry> {
    const raw = await readFile(filePath, "utf8");
    const parsed = matter(raw);
    const frontmatter = articleFrontmatterSchema.parse(parsed.data);

    return {
      ...frontmatter,
      slug: normalizeSlug(path.basename(filePath)),
      dateLabel: formatDateLabel(frontmatter.date),
      content: parsed.content.trim(),
    };
  }
}
