"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/92 backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8 lg:px-10">
        <Link href="/" className="font-serif text-2xl tracking-tight text-text-primary">
          Recode
        </Link>
        <nav
          aria-label="Primary"
          className="flex items-center gap-3 text-sm [font-family:ui-sans-serif,system-ui,sans-serif] sm:gap-5"
        >
          {siteConfig.navigation.slice(1).map((item) => {
            const isActive =
              item.href === "/"
                ? pathname === item.href
                : pathname === item.href || pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`border-b px-1 py-2 ${
                  isActive
                    ? "border-accent/55 text-text-primary"
                    : "border-transparent text-text-secondary hover:border-border hover:text-text-primary"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
