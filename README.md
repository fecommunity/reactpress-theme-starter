# ReactPress Theme Starter

![ReactPress Theme Starter](/public/logo-400.png)

**这是 [ReactPress](https://reactpress.dev) 的访客站主题（Theme）模板**，不是完整的 CMS 项目。

本仓库提供基于 **Tailwind CSS 4** 与 **Next.js 15 App Router** 的博客主题实现，通过 [`@fecommunity/reactpress-toolkit`](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) 对接 ReactPress 后台 API，拉取文章、分类、标签、评论、知识库等动态内容。

> ReactPress = 后台 CMS（NestJS API + 管理端）+ 可替换主题（本仓库）。  
> 你需要一个正在运行的 ReactPress API（自托管或远程），主题才能正常渲染内容。

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9-F69220)](https://pnpm.io/)

## 特性

- **App Router + RSC**：首页、文章、分类、标签、归档、搜索等页面支持 ISR
- **ReactPress 数据层**：`fetch*PageProps` / `themeApi` 拉取后台内容，无本地 MDX
- **深浅色模式**：跟随系统或手动切换，外观面板可配置主色与背景色
- **完整站点能力**：评论、知识库、网址导航、自定义页面、RSS、用户登录
- **远程 API 联调**：`pnpm dev -- --remote-origin api.example.com` 直连线上后台
- **Vercel 部署**：Headless 主题 + 远程 API，一键部署访客站

## 前置要求

- Node.js **20+**
- [pnpm](https://pnpm.io/installation) **9+**（本仓库仅使用 pnpm，不使用 npm / yarn）
- 一个可访问的 **ReactPress API**（本地 `reactpress dev` 或远程实例）

### 关于 `@fecommunity/reactpress-toolkit`

主题依赖 toolkit 的 `theme/*`、`ui/*` 子路径（SSR 助手、Provider、Headless UI）。请使用 **3.1.0+**：

```bash
pnpm add @fecommunity/reactpress-toolkit@^3.1.0
```

## 快速开始

```bash
# 1. 克隆并安装（仅 pnpm）
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env，填写 REACTPRESS_API_URL 等

# 3. 启动主题开发服务器（默认 http://localhost:3001）
pnpm dev
```

### 对接本地 ReactPress

若已在本地运行 `reactpress dev`（API 默认 `http://localhost:3002/api`）：

```bash
cp .env.example .env
pnpm dev
```

### 对接远程 API（无需本地后台）

使用 `--remote-origin` 直连线上 ReactPress API，适合主题开发与 Vercel 预览：

```bash
# 域名会自动补全为 https://
pnpm dev -- --remote-origin api.yoursite.com

# 完整 URL
pnpm dev -- --remote-origin https://api.yoursite.com

# 也可写入 .env，等价于每次传参
# REACTPRESS_DEV_REMOTE_ORIGIN=https://api.yoursite.com
pnpm dev
```

高级用法（管理端 / 访客端 API 分离）：

```bash
pnpm dev -- --remote-origin api.yoursite.com --admin-origin local --client-origin remote
```

## 环境变量

见 [`.env.example`](./.env.example)：

| 变量                             | 说明                                       |
| :------------------------------- | :----------------------------------------- |
| `REACTPRESS_API_URL`             | SSR 请求 API 根地址（含 `/api`）           |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | 浏览器 CSR 请求                            |
| `CLIENT_SITE_URL`                | 访客站 URL（SEO / sitemap）                |
| `BASE_PATH`                      | 子路径部署（可选）                         |
| `REACTPRESS_DEV_REMOTE_ORIGIN`   | dev 默认远程 API（等价 `--remote-origin`） |

## 主题清单（theme.json）

本主题是 ReactPress 的 **Theme Manifest** 实现，路由与模板映射见 [`theme.json`](./theme.json)，Schema 见 [`theme.manifest.schema.json`](./theme.manifest.schema.json)。

| 模板键             | 路径                               |
| :----------------- | :--------------------------------- |
| `home`             | `app/page.tsx`                     |
| `single`           | `app/article/[id]/page.tsx`        |
| `page`             | `app/page/[id]/page.tsx`           |
| `archive-category` | `app/category/[category]/page.tsx` |
| `archive-tag`      | `app/tag/[tag]/page.tsx`           |
| `archives`         | `app/archives/page.tsx`            |
| `search`           | `app/search/page.tsx`              |
| `404`              | `app/not-found.tsx`                |

后台「外观 → 自定义」中的控件在 `theme.json` → `appearance` 声明，运行时通过 `useThemeMod` 与 CSS 变量生效。

## 目录结构

```
reactpress-theme-starter/
├── app/                    # App Router 路由（page / layout / route handler）
├── components/
│   ├── layout/             # 站点壳层（Header、Footer、双栏布局等）
│   ├── article/            # 文章列表、详情、轮播、CMS 页
│   ├── comment/            # 评论模块
│   ├── widgets/            # 侧边栏小组件
│   ├── knowledge/          # 知识库列表
│   ├── views/              # 页面级 Client 组件
│   └── shared/             # 通用组件
├── lib/
│   ├── reactpress/         # bootstrap、metadata、appearance、SEO
│   ├── providers/          # 客户端 / 服务端数据 Provider
│   └── utils/              # 工具函数
├── scripts/
│   ├── dev.mjs             # 开发服务器（支持 --remote-origin）
│   └── remote-dev.mjs      # 远程 API 解析
├── public/                 # 品牌资源
├── theme.json              # ReactPress 主题 manifest
└── vercel.json             # Vercel 部署配置
```

## 开发与代码检查

```bash
pnpm dev                              # 本地开发
pnpm dev -- --remote-origin api.example.com  # 远程 API 联调
pnpm run lint                         # ESLint 自动修复
pnpm run lint:check                   # ESLint 检查
pnpm run typecheck                    # TypeScript 检查
pnpm run format                       # Prettier 格式化
pnpm run check                        # lint + typecheck + format 全量检查
pnpm run build                        # 生产构建
pnpm start                            # 生产预览
```

## 部署到 Vercel

本主题是 **Headless 前端**，部署时需要配置远程 ReactPress API：

1. 将本仓库导入 [Vercel](https://vercel.com)
2. Framework Preset 选择 **Next.js**（`vercel.json` 已配置 pnpm）
3. 在 Vercel 项目 Settings → Environment Variables 中添加：

| 变量                             | 示例值                         |
| :------------------------------- | :----------------------------- |
| `REACTPRESS_API_URL`             | `https://api.yoursite.com/api` |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | `https://api.yoursite.com/api` |
| `CLIENT_SITE_URL`                | `https://www.yoursite.com`     |

4. 部署完成后，在 ReactPress 后台将活跃主题指向本主题（若使用 monorepo 管理）或确保 API CORS / 域名配置正确。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

## 在 ReactPress Monorepo 中使用

若本主题位于 ReactPress 仓库的 `themes/` 目录下，可将 `package.json` 中 toolkit 依赖改为 `workspace:*`，在仓库根目录执行 `pnpm dev` 即可联动 API 与主题。

## 相关文档

- [ReactPress 官网](https://reactpress.dev)
- [ReactPress GitHub](https://github.com/fecommunity/reactpress)
- [Theme Manifest Schema](./theme.manifest.schema.json)

## 许可

MIT © ReactPress
