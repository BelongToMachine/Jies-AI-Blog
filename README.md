# Jie’s Craft

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Bun](https://img.shields.io/badge/package%20manager-Bun-fbf0df?logo=bun)](https://bun.sh/)

[简体中文](#中文) | [English](#english)

---

## 中文

Jie’s Craft 是一个现代化的开源 Next.js 全栈作品集与博客项目，内置一个围绕站点资料工作的 AI Agent 问答助手。它结合双语内容、现代界面、细致连贯的动画体验，以及可实际部署的服务端功能，适合作为个人网站，也可以作为全栈 Next.js 项目的参考起点。

- 在线体验：[jie-craft.com](https://jie-craft.com)
- GitHub 仓库：[BelongToMachine/My-blog-new](https://github.com/BelongToMachine/My-blog-new)

### 项目特色

- **现代全栈架构**：Next.js App Router、TypeScript、Prisma 和 PostgreSQL，包含页面、API、数据持久化与第三方服务集成。
- **连贯完整的动效体验**：动效贯穿页面入场、主题切换、悬停状态和关键交互反馈，采用统一的节奏与缓动，让界面更有层次，也让操作反馈清晰自然。
- **自适应动效设置**：支持完整、受限和减少动效模式，并尊重系统的减少动态效果偏好。
- **内置 AI Agent 问答助手**：以流式方式回答问题，并通过工具查询项目、文章等站点内容。
- **双语作品集与博客**：提供中文和英文页面，文章使用 MDX 管理。
- **可部署的业务功能**：聊天线程持久化、联系表单邮件发送、Upstash Redis 限流支持。

AI 助手是围绕个人作品集和博客内容构建的问答 Agent 示例。可以根据自己的项目调整模型、工具和内容来源。

### 技术栈

Next.js 14 App Router、React、TypeScript、Tailwind CSS、next-intl、Vercel AI SDK、大语言模型 API、Prisma、PostgreSQL、Upstash Redis、Resend。

### 本地运行

需要安装 [Bun](https://bun.sh/)（项目使用 Bun 1.3.11）和 Node.js 18 或更新版本。

```bash
git clone https://github.com/BelongToMachine/My-blog-new.git
cd My-blog-new
bun install
cp .env.example .env.local
```

根据需要配置下方环境变量，然后启动开发服务器：

```bash
bun dev
```

访问 [http://localhost:3000/zh](http://localhost:3000/zh) 或 [http://localhost:3000/en](http://localhost:3000/en)。

如果需要将聊天记录持久化到 PostgreSQL，请设置 `DATABASE_URL`，并应用 Prisma migrations：

```bash
bun prisma:generate
bunx prisma migrate deploy
```

### 环境变量

将需要的变量添加到本地 `.env.local`，或配置在 Vercel 项目的 Environment Variables 中。不要将真实密钥提交到 Git。

| 变量 | 用途 | 何时需要 |
|---|---|---|
| `DEEPSEEK_API_KEY` | 当前模型服务的 API 密钥 | 使用 AI Agent 时需要 |
| `DATABASE_URL` | PostgreSQL 连接字符串 | 需要持久化聊天记录时配置 |
| `UPSTASH_REDIS_REST_URL`、`UPSTASH_REDIS_REST_TOKEN` | Upstash Redis 限流 | 生产环境建议配置 |
| `RESEND_API_KEY` | Resend 邮件服务密钥 | 启用联系表单邮件发送时需要 |
| `CONTACT_FROM_EMAIL` | Resend 已验证的发件地址 | 启用联系表单时配置 |
| `CONTACT_RECIPIENT_EMAIL` | 联系表单邮件收件地址 | 启用联系表单时配置 |
| `GITHUB_TOKEN` | 读取私有博客内容仓库的 GitHub token | 使用私有内容仓库部署到 Vercel 时需要 |
| `PRIVATE_BLOG_CONTENT_PATH` | 外部博客内容目录路径 | 使用外部 MDX 内容目录时可选 |
| `DEEPSEEK_BASE_URL` | 当前模型服务的 API 地址覆盖项 | 使用自定义兼容端点时可选 |
| `AI_THINKING_ENABLED` | 开关 AI 推理内容 | 可选，默认关闭 |
| `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS` | Vercel Analytics 开关 | 可选 |

完整变量清单见 [`.env.example`](.env.example)。

### 部署到 Vercel

1. 在 Vercel 中导入 GitHub 仓库，并选择 Next.js 项目。
2. 在项目设置的 **Settings → Environments → Production → Branch Tracking** 中，将 **Production Branch** 设为 `main`。本项目以 `main` 作为生产部署目标分支。
3. 在 **Settings → Environment Variables** 中配置需要的服务变量。
4. 如果博客文章来自私有的 `Private-Blog-Content` 仓库，添加有该仓库读取权限的 `GITHUB_TOKEN`。Vercel 构建时会克隆该内容仓库；不使用私有内容仓库时无需设置。
5. 使用生产数据库前，在有生产数据库连接的安全环境中运行 `bunx prisma migrate deploy`，应用已提交的 migrations。
6. 推送到 `main` 触发生产部署。构建命令已在 [`vercel.json`](vercel.json) 中设置为 `bun run build`。

部署流程会根据 Vercel 项目中配置的 Production Branch 执行生产部署。更多信息见 [Vercel Git 部署文档](https://vercel.com/docs/git/vercel-for-github)。

### 博客内容

文章以 MDX 形式存放。项目可从 `PRIVATE_BLOG_CONTENT_PATH` 指定的目录、本地 `private-blog-content`，或应用内的 `app/content/mdx` 读取内容。中英文内容分别放在 `zh/` 与 `en/` 目录中。

### 常用命令

| 命令 | 说明 |
|---|---|
| `bun dev` | 启动本地开发服务器 |
| `bun run build` | 构建生产版本 |
| `bun start` | 启动生产服务器 |
| `bun lint` | 运行 ESLint |
| `bun prisma:generate` | 生成 Prisma Client |
| `bunx prisma migrate deploy` | 应用已提交的数据库 migrations |

### 项目结构

- `app/[locale]`：中英文页面、文章、AI 助手与联系页面
- `app/api`：AI 对话、线程管理和联系表单 API
- `app/components`：共享页面组件
- `app/content/mdx`：应用内 MDX 内容目录
- `prisma`：数据库 schema 与 migrations

### 参与贡献

欢迎提交 Issue 和 Pull Request。建议先描述准备解决的问题，再提交范围清晰的改动。

### 许可证

仓库当前没有提供 `LICENSE` 文件。公开可见不等同于已授予复用、修改或再分发许可；如需明确开源授权，请在发布前添加所选许可证。

---

## English

Jie’s Craft is a modern, open-source, full-stack portfolio and blog built with Next.js. It includes a lightweight AI Agent that answers questions using the site’s own information. The project brings together bilingual content, a contemporary interface, cohesive motion design, and practical server-side features. Use it as a personal website or as a starting point for a full-stack Next.js project.

- Live site: [jie-craft.com](https://jie-craft.com)
- GitHub repository: [BelongToMachine/My-blog-new](https://github.com/BelongToMachine/My-blog-new)

### Highlights

- **Modern full-stack foundation:** Next.js App Router, TypeScript, Prisma, and PostgreSQL, with pages, APIs, persistence, and third-party service integrations.
- **Cohesive motion throughout the experience:** Motion supports page entrances, theme changes, hover states, and key interaction feedback. Consistent timing and easing give the interface depth while keeping feedback clear and natural.
- **Adaptive motion preferences:** Full, limited, and reduced motion modes are supported, including the operating system’s reduced-motion preference.
- **Built-in AI Agent assistant:** Streams answers and uses tools to look up projects, articles, and other site content.
- **Bilingual portfolio and blog:** Chinese and English pages, with articles authored in MDX.
- **Deployable product features:** Persistent chat threads, contact form email delivery, and Upstash Redis rate limiting.

The assistant is an example of a portfolio-aware Q&A Agent. Adapt its model, tools, and content sources to your own project.

### Tech Stack

Next.js 14 App Router, React, TypeScript, Tailwind CSS, next-intl, Vercel AI SDK, an LLM API, Prisma, PostgreSQL, Upstash Redis, and Resend.

### Run Locally

Install [Bun](https://bun.sh/) (the project uses Bun 1.3.11) and Node.js 18 or newer.

```bash
git clone https://github.com/BelongToMachine/My-blog-new.git
cd My-blog-new
bun install
cp .env.example .env.local
```

Configure the environment variables you need, then start the development server:

```bash
bun dev
```

Visit [http://localhost:3000/zh](http://localhost:3000/zh) or [http://localhost:3000/en](http://localhost:3000/en).

To persist chat history in PostgreSQL, set `DATABASE_URL` and apply the Prisma migrations:

```bash
bun prisma:generate
bunx prisma migrate deploy
```

### Environment Variables

Add the values you need to your local `.env.local` file or to the Vercel project’s Environment Variables. Never commit real secrets to Git.

| Variable | Purpose | Required when |
|---|---|---|
| `DEEPSEEK_API_KEY` | API key for the configured model provider | Using the AI Agent |
| `DATABASE_URL` | PostgreSQL connection string | Persisting chat history |
| `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN` | Upstash Redis rate limiting | Recommended for production |
| `RESEND_API_KEY` | Resend API key | Sending contact form emails |
| `CONTACT_FROM_EMAIL` | Verified Resend sender address | Enabling the contact form |
| `CONTACT_RECIPIENT_EMAIL` | Contact form recipient | Enabling the contact form |
| `GITHUB_TOKEN` | GitHub token with read access to the private content repository | Deploying with private blog content on Vercel |
| `PRIVATE_BLOG_CONTENT_PATH` | Path to an external blog content directory | Using an external MDX content directory |
| `DEEPSEEK_BASE_URL` | API URL override for the configured model provider | Using a custom compatible endpoint |
| `AI_THINKING_ENABLED` | Enable or disable AI reasoning output | Optional; disabled by default |
| `NEXT_PUBLIC_ENABLE_VERCEL_ANALYTICS` | Vercel Analytics toggle | Optional |

See [`.env.example`](.env.example) for the complete variable list.

### Deploy to Vercel

1. Import the GitHub repository into Vercel and select the Next.js project preset.
2. In **Settings → Environments → Production → Branch Tracking**, set the **Production Branch** to `main`. This project uses `main` as its production deployment target.
3. Add the service variables you need under **Settings → Environment Variables**.
4. If your blog posts are stored in the private `Private-Blog-Content` repository, add a `GITHUB_TOKEN` with read access. The Vercel build clones that content repository; omit the token if you do not use it.
5. Before using the production database, run `bunx prisma migrate deploy` from a secure environment with access to that database to apply committed migrations.
6. Push to `main` to trigger a production deployment. The build command is configured as `bun run build` in [`vercel.json`](vercel.json).

Vercel creates production deployments according to the Production Branch configured for the project. See the [Vercel Git deployment documentation](https://vercel.com/docs/git/vercel-for-github).

### Blog Content

Articles are written in MDX. Content can be loaded from the directory set by `PRIVATE_BLOG_CONTENT_PATH`, the local `private-blog-content` directory, or the in-app `app/content/mdx` directory. Chinese and English content use the `zh/` and `en/` directories, respectively.

### Common Commands

| Command | Description |
|---|---|
| `bun dev` | Start the development server |
| `bun run build` | Build for production |
| `bun start` | Start the production server |
| `bun lint` | Run ESLint |
| `bun prisma:generate` | Generate the Prisma Client |
| `bunx prisma migrate deploy` | Apply committed database migrations |

### Project Structure

- `app/[locale]`: Chinese and English pages, articles, AI assistant, and contact page
- `app/api`: AI chat, thread management, and contact form APIs
- `app/components`: Shared UI components
- `app/content/mdx`: In-app MDX content
- `prisma`: Database schema and migrations

### Contributing

Issues and pull requests are welcome. Please describe the problem or proposed change and keep contributions focused.

### License

There is currently no `LICENSE` file in this repository. Public visibility does not grant permission to reuse, modify, or redistribute the code. Add a license before explicitly granting those rights.
