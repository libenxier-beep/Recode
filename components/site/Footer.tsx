import Link from "next/link";
import { siteConfig } from "@/lib/site-config";

const readLinks = [
  { href: "/articles?tab=blog", label: "Articles" },
  { href: "/articles?tab=note", label: "Notes" },
];

const buildLinks = [
  { href: "/projects", label: "Projects" },
  { href: siteConfig.externalLinks[0].href, label: "GitHub", external: true },
];

export function Footer() {
  return (
    <footer className="border-t border-border/90 bg-card/75">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[1.3fr_repeat(3,minmax(0,1fr))] lg:px-10">
        <div>
          <p className="font-serif text-2xl text-text-primary">{siteConfig.title}</p>
          <p className="mt-3 max-w-sm text-sm leading-7 text-text-secondary">{siteConfig.tagline}</p>
        </div>
        <FooterColumn title="Read" links={readLinks} />
        <FooterColumn title="Build" links={buildLinks} />
        <FooterColumn
          title="Elsewhere"
          links={siteConfig.externalLinks.map((item) => ({ ...item, external: true }))}
        />
      </div>
      <div className="border-t border-border/80 px-5 py-4 text-sm text-text-secondary sm:px-8 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
          <span>© 2026 Recode · Built with Next.js and MDX</span>
        </div>
      </div>
    </footer>
  );
}

type FooterLink = {
  href: string;
  label: string;
  external?: boolean;
};

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) {
  return (
    <div>
      <p className="text-label">{title}</p>
      <ul className="mt-4 space-y-3 text-sm text-text-secondary">
        {links.map((item) => (
          <li key={item.href}>
            {item.external ? (
              <a
                href={item.href}
                rel="noreferrer"
                target="_blank"
                className="hover:text-text-primary"
              >
                {item.label}
              </a>
            ) : (
              <Link href={item.href} className="hover:text-text-primary">
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
