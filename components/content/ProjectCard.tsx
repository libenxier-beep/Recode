import Link from "next/link";
import { StatusBadge } from "@/components/content/StatusBadge";
import { Tag } from "@/components/content/Tag";
import type { ProjectMeta } from "@/lib/content/types";

export function ProjectCard({ project }: { project: ProjectMeta }) {
  return (
    <article className="group flex h-full flex-col rounded-[1.8rem] border border-border bg-card p-5 shadow-card transition-transform hover:-translate-y-0.5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm text-text-secondary">{project.lastUpdated}</p>
          <h3 className="mt-2 font-serif text-2xl text-text-primary">
            {project.title}
          </h3>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-4 text-sm leading-7 text-text-secondary">{project.summary}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {project.techStack.map((item) => (
          <Tag key={item} label={item} />
        ))}
      </div>
      <div className="mt-auto flex items-center gap-5 pt-8 text-sm text-text-secondary">
        {project.githubUrl ? (
          <a href={project.githubUrl} rel="noreferrer" target="_blank" className="hover:text-text-primary">
            GitHub
          </a>
        ) : (
          <span>GitHub: Coming soon</span>
        )}
        <Link href={`/projects/${project.slug}`} className="hover:text-text-primary">
          Details
        </Link>
      </div>
    </article>
  );
}
