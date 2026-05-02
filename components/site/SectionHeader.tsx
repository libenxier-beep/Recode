type SectionHeaderProps = {
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <div className="grid gap-3 md:grid-cols-[auto_minmax(0,1fr)] md:items-end md:gap-6">
      <p className="text-label">{eyebrow}</p>
      <div>
        <h2 className="font-serif text-4xl tracking-tight text-text-primary md:text-5xl">
          {title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-7 text-text-secondary">
          {description}
        </p>
      </div>
    </div>
  );
}
