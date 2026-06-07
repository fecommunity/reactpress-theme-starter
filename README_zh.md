# ReactPress Theme Starter

![ReactPress Theme Starter](/public/logo-400.png)

**[ReactPress](https://github.com/fecommunity/reactpress) 官方访客站主题模板** — Tailwind CSS 4 + Next.js 15 App Router，通过 [`@fecommunity/reactpress-toolkit`](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) 对接 CMS API，渲染文章、分类、标签、评论、知识库等动态内容。

> 本仓库是 **Theme（主题）**，不是完整的 CMS。你需要一个正在运行的 ReactPress API，或使用内置 **Mock 模式**离线预览。

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9-F69220)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**语言：** [English](./README.md) · 简体中文

## 特性

- **App Router + RSC**：首页、文章、分类、标签、归档、搜索等页面支持 ISR（`revalidate = 60`）
- **ReactPress 数据层**：`fetch*PageProps` / `themeApi` 拉取后台内容，无本地 MDX
- **Mock 模式**：`pnpm dev:mock` 无需后台即可本地开发与 CI 构建；Vercel 演示站同样基于 Mock API
- **深浅色模式**：跟随系统或手动切换；`theme.json` 外观面板可配置主色与背景色
- **完整站点能力**：评论、知识库、搜索聚合、自定义页面、RSS / sitemap、GitHub 登录、多语言切换
- **远程 API 联调**：`pnpm dev -- --remote-origin api.example.com` 直连线上后台
- **Vercel 就绪**：Headless 主题 + 远程 API，或 Mock 一键部署演示

## 前置要求

| 项目 | 说明 |
| :--- | :--- |
| Node.js | **20+** |
| pnpm | **9+**（本仓库仅使用 pnpm） |
| ReactPress API | 本地 `reactpress dev`，或远程实例；Mock 模式可跳过 |
| toolkit | **3.1.0+**（`@fecommunity/reactpress-toolkit`） |

## 快速开始

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install

# 方式 A：Mock 模式（无需后台，推荐首次体验）
pnpm dev:mock

# 方式 B：对接本地 ReactPress（API 默认 http://localhost:3002/api）
pnpm dev
```

浏览器打开 **http://localhost:3001**。Mock 数据围绕 [ReactPress 官方仓库](https://github.com/fecommunity/reactpress) 与 [官网](https://reactpress.surge.sh/) 编写，默认英文内容。

## 对接远程 API

```bash
# 域名会自动补全为 https://
pnpm dev -- --remote-origin api.yoursite.com

# 写入 .env 等价于每次传参
# REACTPRESS_DEV_REMOTE_ORIGIN=https://api.yoursite.com
pnpm dev
```

管理端 / 访客端 API 分离：

```bash
pnpm dev -- --remote-origin api.yoursite.com --admin-origin local --client-origin remote
```

## 环境变量

复制 [`.env.example`](./.env.example) 为 `.env`（仓库已含默认本地配置）：

| 变量 | 说明 |
| :--- | :--- |
| `REACTPRESS_API_URL` | SSR 请求 API 根地址（含 `/api`） |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | 浏览器 CSR 请求；生产环境常用 `/api` |
| `CLIENT_SITE_URL` | 访客站 URL（SEO / sitemap / OG） |
| `BASE_PATH` | 子路径部署（可选） |
| `REACTPRESS_MOCK_API` | 设为 `1` 启用内置 Mock API（`app/api/[[...path]]`） |
| `REACTPRESS_DEV_REMOTE_ORIGIN` | dev 默认远程 API（等价 `--remote-origin`） |

## 常用脚本

```bash
pnpm dev:mock          # Mock 开发（离线）
pnpm dev               # 对接真实 API
pnpm build:mock        # Mock 生产构建（Vercel / CI 使用）
pnpm build             # 标准生产构建（需可访问的 API）
pnpm start             # 生产预览（:3001）
pnpm run check         # lint + format 检查
pnpm run typecheck     # TypeScript 检查
```

Mock 构建验证通过后，可对运行中的 `dev:mock` 执行冒烟测试：

```bash
pnpm dev:mock &
node scripts/smoke-pages.mjs http://127.0.0.1:3001
```

## 主题清单（theme.json）

路由与模板映射见 [`theme.json`](./theme.json)，Schema 见 [`theme.manifest.schema.json`](./theme.manifest.schema.json)。

| 模板键 | 路径 |
| :--- | :--- |
| `home` | `app/page.tsx` |
| `single` | `app/article/[id]/page.tsx` |
| `page` | `app/page/[id]/page.tsx` |
| `archive-category` | `app/category/[category]/page.tsx` |
| `archive-tag` | `app/tag/[tag]/page.tsx` |
| `archives` | `app/archives/page.tsx` |
| `search` | `app/search/page.tsx` |
| `404` | `app/not-found.tsx` |

后台「外观 → 自定义」控件在 `theme.json` → `appearance` 声明，运行时通过 `useThemeMod` 与 CSS 变量生效。

## 目录结构

```
reactpress-theme-starter/
├── app/                    # App Router 路由与 API Route Handler
├── components/
│   ├── layout/             # Header、Footer、双栏布局
│   ├── article/            # 文章列表、详情、轮播
│   ├── comment/            # 评论
│   ├── search/             # 搜索页
│   ├── widgets/            # 侧边栏组件
│   └── views/              # 页面级 Client 组件
├── lib/
│   ├── mock-api/           # Mock 数据与路由匹配（dev:mock / build:mock）
│   ├── reactpress/         # bootstrap、metadata、appearance、SEO
│   └── providers/          # 客户端 / 服务端 Provider
├── scripts/                # dev、build:mock、smoke-pages 等
├── public/                 # 品牌资源
├── theme.json              # ReactPress 主题 manifest
└── vercel.json             # Vercel 构建与环境变量
```

## 部署到 Vercel

本主题是 **Headless 前端**。生产环境请将 API 变量指向你的 ReactPress 实例。

**演示站 / 无后台预览：** `vercel.json` 已配置 `build:mock` + `REACTPRESS_MOCK_API=1`，可直接 Import 本仓库体验主题外观。

**正式站点：**

1. [Vercel New Project](https://vercel.com/new) → Import `fecommunity/reactpress-theme-starter`
2. Framework：**Next.js**（读取 `vercel.json` 中的 pnpm 命令）
3. Environment Variables：

| 变量 | 示例值 |
| :--- | :--- |
| `REACTPRESS_API_URL` | `https://api.yoursite.com/api` |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | `/api` 或完整 API URL |
| `CLIENT_SITE_URL` | `https://www.yoursite.com` |

4. 将 `buildCommand` 改为 `pnpm run build`（去掉 Mock），并移除 `REACTPRESS_MOCK_API`

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

## CI

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) 在 push / PR 时执行：

- ESLint + Prettier 检查
- TypeScript 检查（`continue-on-error`，不阻塞合并）
- 启动 Mock API → `pnpm run build:ci` 生产构建

## 在 ReactPress Monorepo 中使用

若主题位于 ReactPress 仓库 `themes/` 目录，可将 toolkit 依赖改为 `workspace:*`，在仓库根目录 `pnpm dev` 联动 API 与主题。

## 相关链接

- [ReactPress 官网](https://reactpress.surge.sh/)
- [ReactPress GitHub](https://github.com/fecommunity/reactpress)
- [Toolkit on npm](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit)
- [Theme Manifest Schema](./theme.manifest.schema.json)

## 许可

[MIT](./LICENSE) © ReactPress / FECommunity
