import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/site/Container";
import { listProjectsByFilter } from "@/lib/content";
import { buildPageTitle } from "@/lib/site-config";

const filters = [
  { label: "All", value: "all" },
  { label: "Active", value: "active" },
  { label: "Demo", value: "demo" },
  { label: "Archived", value: "archived" },
];

export const metadata: Metadata = {
  title: buildPageTitle("Projects"),
  description: "公开展示当前正在构建、实验和沉淀中的项目档案。",
  openGraph: {
    title: "Projects",
    description: "公开展示当前正在构建、实验和沉淀中的项目档案。",
    type: "website",
  },
};

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) {
  const params = await searchParams;
  const activeFilter = params.filter ?? "all";
  const projects = await listProjectsByFilter(activeFilter);
  const buildCountLabel = `${projects.length} public build${projects.length === 1 ? "" : "s"}`;

  return (
    <Container className="gap-10 pb-20 pt-14 md:gap-12 md:pt-20">
      <section className="space-y-6 border-b border-border/80 pb-10 md:space-y-8 md:pb-12">
        <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
          Recode / § 01 · Projects
        </p>
        <div className="space-y-5">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="max-w-5xl font-serif text-5xl leading-[1.02] tracking-tight text-text-primary md:text-7xl">
              The <span className="italic text-accent">workshop</span> —
              products, experiments, and systems kept in public.
            </h1>
            <p className="pb-2 text-[0.78rem] uppercase tracking-[0.24em] text-text-secondary [font-family:ui-sans-serif,system-ui,sans-serif]">
              {buildCountLabel}
            </p>
          </div>
          <div className="max-w-4xl text-lg leading-9 text-text-secondary md:text-[1.55rem] md:leading-[1.8]">
            项目页强调为什么做、推进到哪里、遇到了什么问题，以及能力是如何被项目压缩出来的。
          </div>
        </div>
      </section>

      <section className="flex flex-wrap gap-2 [font-family:ui-sans-serif,system-ui,sans-serif]">
        {filters.map((filter) => {
          const isActive = filter.value === activeFilter;
          return (
            <a
              key={filter.value}
              className={`rounded-[6px] border px-3 py-1.5 text-[0.82rem] tracking-[0.01em] ${
                isActive
                  ? "border-accent/55 bg-white/80 text-text-primary"
                  : "border-border/90 bg-transparent text-text-secondary hover:border-text-secondary/35 hover:text-text-primary"
              }`}
              href={filter.value === "all" ? "/projects" : `/projects?filter=${filter.value}`}
            >
              {filter.label}
            </a>
          );
        })}
      </section>

      <section className="border-t border-border/80">
        <div className="divide-y divide-border/80">
          {projects.map((project, index) => (
            <article
              key={project.slug}
              className="grid gap-5 py-7 md:grid-cols-[5.5rem_minmax(0,1fr)] md:gap-8 lg:grid-cols-[5.5rem_minmax(0,1fr)_14rem]"
            >
              <div className="flex items-start justify-between gap-3 md:justify-start">
                <span className="font-serif text-[2.2rem] leading-none text-[#9f9990]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <h2 className="font-serif text-[2rem] leading-tight tracking-[-0.02em] text-text-primary md:text-[2.2rem]">
                    {project.title}
                  </h2>
                  <p className="max-w-3xl text-base leading-8 text-text-secondary">
                    {project.summary}
                  </p>
                </div>

                <div className="flex flex-wrap gap-x-8 gap-y-3 text-[0.82rem] text-text-secondary [font-family:ui-sans-serif,system-ui,sans-serif]">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#8c867d]">
                      Status
                    </span>
                    <span className="text-text-primary">{project.status}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#8c867d]">
                      Updated
                    </span>
                    <span className="text-text-primary">{project.lastUpdated}</span>
                  </div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-[0.68rem] uppercase tracking-[0.22em] text-[#8c867d]">
                      Stack
                    </span>
                    <span className="text-text-primary">{project.techStack.join(" · ")}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4 text-sm text-text-secondary [font-family:ui-sans-serif,system-ui,sans-serif] lg:justify-end">
                {project.githubUrl ? (
                  <a
                    href={project.githubUrl}
                    rel="noreferrer"
                    target="_blank"
                    className="hover:text-text-primary"
                  >
                    GitHub
                  </a>
                ) : (
                  <span>GitHub: Coming soon</span>
                )}
                <span className="text-border">|</span>
                <Link href={`/projects/${project.slug}`} className="hover:text-text-primary">
                  Details
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </Container>
  );
}
