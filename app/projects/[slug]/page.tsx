import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXContent } from "@/components/content/MDXContent";
import { StatusBadge } from "@/components/content/StatusBadge";
import { Tag } from "@/components/content/Tag";
import { Container } from "@/components/site/Container";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} · Recode`,
    description: project.summary,
    openGraph: {
      title: project.title,
      description: project.summary,
      type: "article",
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <Container className="gap-10 pb-20 pt-14 md:pt-20">
      <section className="space-y-5">
        <p className="text-label">Project Archive</p>
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="font-serif text-5xl tracking-tight text-text-primary md:text-6xl">
            {project.title}
          </h1>
          <StatusBadge status={project.status} />
        </div>
        <p className="max-w-3xl text-lg leading-8 text-text-secondary">{project.summary}</p>
      </section>

      <section className="grid gap-10 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
        <aside className="rounded-[1.8rem] border border-border bg-card p-5 shadow-card">
          <h2 className="font-serif text-2xl text-text-primary">Project Info</h2>
          <dl className="mt-5 space-y-4 text-sm leading-7 text-text-secondary">
            <div>
              <dt className="text-label">Status</dt>
              <dd className="mt-1">{project.status}</dd>
            </div>
            <div>
              <dt className="text-label">GitHub</dt>
              <dd className="mt-1">
                {project.githubUrl ? (
                  <a href={project.githubUrl} rel="noreferrer" target="_blank" className="hover:text-text-primary">
                    View repository
                  </a>
                ) : (
                  "Coming soon"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-label">Preview</dt>
              <dd className="mt-1">
                {project.demoUrl ? (
                  <a href={project.demoUrl} rel="noreferrer" target="_blank" className="hover:text-text-primary">
                    Open demo
                  </a>
                ) : (
                  "No public demo yet"
                )}
              </dd>
            </div>
            <div>
              <dt className="text-label">Last Updated</dt>
              <dd className="mt-1">{project.lastUpdated}</dd>
            </div>
            <div>
              <dt className="text-label">Tech Stack</dt>
              <dd className="mt-2 flex flex-wrap gap-2">
                {project.techStack.map((item) => (
                  <Tag key={item} label={item} />
                ))}
              </dd>
            </div>
          </dl>
        </aside>
        <article className="rounded-[1.8rem] border border-border bg-card px-6 py-8 shadow-card md:px-10">
          <MDXContent source={project.content} />
        </article>
      </section>
    </Container>
  );
}
