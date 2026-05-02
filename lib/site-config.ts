export const siteConfig = {
  title: "Recode",
  description: "一个普通大学生在 AI 时代重新编码自己的公开成长档案。",
  url: "https://recode.local",
  tagline: "A public log of projects, thoughts, and personal evolution.",
  navigation: [
    { href: "/", label: "Recode" },
    { href: "/projects", label: "Projects" },
    { href: "/articles", label: "Articles" },
    { href: "/about", label: "About" },
  ],
  externalLinks: [
    { href: "https://github.com/", label: "GitHub" },
    { href: "https://x.com/", label: "X / Twitter" },
    { href: "https://weixin.qq.com/", label: "WeChat" },
    { href: "https://www.xiaohongshu.com/", label: "Xiaohongshu" },
  ],
} as const;

export function buildPageTitle(title: string) {
  return `${title} · ${siteConfig.title}`;
}
