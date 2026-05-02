import type { Metadata } from "next";
import { Container } from "@/components/site/Container";
import { PageIntro } from "@/components/site/PageIntro";
import { buildPageTitle, siteConfig } from "@/lib/site-config";

const tocItems = [
  { href: "#bio", label: "Bio — 简介" },
  { href: "#current-focus", label: "Current Focus" },
  { href: "#projects", label: "Projects" },
  { href: "#beliefs", label: "Beliefs" },
  { href: "#timeline", label: "Timeline" },
  { href: "#contact", label: "Contact" },
];

const beliefs = [
  "成长需要持续输出",
  "判断力比信息量更重要",
  "项目是认知的压缩器",
  "AI 应该成为个人系统的骨架",
  "写作是公开思考的方式",
];

export const metadata: Metadata = {
  title: buildPageTitle("About"),
  description: "关于 Recode 背后的个人成长叙事、关注方向与公开信念。",
  openGraph: {
    title: "About",
    description: "关于 Recode 背后的个人成长叙事、关注方向与公开信念。",
    type: "profile",
  },
};

export default function AboutPage() {
  return (
    <Container className="gap-14 pb-24 pt-12 md:pt-16">
      <PageIntro
        breadcrumb="Recode / § 03 · About"
        title={
          <>
            The <span className="italic text-accent">dossier</span> — a student
            rebuilding himself in public.
          </>
        }
        description="关于这个网站背后的长期叙事：我为什么做 Recode、在把什么当作主线、靠什么积累判断力，以及我想留下怎样的公开成长证据。"
      />

      <div className="grid gap-14 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <aside className="space-y-12 lg:pt-6">
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-text-secondary">
              On this page
            </p>
            <ul className="mt-5 space-y-4">
              {tocItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-sm leading-6 text-text-secondary hover:text-text-primary"
                  >
                    § {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.26em] text-text-secondary">
              Elsewhere
            </p>
            <ul className="mt-5 space-y-4">
              {siteConfig.externalLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    rel="noreferrer"
                    target="_blank"
                    className="text-sm leading-6 text-text-secondary hover:text-text-primary"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <article className="space-y-14">
          <section id="bio" className="space-y-6 border-b border-border/80 pb-12">
            <h1 className="font-serif text-5xl tracking-tight text-text-primary md:text-6xl">
              简介 — <span className="italic text-text-secondary">Bio</span>
            </h1>
            <div className="space-y-7 text-2xl leading-[1.85] text-text-primary">
              <p>
                我是一个把 AI、项目、写作和系统化学习当作长期主线的普通大学生。
                这个网站不是单纯的作品集，更像一份持续公开的成长档案。
              </p>
              <p>
                Recode 记录的是过程：我在做什么、为什么做、判断如何变化、能力如何被项目压缩出来，
                以及我如何慢慢把个人系统搭得更稳。
              </p>
            </div>
          </section>

          <section id="current-focus" className="space-y-5 border-b border-border/80 pb-12">
            <h2 className="font-serif text-3xl text-text-primary">Current Focus</h2>
            <ul className="grid gap-3 text-lg text-text-secondary md:grid-cols-2">
              <li>AI Agent 与个人系统</li>
              <li>项目驱动的能力积累</li>
              <li>写作与公开表达</li>
              <li>价值投资与跨领域认知</li>
            </ul>
          </section>

          <section id="projects" className="space-y-5 border-b border-border/80 pb-12">
            <h2 className="font-serif text-3xl text-text-primary">Projects</h2>
            <p className="max-w-4xl text-xl leading-[1.9] text-text-secondary">
              我重视项目，因为项目会把判断、执行、反馈、复盘放进同一条链路里。它既是能力的压缩器，也是公开成长最有说服力的证据层。
            </p>
          </section>

          <section id="beliefs" className="space-y-5 border-b border-border/80 pb-12">
            <h2 className="font-serif text-3xl text-text-primary">Beliefs</h2>
            <ul className="space-y-4 text-xl leading-[1.8] text-text-secondary">
              {beliefs.map((belief) => (
                <li key={belief}>{belief}</li>
              ))}
            </ul>
          </section>

          <section id="timeline" className="space-y-5 border-b border-border/80 pb-12">
            <h2 className="font-serif text-3xl text-text-primary">Timeline</h2>
            <p className="max-w-4xl text-xl leading-[1.9] text-text-secondary">
              关键成长节点会持续补完，但我更关心的是：每一段路径如何改变了现在的判断结构，而不只是留下一个年份标签。
            </p>
          </section>

          <section id="contact" className="space-y-6">
            <h2 className="font-serif text-3xl text-text-primary">Contact</h2>
            <p className="max-w-4xl text-xl leading-[1.9] text-text-secondary">
              如果你想继续关注我的项目、文章和公开实验，可以通过 GitHub 或其他公开平台找到我。
            </p>
            <blockquote className="max-w-3xl border-l-2 border-accent pl-6 text-lg italic leading-8 text-text-secondary">
              人生的尴尬在于，之前决策的时候不可能拥有之后那么丰富的经验。
            </blockquote>
          </section>
        </article>
      </div>
    </Container>
  );
}
