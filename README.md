<div align="center">

<a href="https://reactpress.surge.sh/">
  <img src="./public/logo.png" alt="ReactPress" width="520" />
</a>

<br />

<p><strong>ReactPress Theme Starter</strong></p>

<p><em>Official headless visitor theme for the ReactPress publishing platform</em></p>

<p><sub>Next.js 15 · App Router · ReactPress REST API · Tailwind CSS 4</sub></p>

<br />

<p>
  <a href="https://reactpress-theme-starter.vercel.app"><strong>Live Demo</strong></a>
  &nbsp;·&nbsp;
  <a href="https://reactpress.surge.sh/"><strong>Documentation</strong></a>
  &nbsp;·&nbsp;
  <a href="./README_zh.md"><strong>简体中文</strong></a>
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

## Table of Contents

<table>
<tr>
<td valign="top" width="50%">

**Getting Started**

[Overview](#overview) · [Quick Start](#quick-start) · [Configuration](#configuration) · [Scripts](#scripts)

**Architecture**

[Technology Stack](#technology-stack) · [Route Coverage](#route-coverage) · [Capabilities](#capabilities) · [Theme Manifest](#theme-manifest)

</td>
<td valign="top" width="50%">

**Operations**

[Mock API](#mock-api) · [Deployment](#deployment) · [Continuous Integration](#continuous-integration)

**Reference**

[Directory Structure](#directory-structure) · [Resources](#resources)

</td>
</tr>
</table>

---

## Overview

**ReactPress Theme Starter** is the official Next.js theme template for ReactPress, as declared in [`theme.json`](./theme.json). It provides a complete public-facing frontend for blogs and content-driven sites, with all dynamic content sourced from a ReactPress backend.

<table>
<tr><th align="left">Aspect</th><th align="left">Description</th></tr>
<tr><td><strong>Purpose</strong></td><td>Headless visitor frontend — routing, layout, presentation, SEO, and theme appearance</td></tr>
<tr><td><strong>Out of scope</strong></td><td>Content management, persistence, or administrative interfaces</td></tr>
<tr><td><strong>Data layer</strong></td><td><a href="https://www.npmjs.com/package/@fecommunity/reactpress-toolkit"><code>@fecommunity/reactpress-toolkit</code></a> over the ReactPress REST API</td></tr>
<tr><td><strong>Static content</strong></td><td>None — no MDX or committed article files</td></tr>
</table>

> **Mock mode** — For local development without a ReactPress instance, run `pnpm dev:mock` or `pnpm build:mock` to serve an embedded sample dataset.

### Architecture

```text
ReactPress (CLI · NestJS API · MySQL · Admin Console)
                         │
                         │  REST  { "success": true, "data": … }
                         ▼
              Theme Starter (this repository)
                         │
                         ▼
              Public Site  ·  Next.js 15 · React 19 · ISR
```

<table>
<tr><th align="left">Layer</th><th align="left">Function</th></tr>
<tr><td><strong>ReactPress API</strong></td><td>Content store and REST endpoints for articles, pages, settings, media, comments, and knowledge base</td></tr>
<tr><td><strong>Toolkit</strong></td><td>Type-safe API client (<code>themeApi</code>), server data loaders (<code>fetch*PageProps</code>), and shared UI primitives</td></tr>
<tr><td><strong>Theme Starter</strong></td><td>App Router implementation, Tailwind-based UI, metadata, feeds, and optional mock API adapter</td></tr>
</table>

---

## Technology Stack

<table>
<tr><th align="left">Dependency</th><th align="left">Version</th></tr>
<tr><td>Next.js</td><td>15.5</td></tr>
<tr><td>React</td><td>19</td></tr>
<tr><td>Tailwind CSS</td><td>4</td></tr>
<tr><td>Node.js</td><td>≥ 20</td></tr>
<tr><td>pnpm</td><td>9 <em>(exclusive package manager)</em></td></tr>
<tr><td><code>@fecommunity/reactpress-toolkit</code></td><td>^3.1.0</td></tr>
</table>

**Prerequisites:** Node.js 20+, pnpm 9+, and a ReactPress API instance — or mock mode for offline use.

---

## Route Coverage

<details open>
<summary><strong>Templates declared in <code>theme.json</code></strong></summary>
<br />

| Template Key | Route Pattern |
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
<summary><strong>Additional routes in this starter</strong></summary>
<br />

| Route Pattern | Function |
| :-- | :-- |
| `/knowledge/`, `/knowledge/[pId]/`, `/knowledge/[pId]/[id]/` | Knowledge base |
| `/tags/` | Tag index |
| `/login/`, `/register/` | Authentication UI |
| `/suggestions/` | Feedback page |
| `/nav/[id]/` | URL directory |
| `/rss/`, `/sitemap.xml`, `/robots.txt` | Syndication and SEO |

</details>

<br />

Pages apply **Incremental Static Regeneration** with `revalidate = 60` (sitemap: `3600`). Server Components retrieve data via the toolkit at render or revalidation time.

---

## Capabilities

<table>
<tr><th align="left" width="28%">Category</th><th align="left">Details</th></tr>
<tr>
  <td><strong>Content &amp; rendering</strong></td>
  <td>
    Server Components on the App Router · home carousel · article listings · category and tag archives · site search · CMS pages · knowledge base · comments (API-dependent) · i18n from ReactPress settings
  </td>
</tr>
<tr>
  <td><strong>Theme customization</strong></td>
  <td>
    Light / dark color schemes · primary and background colors via <code>theme.json</code> → <code>appearance</code> · CSS custom properties and <code>useThemeMod</code> · overridable title, tagline, and logo
  </td>
</tr>
<tr>
  <td><strong>Development tooling</strong></td>
  <td>
    Mock API at <code>app/api/[[...path]]/route.ts</code> · remote API via <code>--remote-origin</code> · route verification with <code>scripts/smoke-pages.mjs</code>
  </td>
</tr>
<tr>
  <td><strong>Optional integrations</strong></td>
  <td>
    <strong>GitHub OAuth</strong> — <code>NEXT_PUBLIC_GITHUB_CLIENT_ID</code> + ReactPress OAuth config (<a href="./lib/auth/githubOAuth.ts"><code>lib/auth/githubOAuth.ts</code></a>)<br />
    <strong>Production build</strong> — reachable API during <code>pnpm build</code> (pages prefetched at build time)
  </td>
</tr>
</table>

---

## Quick Start

### 1 · Install

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
```

Copy [`.env.example`](./.env.example) to `.env` when connecting to a live API. Mock mode requires no additional configuration.

### 2 · Run

<table>
<tr><th align="left">Mode</th><th align="left">Command</th><th align="left">Description</th></tr>
<tr>
  <td><strong>Mock</strong></td>
  <td><code>pnpm dev:mock</code></td>
  <td>No external backend; English sample content</td>
</tr>
<tr>
  <td><strong>Live API</strong></td>
  <td><code>pnpm dev</code></td>
  <td>Connects to <code>http://localhost:3002/api</code> by default</td>
</tr>
</table>

Open **http://localhost:3001** ([`scripts/dev.mjs`](./scripts/dev.mjs)). Mock media uses brand assets in [`public/`](./public/) only.

### 3 · Remote API <em>(optional)</em>

```bash
pnpm dev -- --remote-origin api.yoursite.com
# Equivalent: REACTPRESS_DEV_REMOTE_ORIGIN=https://api.yoursite.com

pnpm dev -- --remote-origin api.yoursite.com --admin-origin local --client-origin remote
```

---

## Configuration

| Variable | Description |
| :-- | :-- |
| `REACTPRESS_API_URL` | Server-side API base URL (must include `/api`) |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | Client-side API URL; typically `/api` for same-origin deployment |
| `CLIENT_SITE_URL` | Canonical public URL for metadata, sitemap, and Open Graph |
| `BASE_PATH` | Optional application subpath (e.g. `/blog`) |
| `REACTPRESS_MOCK_API` | Set to `1` to activate the embedded mock API handler |
| `REACTPRESS_DEV_REMOTE_ORIGIN` | Default remote API origin for `pnpm dev` |
| `NEXT_PUBLIC_GITHUB_CLIENT_ID` | GitHub OAuth client ID *(optional)* |

---

## Scripts

| Command | Description |
| :-- | :-- |
| `pnpm dev:mock` | Development server with mock API |
| `pnpm dev` | Development server against a live ReactPress API |
| `pnpm build:mock` | Production build with mock data *(Vercel demo default)* |
| `pnpm build` | Production build against a reachable API at build time |
| `pnpm start` | Serve production output on port **3001** |
| `pnpm start:mock` | Production server with mock API *(requires prior `build:mock`)* |
| `pnpm run check` | ESLint and Prettier checks |
| `pnpm run typecheck` | TypeScript compiler in no-emit mode |

<details>
<summary><strong>Smoke test</strong></summary>
<br />

Requires a running mock development server:

```bash
pnpm dev:mock &
node scripts/smoke-pages.mjs http://127.0.0.1:3001
```

</details>

---

## Mock API

Mock mode activates when `REACTPRESS_MOCK_API=1`. Requests are handled by the catch-all route at `app/api/[[...path]]/route.ts`, returning JSON from [`lib/mock-api/data.ts`](./lib/mock-api/data.ts).

| Use Case | Configuration |
| :-- | :-- |
| Local development | `pnpm dev:mock` |
| Vercel demonstration | [`vercel.json`](./vercel.json) → `build:mock` + `REACTPRESS_MOCK_API=1` |
| Continuous integration | Mock dev server on port **3010**, then `pnpm run build:ci` |

> The [live demonstration](https://reactpress-theme-starter.vercel.app) runs in mock mode — theme UI and sample data only, not a production CMS.

---

## Deployment

Production deployment treats this repository as a **headless frontend**. Point environment variables at your ReactPress API and run `pnpm build` (not `build:mock`).

### Demonstration · Vercel

Import the repository as-is. [`vercel.json`](./vercel.json) configures `pnpm run build:mock` with mock environment variables.

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

</div>

### Production

| Step | Action |
| :--: | :-- |
| 1 | Import or clone the repository on your hosting platform |
| 2 | Set `REACTPRESS_API_URL`, `NEXT_PUBLIC_REACTPRESS_API_URL`, and `CLIENT_SITE_URL` |
| 3 | Change build command to `pnpm run build` and remove `REACTPRESS_MOCK_API` |
| 4 | Start with `pnpm start` (port **3001**) or the platform Next.js runtime |

**Example environment variables**

| Variable | Example Value |
| :-- | :-- |
| `REACTPRESS_API_URL` | `https://api.yoursite.com/api` |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | `/api` |
| `CLIENT_SITE_URL` | `https://www.yoursite.com` |

> **Note:** `pnpm build` prefetches pages from the API during the build phase. The ReactPress API must be accessible at build time.

---

## Theme Manifest

[`theme.json`](./theme.json) defines the theme identifier (`my-blog`), template-to-route mapping, and appearance configuration schema.

Validation schema: [`theme.manifest.schema.json`](./theme.manifest.schema.json)

Appearance settings (color palette, logo, navigation behavior) are managed in the ReactPress admin console and applied at runtime through the toolkit theme modification system.

---

## Directory Structure

```text
reactpress-theme-starter/
├── app/                    # App Router pages, feeds, sitemap, mock API route
├── components/             # Layout, article, comment, search, widgets, views
├── lib/
│   ├── mock-api/           # Mock data definitions and route matching
│   └── reactpress/         # Bootstrap, metadata, appearance, SEO utilities
├── scripts/                # Development, build, and verification scripts
├── public/                 # Static brand assets
├── theme.json              # ReactPress theme manifest
└── vercel.json             # Vercel deployment defaults (mock demonstration)
```

---

## Continuous Integration

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs on push and pull request to `main` or `master`:

| Step | Task |
| :--: | :-- |
| 1 | ESLint and Prettier validation |
| 2 | TypeScript type checking *(non-blocking at time of writing)* |
| 3 | Mock API startup on port **3010** |
| 4 | Production build via `pnpm run build:ci` |

### Monorepo Integration

Place this theme under `themes/` in the ReactPress monorepo, set the toolkit dependency to `workspace:*`, and run `pnpm dev` from the monorepo root.

---

## Resources

| Resource | Link |
| :-- | :-- |
| Live demonstration *(mock)* | [reactpress-theme-starter.vercel.app](https://reactpress-theme-starter.vercel.app) |
| ReactPress documentation | [reactpress.surge.sh](https://reactpress.surge.sh/) |
| ReactPress source | [github.com/fecommunity/reactpress](https://github.com/fecommunity/reactpress) |
| Toolkit package | [@fecommunity/reactpress-toolkit](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) |
| Theme manifest schema | [theme.manifest.schema.json](./theme.manifest.schema.json) |

<br />

---

<div align="center">

**[MIT License](./LICENSE)** · © ReactPress / FECommunity

</div>
