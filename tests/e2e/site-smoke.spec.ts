import { expect, test } from "@playwright/test";

test("core routes load without login or github page nav", async ({ page }) => {
  await page.goto("/");
  const primaryNav = page.getByRole("navigation", { name: "Primary" });
  await expect(page.getByRole("heading", { name: /A student recoding himself/i })).toBeVisible();
  await expect(primaryNav.getByRole("link", { name: "Projects" })).toBeVisible();
  await expect(primaryNav.getByRole("link", { name: "Articles" })).toBeVisible();
  await expect(primaryNav.getByRole("link", { name: "About" })).toBeVisible();
  await expect(page.getByRole("button", { name: /login/i })).toHaveCount(0);

  await page.goto("/projects");
  await expect(page.getByRole("heading", { name: /The workshop/i })).toBeVisible();

  await page.goto("/articles");
  await expect(page.getByRole("heading", { name: /The journal/i })).toBeVisible();

  await page.goto("/about");
  await expect(page.getByRole("heading", { name: /The dossier/i })).toBeVisible();
});
