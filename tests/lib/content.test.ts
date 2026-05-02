/* @vitest-environment node */

import { getAllArticles, getAllProjects, getArticleBySlug, getProjectBySlug } from "@/lib/content";

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
});
