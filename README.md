# Recode

一个普通大学生在 AI 时代重新编码自己的公开成长档案。

## Tech Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- MDX
- Vercel
- Vitest
- Playwright

## Development

```bash
npm install
npm run dev
```

默认开发环境会使用 Webpack 模式启动，以兼容当前机器上的 Next.js 16 原生 binding 限制。

## Scripts

```bash
npm run lint
npm run test
npm run build
npm run test:e2e
npm run mockups
```

## Content

Add projects in:

```bash
content/projects
```

Add blog articles in:

```bash
content/articles/blog
```

Add note articles in:

```bash
content/articles/notes
```

每个项目与文章都使用 frontmatter + MDX 正文，由 `lib/content` 统一读取和排序。

## Mockups

运行以下命令会生成 4 张 mockup 截图：

```bash
npm run mockups
```

输出位置：

```bash
mockups/home.png
mockups/projects.png
mockups/articles.png
mockups/about.png
```

## Deploy

Deploy with Vercel.
