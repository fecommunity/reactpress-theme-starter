<div align="center">

<a href="https://reactpress.surge.sh/">
  <img src="./public/logo.png" alt="ReactPress" width="520" />
</a>

<br />

<p><strong>ReactPress Theme Starter</strong></p>

<p><em><a href="https://github.com/fecommunity/reactpress">ReactPress</a> 发布平台官方 Headless 访客站主题</em></p>

<p><sub>Next.js 15 · App Router · ReactPress REST API · Tailwind CSS 4</sub></p>

<br />

<p>
  <a href="https://reactpress-theme-starter.vercel.app"><strong>在线演示</strong></a>
  &nbsp;·&nbsp;
  <a href="https://reactpress.surge.sh/"><strong>官方文档</strong></a>
  &nbsp;·&nbsp;
  <a href="./README.md"><strong>English</strong></a>
</p>

<br />

<p>
  <a href="http://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-0074c1?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" /></a>
  &nbsp;
  <a href="https://nextjs.org/"><img src="https://img.shields.io/badge/Next.js_15-000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 15" /></a>
  &nbsp;
  <a href="https://reactjs.org/"><img src="https://img.shields.io/badge/React_19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 19" /></a>
  &nbsp;
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" /></a>
  &nbsp;
  <a href="https://pnpm.io/"><img src="https://img.shields.io/badge/pnpm_9-F69220?style=flat-square&logo=pnpm&logoColor=white" alt="pnpm 9" /></a>
  &nbsp;
  <a href="./LICENSE"><img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License" /></a>
</p>

</div>

<br />

## 目录

<table>
<tr>
<td valign="top" width="50%">

**快速上手**

[概览](#概览) · [快速开始](#快速开始) · [环境变量](#环境变量) · [脚本命令](#脚本命令)

**架构说明**

[技术栈](#技术栈) · [路由覆盖](#路由覆盖) · [功能特性](#功能特性) · [主题清单](#主题清单)

</td>
<td valign="top" width="50%">

**运维部署**

[Mock API](#mock-api) · [部署](#部署) · [持续集成](#持续集成)

**参考**

[目录结构](#目录结构) · [相关资源](#相关资源)

</td>
</tr>
</table>

---

## 概览

**ReactPress Theme Starter** 是 ReactPress 官方 Next.js 主题模板（见 [`theme.json`](./theme.json)）。适用于博客与内容型站点的公开前端，所有动态内容均来自 ReactPress 后台。

<table>
<tr><th align="left">维度</th><th align="left">说明</th></tr>
<tr><td><strong>定位</strong></td><td>Headless 访客站前端 — 路由、布局、展示、SEO 与主题外观</td></tr>
<tr><td><strong>不包含</strong></td><td>内容管理、数据持久化或后台管理界面</td></tr>
<tr><td><strong>数据层</strong></td><td>通过 <a href="https://www.npmjs.com/package/@fecommunity/reactpress-toolkit"><code>@fecommunity/reactpress-toolkit</code></a> 对接 ReactPress REST API</td></tr>
<tr><td><strong>本地内容</strong></td><td>无 — 不含 MDX 或内置文章文件</td></tr>
</table>

> **Mock 模式** — 本地无 ReactPress 实例时，运行 `pnpm dev:mock` 或 `pnpm build:mock` 即可使用内置示例数据。

### 架构

```text
ReactPress（CLI · NestJS API · MySQL · 管理后台）
                         │
                         │  REST  { "success": true, "data": … }
                         ▼
              Theme Starter（本仓库）
                         │
                         ▼
              访客站  ·  Next.js 15 · React 19 · ISR
```

<table>
<tr><th align="left">层级</th><th align="left">职责</th></tr>
<tr><td><strong>ReactPress API</strong></td><td>内容存储与 REST 接口 — 文章、页面、设置、媒体、评论、知识库</td></tr>
<tr><td><strong>Toolkit</strong></td><td>类型安全的 API 客户端（<code>themeApi</code>）、服务端数据加载（<code>fetch*PageProps</code>）及共享 UI 组件</td></tr>
<tr><td><strong>Theme Starter</strong></td><td>App Router 实现、Tailwind UI、元数据、订阅源，以及可选 Mock API 适配层</td></tr>
</table>

---

## 技术栈

<table>
<tr><th align="left">依赖</th><th align="left">版本</th></tr>
<tr><td>Next.js</td><td>15.5</td></tr>
<tr><td>React</td><td>19</td></tr>
<tr><td>Tailwind CSS</td><td>4</td></tr>
<tr><td>Node.js</td><td>≥ 20</td></tr>
<tr><td>pnpm</td><td>9 <em>（本仓库唯一包管理器）</em></td></tr>
<tr><td><code>@fecommunity/reactpress-toolkit</code></td><td>^3.1.0</td></tr>
</table>

**前置要求：** Node.js 20+、pnpm 9+，以及 ReactPress API 实例 — 或使用 Mock 模式离线开发。

---

## 路由覆盖

<details open>
<summary><strong><code>theme.json</code> 中声明的模板</strong></summary>
<br />

| 模板键 | 路由 |
| :-- | :-- |
| `home` | `/` |
| `single` | `/article/[id]/` |
| `page` | `/page/[id]/` |
| `archive-category` | `/category/[category]/` |
| `archive-tag` | `/tag/[tag]/` |
| `archives` | `/archives/` |
| `search` | `/search/` |
| `404` | `app/not-found.tsx` |

</details>

<details>
<summary><strong>本 Starter 额外提供的路由</strong></summary>
<br />

| 路由 | 用途 |
| :-- | :-- |
| `/knowledge/`, `/knowledge/[pId]/`, `/knowledge/[pId]/[id]/` | 知识库 |
| `/tags/` | 标签索引 |
| `/login/`, `/register/` | 用户认证 |
| `/suggestions/` | 建议反馈 |
| `/nav/[id]/` | 网址导航 |
| `/rss/`, `/sitemap.xml`, `/robots.txt` | 订阅与 SEO |

</details>

<br />

页面采用 **增量静态再生（ISR）**，`revalidate = 60`（站点地图为 `3600`）。Server Components 在渲染或再验证时通过 Toolkit 拉取数据。

---

## 功能特性

<table>
<tr><th align="left" width="28%">类别</th><th align="left">说明</th></tr>
<tr>
  <td><strong>内容与渲染</strong></td>
  <td>
    App Router + Server Components · 首页轮播 · 文章列表 · 分类 / 标签归档 · 站内搜索 · CMS 页面 · 知识库 · 评论（依赖 API 配置） · 多语言（来自 ReactPress 设置）
  </td>
</tr>
<tr>
  <td><strong>主题定制</strong></td>
  <td>
    浅色 / 深色模式 · 通过 <code>theme.json</code> → <code>appearance</code> 配置主色与背景色 · CSS 变量与 <code>useThemeMod</code> · 可覆盖站点标题、副标题与 Logo
  </td>
</tr>
<tr>
  <td><strong>开发工具</strong></td>
  <td>
    Mock API（<code>app/api/[[...path]]/route.ts</code>）· 远程 API（<code>--remote-origin</code>）· 路由冒烟测试（<code>scripts/smoke-pages.mjs</code>）
  </td>
</tr>
<tr>
  <td><strong>可选集成</strong></td>
  <td>
    <strong>GitHub 登录</strong> — 配置 <code>NEXT_PUBLIC_GITHUB_CLIENT_ID</code> 及 ReactPress OAuth（<a href="./lib/auth/githubOAuth.ts"><code>lib/auth/githubOAuth.ts</code></a>）<br />
    <strong>生产构建</strong> — 执行 <code>pnpm build</code> 时需能访问 API（构建阶段会预取页面）
  </td>
</tr>
</table>

---

## 快速开始

### 1 · 安装

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
```

对接真实 API 时，将 [`.env.example`](./.env.example) 复制为 `.env`。Mock 模式无需额外配置。

### 2 · 启动

<table>
<tr><th align="left">模式</th><th align="left">命令</th><th align="left">说明</th></tr>
<tr>
  <td><strong>Mock</strong></td>
  <td><code>pnpm dev:mock</code></td>
  <td>无需外部后台；提供英文示例内容</td>
</tr>
<tr>
  <td><strong>Live API</strong></td>
  <td><code>pnpm dev</code></td>
  <td>默认连接 <code>http://localhost:3002/api</code></td>
</tr>
</table>

浏览器访问 **http://localhost:3001**（见 [`scripts/dev.mjs`](./scripts/dev.mjs)）。Mock 模式下的图片仅使用 [`public/`](./public/) 中的品牌资源。

### 3 · 远程 API <em>（可选）</em>

```bash
pnpm dev -- --remote-origin api.yoursite.com
# 等价于 REACTPRESS_DEV_REMOTE_ORIGIN=https://api.yoursite.com

pnpm dev -- --remote-origin api.yoursite.com --admin-origin local --client-origin remote
```

---

## 环境变量

| 变量 | 说明 |
| :-- | :-- |
| `REACTPRESS_API_URL` | 服务端 API 根地址（须含 `/api`） |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | 浏览器端 API 地址；同域部署时常用 `/api` |
| `CLIENT_SITE_URL` | 站点公开 URL（元数据、站点地图、Open Graph） |
| `BASE_PATH` | 可选子路径部署（如 `/blog`） |
| `REACTPRESS_MOCK_API` | 设为 `1` 启用内置 Mock API |
| `REACTPRESS_DEV_REMOTE_ORIGIN` | `pnpm dev` 默认远程 API 地址 |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | GitHub OAuth Client ID *（可选）* |

---

## 脚本命令

| 命令 | 说明 |
| :-- | :-- |
| `pnpm dev:mock` | 开发服务器 + Mock API |
| `pnpm dev` | 开发服务器 + 真实 ReactPress API |
| `pnpm build:mock` | Mock 数据生产构建 *（Vercel 演示默认）* |
| `pnpm build` | 对接可访问 API 的生产构建 |
| `pnpm start` | 启动生产服务，端口 **3001** |
| `pnpm start:mock` | 生产服务 + Mock API *（需先执行 `build:mock`）* |
| `pnpm run check` | ESLint 与 Prettier 检查 |
| `pnpm run typecheck` | TypeScript 类型检查（`tsc --noEmit`） |

<details>
<summary><strong>冒烟测试</strong></summary>
<br />

需先启动 Mock 开发服务器：

```bash
pnpm dev:mock &
node scripts/smoke-pages.mjs http://127.0.0.1:3001
```

</details>

---

## Mock API

当 `REACTPRESS_MOCK_API=1` 时，请求由 `app/api/[[...path]]/route.ts` 捕获并返回 [`lib/mock-api/data.ts`](./lib/mock-api/data.ts) 中的 JSON 数据。

| 场景 | 配置 |
| :-- | :-- |
| 本地开发 | `pnpm dev:mock` |
| Vercel 演示 | [`vercel.json`](./vercel.json) → `build:mock` + `REACTPRESS_MOCK_API=1` |
| 持续集成 | 端口 **3010** 启动 Mock 服务，再执行 `pnpm run build:ci` |

> [在线演示](https://reactpress-theme-starter.vercel.app) 运行于 Mock 模式 — 仅展示主题界面与示例数据，未连接生产 CMS。

---

## 部署

生产环境将本仓库作为 **Headless 前端** 部署，环境变量指向 ReactPress API，执行 `pnpm build`（而非 `build:mock`）。

### 演示部署 · Vercel

直接 Import 本仓库即可。[`vercel.json`](./vercel.json) 已配置 `pnpm run build:mock` 及 Mock 环境变量。

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

</div>

### 生产部署

| 步骤 | 操作 |
| :--: | :-- |
| 1 | 在托管平台 Import 或 Clone 本仓库 |
| 2 | 配置 `REACTPRESS_API_URL`、`NEXT_PUBLIC_REACTPRESS_API_URL`、`CLIENT_SITE_URL` |
| 3 | 构建命令改为 `pnpm run build`，并移除 `REACTPRESS_MOCK_API` |
| 4 | 以 `pnpm start`（端口 **3001**）或平台 Next.js 运行时启动 |

**环境变量示例**

| 变量 | 示例值 |
| :-- | :-- |
| `REACTPRESS_API_URL` | `https://api.yoursite.com/api` |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | `/api` |
| `CLIENT_SITE_URL` | `https://www.yoursite.com` |

> **说明：** `pnpm build` 会在构建阶段预取页面数据，构建时 ReactPress API 必须可访问。

---

## 主题清单

[`theme.json`](./theme.json) 定义主题标识（`my-blog`）、模板与路由映射，以及外观配置 Schema。

校验 Schema：[`theme.manifest.schema.json`](./theme.manifest.schema.json)

外观设置（配色、Logo、导航行为）在 ReactPress 管理后台配置，运行时通过 Toolkit 主题修改系统生效。

---

## 目录结构

```text
reactpress-theme-starter/
├── app/                    # App Router 页面、订阅源、站点地图、Mock API 路由
├── components/             # 布局、文章、评论、搜索、组件、视图
├── lib/
│   ├── mock-api/           # Mock 数据与路由匹配
│   └── reactpress/         # 启动、元数据、外观、SEO 工具
├── scripts/                # 开发、构建与验证脚本
├── public/                 # 静态品牌资源
├── theme.json              # ReactPress 主题清单
└── vercel.json             # Vercel 部署默认配置（Mock 演示）
```

---

## 持续集成

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) 在 push / PR 至 `main` 或 `master` 时执行：

| 步骤 | 任务 |
| :--: | :-- |
| 1 | ESLint 与 Prettier 校验 |
| 2 | TypeScript 类型检查 *（当前为非阻塞）* |
| 3 | 端口 **3010** 启动 Mock API |
| 4 | 执行 `pnpm run build:ci` 生产构建 |

### Monorepo 联调

将本主题置于 ReactPress 仓库 `themes/` 目录，Toolkit 依赖改为 `workspace:*`，在 Monorepo 根目录运行 `pnpm dev` 即可联动 API 与主题开发。

---

## 相关资源

| 资源 | 链接 |
| :-- | :-- |
| 在线演示 *（Mock）* | [reactpress-theme-starter.vercel.app](https://reactpress-theme-starter.vercel.app) |
| ReactPress 文档 | [reactpress.surge.sh](https://reactpress.surge.sh/) |
| ReactPress 源码 | [github.com/fecommunity/reactpress](https://github.com/fecommunity/reactpress) |
| Toolkit 包 | [@fecommunity/reactpress-toolkit](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) |
| 主题清单 Schema | [theme.manifest.schema.json](./theme.manifest.schema.json) |

<br />

---

<div align="center">

**[MIT 许可证](./LICENSE)** · © ReactPress / FECommunity

</div>
