import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/content/MDXContent";
import { Tag } from "@/components/content/Tag";
import { Container } from "@/components/site/Container";
import { getAllArticles, getArticleBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const articles = await getAllArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) return {};

  return {
    title: `${article.title} · Recode`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
    },
  };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article || article.status !== "published") notFound();

  return (
    <Container className="pb-20 pt-14 md:pt-20">
      <article className="mx-auto w-full max-w-[760px] rounded-[2rem] border border-border bg-card px-6 py-8 shadow-card md:px-10 md:py-12">
        <header className="border-b border-border pb-7">
          <p className="text-sm text-text-secondary">
            {article.date} · {article.type.toUpperCase()}
          </p>
          <h1 className="mt-3 font-serif text-4xl leading-tight text-text-primary md:text-5xl">
            {article.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-7 text-text-secondary">
            {article.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Tag key={tag} label={tag} />
            ))}
          </div>
        </header>
        <div className="pt-8">
          <MDXContent source={article.content} />
        </div>
      </article>
    </Container>
  );
}
