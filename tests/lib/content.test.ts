/* @vitest-environment node */

import { mkdtemp, mkdir, rm, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import {
  getAllArticles,
  getAllProjects,
  getArticleBySlug,
  getProjectBySlug,
  listProjectsByFilter,
} from "@/lib/content";
import { LocalFileContentSource } from "@/lib/content/local-file-source";

describe("content layer", () => {
  test("parses and sorts projects", async () => {
    const projects = await getAllProjects();

    expect(projects[0]?.slug).toBe("done-log-product");
    expect(projects[1]?.slug).toBe("codex-memory-system");
    expect(projects.every((project) => project.title.length > 0)).toBe(true);
  });

  test("filters published article details by slug", async () => {
    const article = await getArticleBySlug("why-recode");

    expect(article?.title).toBe("我为什么要做 Recode");
    expect(article?.status).toBe("published");
  });

  test("returns null for missing slugs", async () => {
    await expect(getProjectBySlug("missing-project")).resolves.toBeNull();
    await expect(getArticleBySlug("missing-article")).resolves.toBeNull();
  });

  test("groups article metadata with valid types", async () => {
    const articles = await getAllArticles();

    expect(articles[0]?.type).toMatch(/blog|note/);
    expect(articles.every((article) => article.dateLabel.length > 0)).toBe(true);
  });

  test("returns only published articles from the public listing APIs", async () => {
    const articles = await getAllArticles();
    const published = articles.filter((article) => article.status === "published");

    expect(published).toHaveLength(articles.length);
  });

  test("filters projects by lifecycle buckets", async () => {
    const active = await listProjectsByFilter("active");
    const archived = await listProjectsByFilter("archived");
    const demo = await listProjectsByFilter("demo");

    expect(active.every((project) => ["Idea", "Building", "Live"].includes(project.status))).toBe(
      true,
    );
    expect(archived.every((project) => project.status === "Archived")).toBe(true);
    expect(demo.every((project) => project.status === "Demo")).toBe(true);
  });

  test("returns empty collections when content directories are missing", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "recode-empty-content-"));
    const source = new LocalFileContentSource(tempDir);

    await expect(source.getAllProjects()).resolves.toEqual([]);
    await expect(source.getAllArticles()).resolves.toEqual([]);

    await rm(tempDir, { recursive: true, force: true });
  });

  test("fails clearly on invalid article frontmatter dates", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "recode-invalid-article-"));
    const articleDir = path.join(tempDir, "articles", "blog");
    await mkdir(articleDir, { recursive: true });
    await writeFile(
      path.join(articleDir, "bad-date.mdx"),
      `---
title: Bad Date
summary: Invalid frontmatter date
date: "2026-13-40"
type: blog
status: published
---

Body
`,
      "utf8",
    );

    const source = new LocalFileContentSource(tempDir);
    await expect(source.getAllArticles()).rejects.toThrow(/valid ISO date/i);

    await rm(tempDir, { recursive: true, force: true });
  });

  test("sorts articles by date and excludes drafts in a temporary content source", async () => {
    const tempDir = await mkdtemp(path.join(os.tmpdir(), "recode-article-sort-"));
    const articleDir = path.join(tempDir, "articles", "notes");
    await mkdir(articleDir, { recursive: true });

    await writeFile(
      path.join(articleDir, "draft-note.mdx"),
      `---
title: Draft Note
summary: Should not appear in public lists
date: 2026-04-01
type: note
status: draft
---

Draft body
`,
      "utf8",
    );

    await writeFile(
      path.join(articleDir, "older-note.mdx"),
      `---
title: Older Note
summary: Earlier article
date: 2026-04-18
type: note
status: published
---

Older body
`,
      "utf8",
    );

    await writeFile(
      path.join(articleDir, "newer-note.mdx"),
      `---
title: Newer Note
summary: Newest article
date: 2026-04-30
type: note
status: published
---

Newer body
`,
      "utf8",
    );

    const source = new LocalFileContentSource(tempDir);
    const articles = await source.getAllArticles();
    const published = articles.filter((article) => article.status === "published");

    expect(articles.map((article) => article.slug)).toEqual([
      "newer-note",
      "older-note",
      "draft-note",
    ]);
    expect(published.map((article) => article.slug)).toEqual([
      "newer-note",
      "older-note",
    ]);

    await rm(tempDir, { recursive: true, force: true });
  });
});
