<div align="center">

<a href="https://reactpress.surge.sh/">
  <img src="./public/logo.png" alt="ReactPress" width="480" />
</a>

<br />

**ReactPress Theme Starter**

一个轻量、简单、易用的 Next.js 主题，powered by <a href="https://github.com/fecommunity/reactpress">ReactPress</a>。

<a href="https://reactpress-theme-starter.vercel.app">
  <img src="./public/home-dark.png" alt="ReactPress Theme Starter 界面预览" width="100%" />
</a>

<br />

[在线演示](https://reactpress-theme-starter.vercel.app) · [官方文档](https://reactpress.surge.sh/) · [English](./README.md)

<br />

<img src="https://img.shields.io/badge/Next.js_15-000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 15" />
<img src="https://img.shields.io/badge/React_19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 19" />
<img src="https://img.shields.io/badge/Tailwind_4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
<img src="https://img.shields.io/badge/TypeScript-0074c1?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License" />

</div>

---

## 这是什么？

本仓库是 ReactPress 的**访客站前端**，负责路由、布局、SEO 与 UI 展示。不包含 CMS 或管理后台 — 所有内容通过 [`@fecommunity/reactpress-toolkit`](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) 从 ReactPress API 获取。

```text
ReactPress API  ──REST──▶  Theme Starter (Next.js)  ──▶  访客站
```

**技术栈：** Next.js 15 · React 19 · Tailwind CSS 4 · Node.js 20+ · pnpm 9

**内置能力：** 文章、归档、搜索、CMS 页面、知识库、评论、深浅色模式、RSS/站点地图，以及可选的 Mock API（离线开发）。

### 性能表现

基于 Next.js 15 App Router，采用服务端渲染、静态生成与精简客户端 JavaScript — 开箱即用即可获得出色的 Core Web Vitals 表现，无需额外调优。

<div align="center">

<img src="./public/lighthouse.png" alt="Lighthouse 审计：性能 95、无障碍 100、最佳实践 100、SEO 100" width="720" />

</div>

| 类别       | 得分   |
| :--------- | :----- |
| 性能       | **95** |
| 无障碍     | **100** |
| 最佳实践   | **100** |
| SEO        | **100** |

**Core Web Vitals**（[在线演示](https://reactpress-theme-starter.vercel.app) 首页审计结果）：

| 指标                           | 结果      |
| :----------------------------- | :-------- |
| First Contentful Paint (FCP)   | **0.4 s** |
| Largest Contentful Paint (LCP) | **1.0 s** |
| Total Blocking Time (TBT)      | **150 ms** |
| Cumulative Layout Shift (CLS)  | **0**     |
| Speed Index                    | **1.1 s** |

**为什么快：**

- **SSR + SSG** — 页面服务端渲染，静态路由在部署时预构建
- **零布局偏移** — 首屏即稳定排版，阅读体验流畅
- **轻量客户端** — 内容优先的 UI，无重型运行时负担
- **SEO 就绪** — 内置 metadata、Open Graph、RSS 与站点地图

---

## 快速开始

**环境要求：** Node.js 20+、pnpm 9+

### 推荐 — ReactPress CLI

最快的方式是用 [ReactPress CLI](https://reactpress.surge.sh/) 一键启动完整环境（访客站、管理后台、API），标准场景下无需手动配置 `.env`。

```bash
npm i -g @fecommunity/reactpress@3
reactpress init
reactpress dev
```

<div align="center">

<img src="./public/cli.png" alt="ReactPress CLI 交互式菜单" width="100%" />

</div>

启动后按终端输出的地址访问（通常为访客站、管理后台与 API）。若启动异常，可运行 `reactpress doctor` 检查环境。

**配合本主题使用**

1. 克隆本仓库并安装依赖（`pnpm install`）。
2. 运行 `reactpress dev --api-only` 仅启动 API（或启动完整栈后让主题指向 API）。
3. 如有需要，将 [`.env.example`](./.env.example) 复制为 `.env` — 本地默认 API 为 `http://localhost:3002/api`。
4. 在主题目录运行：

```bash
pnpm dev
```

浏览器打开 **http://localhost:3001**，主题将从 ReactPress API 加载真实内容。

开发时连接远程 API：

```bash
pnpm dev -- --remote-origin api.yoursite.com
```

### 本地主题预览（Mock — 无需后台）

若只需调整 UI、布局或样式，**无需**安装 ReactPress 或启动 API，可使用内置 Mock 服务：

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
pnpm dev:mock
```

浏览器打开 **http://localhost:3001**，示例数据来自 [`lib/mock-api/data.ts`](./lib/mock-api/data.ts)。与 [Vercel 在线演示](https://reactpress-theme-starter.vercel.app) 使用相同模式。

---

## 常用命令

| 命令                 | 说明                                        |
| :------------------- | :------------------------------------------ |
| `pnpm dev`           | 主题开发服务器 + 真实 API（CLI 或远程）     |
| `pnpm dev:mock`      | 主题开发服务器 + 内置 Mock API（无需后台）  |
| `pnpm build:mock`    | Mock 数据生产构建（Vercel 演示 / 离线构建） |
| `pnpm build`         | 生产构建（构建时需能访问 API）              |
| `pnpm start`         | 启动生产服务，端口 **3001**                 |
| `pnpm run check`     | ESLint + Prettier                           |
| `pnpm run typecheck` | TypeScript 类型检查                         |

全栈本地开发（访客站 + 管理后台 + API）请优先使用 ReactPress CLI 的 **`reactpress dev`** — 见 [快速开始](#快速开始)。

---

## 环境变量

使用 **`pnpm dev`** 对接真实 API 时，将 [`.env.example`](./.env.example) 复制为 `.env`。Mock 模式（`pnpm dev:mock`）与 ReactPress CLI 会自动处理大部分配置。

| 变量                             | 说明                                   |
| :------------------------------- | :------------------------------------- |
| `REACTPRESS_API_URL`             | 服务端 API 地址（须含 `/api`）         |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | 浏览器端 API 地址；同域部署常用 `/api` |
| `CLIENT_SITE_URL`                | 站点公开 URL（SEO、Open Graph）        |
| `REACTPRESS_MOCK_API`            | 设为 `1` 启用内置 Mock API             |

更多可选项（子路径部署、GitHub OAuth、远程联调）见 `.env.example`。

---

## 部署

### 演示环境（Vercel）

直接 Import 本仓库即可 — [`vercel.json`](./vercel.json) 已配置 `build:mock` 与 Mock 环境变量。

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

</div>

> [在线演示](https://reactpress-theme-starter.vercel.app) 运行于 Mock 模式，仅展示主题界面与示例数据。

### 生产环境

作为 Headless 前端部署，指向你的 ReactPress API：

1. 配置 `REACTPRESS_API_URL`、`NEXT_PUBLIC_REACTPRESS_API_URL`、`CLIENT_SITE_URL`
2. 构建命令使用 `pnpm build`（不要用 `build:mock`）
3. 以 `pnpm start` 或平台 Next.js 运行时启动

`pnpm build` 会在构建阶段预取页面数据，请确保构建时 API 可访问。

---

## 目录结构

```text
app/           App Router 页面、订阅源、站点地图、Mock API
components/    布局、文章、搜索、小部件
lib/           mock-api/、reactpress/ 工具
scripts/       开发、构建与冒烟测试脚本
theme.json     主题清单（路由、外观 Schema）
```

路由模板见 [`theme.json`](./theme.json)。外观配置（配色、Logo、导航）在 ReactPress 管理后台完成。

---

## 参与贡献

|                                             |                          |
| :------------------------------------------ | :----------------------- |
| [贡献指南（中文）](./CONTRIBUTING_zh.md)    | 开发环境、约定与 PR 规范 |
| [Contributing (English)](./CONTRIBUTING.md) | English guide            |
| [行为准则](./CODE_OF_CONDUCT.md)            | 社区行为标准             |
| [安全策略](./SECURITY.md)                   | 漏洞报告                 |

---

## 相关链接

|                 |                                                                                                  |
| :-------------- | :----------------------------------------------------------------------------------------------- |
| ReactPress 文档 | [reactpress.surge.sh](https://reactpress.surge.sh/)                                              |
| ReactPress 源码 | [github.com/fecommunity/reactpress](https://github.com/fecommunity/reactpress)                   |
| Toolkit         | [@fecommunity/reactpress-toolkit](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) |
| 主题 Schema     | [theme.manifest.schema.json](./theme.manifest.schema.json)                                       |

<br />

<div align="center">

[MIT 许可证](./LICENSE) · © ReactPress / FECommunity

</div>
