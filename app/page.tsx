import { ArticleListItem } from "@/components/content/ArticleListItem";
import { ProjectCard } from "@/components/content/ProjectCard";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
import { listFeaturedProjects, listRecentArticles } from "@/lib/content";
import { siteConfig } from "@/lib/site-config";

const currentSignals = [
  {
    label: "Current Focus",
    value: "AI × Personal System",
    icon: "01",
  },
  {
    label: "Building",
    value: "已完成事项记录产品",
    icon: "02",
  },
  {
    label: "Writing",
    value: "博客文章 / 思考札记",
    icon: "03",
  },
  {
    label: "Since",
    value: "2026",
    icon: "04",
  },
];

const currentModules = [
  {
    title: "Building",
    body: "最近正在推进的项目、产品实验与工程化尝试。",
  },
  {
    title: "Writing",
    body: "博客文章与札记，记录还在形成中的判断。",
  },
  {
    title: "Learning",
    body: "AI Agent、价值投资、英语与跨领域认知。",
  },
  {
    title: "Shipping",
    body: "GitHub 仓库与最近的公开交付痕迹。",
  },
];

export default async function Home() {
  const [projects, articles] = await Promise.all([
    listFeaturedProjects(3),
    listRecentArticles(4),
  ]);

  return (
    <Container className="gap-20 pb-20 pt-14 md:gap-28 md:pt-20">
      <section className="grid gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(18rem,24rem)] lg:items-end">
        <div className="space-y-8">
          <div className="space-y-4">
            <p className="text-label">Recode</p>
            <h1 className="max-w-4xl font-serif text-5xl leading-[1.02] tracking-tight text-balance text-text-primary md:text-7xl">
              A student recoding himself in the age of AI.
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-text-secondary md:text-xl">
              一个普通大学生的进化日志：记录我如何用 AI、项目、写作和跨领域认知，
              重新编码自己的学习与人生系统。
            </p>
          </div>
          <div className="border border-border bg-card">
            <div className="grid divide-y divide-border lg:grid-cols-4 lg:divide-x lg:divide-y-0">
              {currentSignals.map((item) => (
                <div
                  key={item.label}
                  className="flex min-h-[8.75rem] flex-col justify-between px-5 py-5 md:px-6 md:py-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-text-secondary">
                      {item.label}
                    </p>
                    <span
                      aria-hidden="true"
                      className="text-[0.7rem] tracking-[0.24em] text-text-secondary"
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div className="space-y-3">
                    <div className="h-px w-8 bg-border" />
                    <p className="max-w-[16ch] font-serif text-[1.95rem] leading-[1.15] tracking-tight text-text-primary md:text-[2.15rem]">
                      {item.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <aside className="border border-border bg-muted/65 p-6 lg:p-8">
          <p className="text-label">Archive Note</p>
          <p className="mt-4 font-serif text-2xl leading-tight text-text-primary">
            {siteConfig.description}
          </p>
          <p className="mt-6 text-base leading-7 text-text-secondary">
            这是一个公开成长档案：项目进展、博客文章、思考札记、个人成长路径，
            以及我为什么值得继续被长期关注。
          </p>
        </aside>
      </section>

      <section className="space-y-7">
        <SectionHeader
          eyebrow="§ 01"
          title="Currently"
          description="让这个网站保持活着的感觉：现在在做什么、在写什么、在学什么、在公开交付什么。"
        />
        <div className="grid gap-8 border-t border-border pt-6 md:grid-cols-2 xl:grid-cols-4">
          {currentModules.map((item) => (
            <article
              key={item.title}
              className="border-l border-border pl-5"
            >
              <h2 className="font-serif text-2xl text-text-primary">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-text-secondary">{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-7">
        <SectionHeader
          eyebrow="§ 02"
          title="Recent Projects"
          description="重点展示最近正在推进、能代表长期成长叙事的项目。"
        />
        <div className="grid gap-5 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>

      <section className="space-y-7">
        <SectionHeader
          eyebrow="§ 03"
          title="Recent Articles"
          description="公开写作与思考札记的最近更新，维持一个稳定的输出节奏。"
        />
        <div className="border-l-[3px] border-border/90 pl-6 md:pl-8">
          {articles.map((article, index) => (
            <ArticleListItem
              key={article.slug}
              article={article}
              compact={false}
              bordered={index !== articles.length - 1}
            />
          ))}
        </div>
      </section>

      <section className="space-y-7">
        <SectionHeader
          eyebrow="§ 04"
          title="About"
          description="一个普通大学生如何用 AI、项目、写作和判断力，重新组织自己的人生系统。"
        />
        <div className="grid gap-6 border-t border-border pt-6 md:grid-cols-[1.35fr_auto] md:items-end">
          <p className="max-w-3xl text-lg leading-8 text-text-secondary">
            我是一个正在用 AI、项目和写作重新编码自己的普通大学生。这个网站记录我的项目进展、
            思考札记、博客文章，以及我如何一步步完善自己的学习和人生系统。
          </p>
          <a className="button-link" href="/about">
            Read About
          </a>
        </div>
      </section>
    </Container>
  );
}
