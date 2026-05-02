import { mkdir } from "node:fs/promises";
import path from "node:path";
import { expect, test } from "@playwright/test";

const shots = [
  { route: "/", file: "home.png" },
  { route: "/projects", file: "projects.png" },
  { route: "/articles", file: "articles.png" },
  { route: "/about", file: "about.png" },
];

test("capture required mockup screenshots", async ({ page }) => {
  const mockupDir = path.join(process.cwd(), "mockups");
  await mkdir(mockupDir, { recursive: true });

  for (const shot of shots) {
    await page.goto(shot.route);
    await expect(page.locator("body")).toContainText(/Recode|Projects|Articles|About/);
    await page.screenshot({
      fullPage: true,
      path: path.join(mockupDir, shot.file),
    });
  }
});
