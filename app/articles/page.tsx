import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { groupPublishedArticlesByYear } from "@/lib/content";
import type { ArticleType } from "@/lib/content/types";
import { buildPageTitle } from "@/lib/site-config";

const tabs: Array<{ label: string; value: ArticleType }> = [
  { label: "Blog", value: "blog" },
  { label: "Notes", value: "note" },
];

export const metadata: Metadata = {
  title: buildPageTitle("Articles"),
  description: "保存公开写作、博客文章与思考札记。",
  openGraph: {
    title: "Articles",
    description: "保存公开写作、博客文章与思考札记。",
    type: "website",
  },
};

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ tab?: ArticleType }>;
}) {
  const params = await searchParams;
  const activeTab = params.tab === "note" ? "note" : "blog";
  const grouped = await groupPublishedArticlesByYear(activeTab);
  const totalCount = Object.values(grouped).reduce(
    (count, entries) => count + entries.length,
    0,
  );

  return (
    <Container className="gap-14 pb-24 pt-12 md:pt-16">
      <section className="space-y-8">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-border/80 pb-6">
          <div className="flex items-end gap-5">
            <h1 className="font-serif text-6xl leading-none tracking-tight text-text-primary md:text-7xl">
              2026
            </h1>
            <p className="pb-2 text-sm uppercase tracking-[0.26em] text-text-secondary">
              {totalCount} articles
            </p>
          </div>
          <div className="flex gap-6 text-sm text-text-secondary">
            {tabs.map((tab) => {
              const isActive = tab.value === activeTab;
              return (
                <a
                  key={tab.value}
                  href={`/articles?tab=${tab.value}`}
                  className={`border-b pb-1 ${
                    isActive
                      ? "border-accent text-text-primary"
                      : "border-transparent hover:text-text-primary"
                  }`}
                >
                  {tab.label}
                </a>
              );
            })}
          </div>
        </div>
      </section>

      <section className="space-y-12">
        {Object.entries(grouped).map(([year, entries]) => (
          <div key={year} className="space-y-3">
            <h2 className="text-sm uppercase tracking-[0.26em] text-text-secondary">
              {year}
            </h2>
            <div className="border-t border-border/80">
              {entries.map((article) => (
                <a
                  key={article.slug}
                  href={`/articles/${article.slug}`}
                  className="grid gap-4 border-b border-border/80 py-6 md:grid-cols-[9rem_minmax(0,1fr)_auto] md:items-start"
                >
                  <div className="text-sm text-text-secondary">{article.date}</div>
                  <div className="max-w-4xl">
                    <h3 className="font-serif text-3xl leading-tight text-text-primary md:text-[2.35rem]">
                      {article.title}
                    </h3>
                    <p className="mt-3 max-w-3xl text-base leading-8 text-text-secondary">
                      {article.summary}
                    </p>
                  </div>
                  <div className="flex items-center justify-between gap-6 md:flex-col md:items-end md:justify-start">
                    <div className="flex flex-wrap gap-2 md:justify-end">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-border px-3 py-1 text-xs text-text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <span className="text-xl text-text-secondary">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </section>
    </Container>
  );
}
