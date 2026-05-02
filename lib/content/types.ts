import { z } from "zod";

export const projectStatusSchema = z.enum([
  "Idea",
  "Building",
  "Demo",
  "Live",
  "Paused",
  "Archived",
]);

export const articleTypeSchema = z.enum(["blog", "note"]);
export const articleStatusSchema = z.enum(["published", "draft"]);

export const projectFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  status: projectStatusSchema,
  lastUpdated: z.string(),
  techStack: z.array(z.string()),
  githubUrl: z.string().optional().default(""),
  demoUrl: z.string().optional().default(""),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(999),
});

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: z.string(),
  type: articleTypeSchema,
  tags: z.array(z.string()).default([]),
  status: articleStatusSchema,
  featured: z.boolean().optional().default(false),
});

export type ProjectStatus = z.infer<typeof projectStatusSchema>;
export type ArticleType = z.infer<typeof articleTypeSchema>;
export type ArticleStatus = z.infer<typeof articleStatusSchema>;

export type ProjectMeta = z.infer<typeof projectFrontmatterSchema> & {
  slug: string;
};

export type ProjectEntry = ProjectMeta & {
  content: string;
};

export type ArticleMeta = z.infer<typeof articleFrontmatterSchema> & {
  slug: string;
  dateLabel: string;
};

export type ArticleEntry = ArticleMeta & {
  content: string;
};
