import { render, screen } from "@testing-library/react";
import { ArticleListItem } from "@/components/content/ArticleListItem";

describe("ArticleListItem", () => {
  test("renders tags and detail link", () => {
    render(
      <ArticleListItem
        article={{
          slug: "why-recode",
          title: "Why Recode",
          summary: "A summary",
          date: "2026-05-01",
          dateLabel: "May 01",
          type: "blog",
          tags: ["AI", "成长"],
          status: "published",
          featured: true,
        }}
      />,
    );

    expect(screen.getByText("AI")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Why Recode" })).toHaveAttribute(
      "href",
      "/articles/why-recode",
    );
  });
});
