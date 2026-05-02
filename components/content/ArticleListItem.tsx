import Link from "next/link";
import { Tag } from "@/components/content/Tag";
import type { ArticleMeta } from "@/lib/content/types";

export function ArticleListItem({
  article,
  compact = false,
  bordered = true,
}: {
  article: ArticleMeta;
  compact?: boolean;
  bordered?: boolean;
}) {
  return (
    <article
      className={`px-5 py-5 md:px-6 ${bordered ? "border-b border-border" : ""}`}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-3xl">
          <p className="text-sm text-text-secondary">
            {article.dateLabel} · {article.type.toUpperCase()}
          </p>
          <Link href={`/articles/${article.slug}`} className="group">
            <h3 className="mt-2 font-serif text-2xl text-text-primary transition-colors group-hover:text-accent">
              {article.title}
            </h3>
          </Link>
          <p className={`mt-3 text-sm leading-7 text-text-secondary ${compact ? "line-clamp-2" : ""}`}>
            {article.summary}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 md:max-w-xs md:justify-end">
          {article.tags.map((tag) => (
            <Tag key={tag} label={tag} />
          ))}
        </div>
      </div>
    </article>
  );
}
