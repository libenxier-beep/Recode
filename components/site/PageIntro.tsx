import type { ReactNode } from "react";

type PageIntroProps = {
  breadcrumb: string;
  title: ReactNode;
  description: ReactNode;
};

export function PageIntro({ breadcrumb, title, description }: PageIntroProps) {
  return (
    <section className="space-y-6 border-b border-border/80 pb-10 md:space-y-8 md:pb-12">
      <p className="text-xs uppercase tracking-[0.28em] text-text-secondary">
        {breadcrumb}
      </p>
      <div className="space-y-5">
        <h1 className="max-w-6xl font-serif text-5xl leading-[1.02] tracking-tight text-text-primary md:text-7xl">
          {title}
        </h1>
        <div className="max-w-4xl text-lg leading-9 text-text-secondary md:text-[1.55rem] md:leading-[1.8]">
          {description}
        </div>
      </div>
    </section>
  );
}
