import type { Metadata } from "next";
import { ProjectCard } from "@/components/content/ProjectCard";
import { Container } from "@/components/site/Container";
import { SectionHeader } from "@/components/site/SectionHeader";
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

  return (
    <Container className="gap-12 pb-20 pt-14 md:pt-20">
      <section className="space-y-5">
        <p className="text-label">Projects</p>
        <h1 className="max-w-4xl font-serif text-5xl tracking-tight text-text-primary md:text-6xl">
          The workshop — experiments, products, and systems kept in public.
        </h1>
        <p className="max-w-3xl text-lg leading-8 text-text-secondary">
          这里记录我正在做的项目、产品实验、AI workflow 和工程化尝试。
        </p>
      </section>

      <section className="flex flex-wrap gap-3">
        {filters.map((filter) => {
          const isActive = filter.value === activeFilter;
          return (
            <a
              key={filter.value}
              className={`rounded-full border px-4 py-2 text-sm ${
                isActive
                  ? "border-accent bg-accent text-background"
                  : "border-border bg-card text-text-secondary hover:text-text-primary"
              }`}
              href={filter.value === "all" ? "/projects" : `/projects?filter=${filter.value}`}
            >
              {filter.label}
            </a>
          );
        })}
      </section>

      <section className="space-y-7">
        <SectionHeader
          eyebrow="§ 01"
          title={`${projects.length} public builds`}
          description="项目页强调为什么做、推进到哪里、遇到了什么问题，以及能力是如何被项目压缩出来的。"
        />
        <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </Container>
  );
}
