function getSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return "https://www.libenxier.com";
}

export const siteConfig = {
  title: "Recode",
  description: "一个普通大学生在 AI 时代重新编码自己的公开成长档案。",
  url: getSiteUrl(),
  tagline: "A public log of projects, thoughts, and personal evolution.",
  navigation: [
    { href: "/", label: "Recode" },
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
  ],
  externalLinks: [
    { href: "https://github.com/libenxier-beep", label: "GitHub" },
  ],
} as const;

export function buildPageTitle(title: string) {
  return `${title} · ${siteConfig.title}`;
}
