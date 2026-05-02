import type { ProjectStatus } from "@/lib/content/types";

const toneMap: Record<ProjectStatus, string> = {
  Idea: "bg-[color:rgba(124,92,62,0.08)] text-accent",
  Building: "bg-[color:rgba(124,92,62,0.14)] text-accent",
  Demo: "bg-[color:rgba(96,120,101,0.14)] text-[#546850]",
  Live: "bg-[color:rgba(74,107,90,0.14)] text-[#3f5d46]",
  Paused: "bg-[color:rgba(120,110,96,0.12)] text-text-secondary",
  Archived: "bg-[color:rgba(111,106,96,0.12)] text-text-secondary",
};

export function StatusBadge({ status }: { status: ProjectStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium tracking-[0.18em] uppercase ${toneMap[status]}`}
    >
      {status}
    </span>
  );
}
