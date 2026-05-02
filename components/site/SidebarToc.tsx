type TocItem = {
  href: string;
  label: string;
};

export function SidebarToc({
  title,
  items,
}: {
  title: string;
  items: TocItem[];
}) {
  return (
    <aside className="rounded-[1.75rem] border border-border bg-card p-5 shadow-card md:sticky md:top-24">
      <p className="text-label">{title}</p>
      <nav aria-label={title} className="mt-5">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                className="text-sm leading-6 text-text-secondary hover:text-text-primary"
                target={item.href.startsWith("http") ? "_blank" : undefined}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
