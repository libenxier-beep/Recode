import { render, screen } from "@testing-library/react";
import { ProjectCard } from "@/components/content/ProjectCard";

describe("ProjectCard", () => {
  test("renders fallback when github link is missing", () => {
    render(
      <ProjectCard
        project={{
          slug: "demo",
          title: "Demo Project",
          summary: "Summary",
          status: "Demo",
          lastUpdated: "2026-05-01",
          techStack: ["Next.js"],
          githubUrl: "",
          demoUrl: "",
          featured: false,
          order: 1,
        }}
      />,
    );

    expect(screen.getByText("GitHub: Coming soon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Details" })).toHaveAttribute(
      "href",
      "/projects/demo",
    );
  });
});
