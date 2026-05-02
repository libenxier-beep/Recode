import { z } from "zod";

function isIsoDateString(value: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return (
    date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
  );
}

const isoDateSchema = z.preprocess((value) => {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    return value.toISOString().slice(0, 10);
  }

  return value;
}, z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine(isIsoDateString, "Expected a valid ISO date in YYYY-MM-DD format"));

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
  lastUpdated: isoDateSchema,
  techStack: z.array(z.string()),
  githubUrl: z.string().optional().default(""),
  demoUrl: z.string().optional().default(""),
  featured: z.boolean().optional().default(false),
  order: z.number().optional().default(999),
});

export const articleFrontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
  date: isoDateSchema,
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
