export function Tag({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-border bg-background px-2.5 py-1 text-xs text-text-secondary">
      {label}
    </span>
  );
}
