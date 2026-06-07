<div align="center">

<a href="https://reactpress.surge.sh/">
  <img src="./public/logo.png" alt="ReactPress" width="480" />
</a>

<br />

**ReactPress Theme Starter**

A lightweight, simple, and easy-to-use Next.js theme, powered by [ReactPress](https://github.com/fecommunity/reactpress).

<a href="https://reactpress-theme-starter.vercel.app">
  <img src="./public/home-dark.png" alt="ReactPress Theme Starter preview" width="100%" />
</a>

<br />

[Live Demo](https://reactpress-theme-starter.vercel.app) · [Documentation](https://reactpress.surge.sh/) · [简体中文](./README_zh.md)

<br />

<img src="https://img.shields.io/badge/Next.js_15-000?style=flat-square&logo=next.js&logoColor=white" alt="Next.js 15" />
<img src="https://img.shields.io/badge/React_19-61dafb?style=flat-square&logo=react&logoColor=white" alt="React 19" />
<img src="https://img.shields.io/badge/Tailwind_4-38bdf8?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS 4" />
<img src="https://img.shields.io/badge/TypeScript-0074c1?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/License-MIT-22c55e?style=flat-square" alt="MIT License" />

</div>

---

## What is this?

This repository is the **public-facing theme** for ReactPress: routing, layout, SEO, and UI. It does **not** include a CMS or admin panel — all content comes from a ReactPress backend via [`@fecommunity/reactpress-toolkit`](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit).

```text
ReactPress API  ──REST──▶  Theme Starter (Next.js)  ──▶  Public Site
```

**Stack:** Next.js 15 · React 19 · Tailwind CSS 4 · Node.js 20+ · pnpm 9

**Includes:** articles, archives, search, CMS pages, knowledge base, comments, light/dark mode, RSS/sitemap, and an optional embedded mock API for offline development.

---

## Quick Start

**Requirements:** Node.js 20+, pnpm 9+

### Recommended — ReactPress CLI

The fastest way to run a full stack (visitor site, admin console, and API) is the [ReactPress CLI](https://reactpress.surge.sh/). No manual `.env` wiring for a standard setup.

```bash
npm i -g @fecommunity/reactpress@3
reactpress init
reactpress dev
```

<div align="center">

<img src="./public/cli.png" alt="ReactPress CLI interactive menu" width="100%" />

</div>

After startup, open the URLs printed in the terminal (typically the public site, admin, and API). Use `reactpress doctor` if something fails to start.

**Use this theme with the CLI**

1. Clone this repository and install dependencies (`pnpm install`).
2. Start the API with `reactpress dev --api-only` (or run the full stack and point the theme at the API).
3. Copy [`.env.example`](./.env.example) to `.env` if needed — default local API is `http://localhost:3002/api`.
4. In the theme directory, run:

```bash
pnpm dev
```

Open **http://localhost:3001** — the theme loads live content from your ReactPress API.

Remote API during development:

```bash
pnpm dev -- --remote-origin api.yoursite.com
```

### Local theme preview (mock — no backend)

To work on UI, layout, or styling **without** installing ReactPress or running the API, use the built-in mock server:

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
pnpm dev:mock
```

Open **http://localhost:3001** — sample data comes from [`lib/mock-api/data.ts`](./lib/mock-api/data.ts). This is the same mode used by the [Vercel demo](https://reactpress-theme-starter.vercel.app).

---

## Commands

| Command              | Purpose                                                       |
| :------------------- | :------------------------------------------------------------ |
| `pnpm dev`           | Theme dev server + live ReactPress API (CLI or remote)          |
| `pnpm dev:mock`      | Theme dev server + built-in mock API (no backend)             |
| `pnpm build:mock`    | Production build with mock data (Vercel demo / offline build) |
| `pnpm build`         | Production build (API must be reachable at build time)        |
| `pnpm start`         | Run production server on port **3001**                        |
| `pnpm run check`     | ESLint + Prettier                                             |
| `pnpm run typecheck` | TypeScript check                                              |

For full-stack local development (site + admin + API), prefer **`reactpress dev`** from the ReactPress CLI — see [Quick Start](#quick-start).

---

## Configuration

When using **`pnpm dev`** against a live API, copy [`.env.example`](./.env.example) to `.env`. Mock mode (`pnpm dev:mock`) and the ReactPress CLI handle most setup for you.

| Variable                         | Description                                     |
| :------------------------------- | :---------------------------------------------- |
| `REACTPRESS_API_URL`             | Server-side API base URL (include `/api`)       |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | Client-side API URL; use `/api` for same-origin |
| `CLIENT_SITE_URL`                | Public site URL for SEO and Open Graph          |
| `REACTPRESS_MOCK_API`            | Set to `1` to enable the embedded mock API      |

See `.env.example` for optional variables (subpath deploy, GitHub OAuth, remote dev origin).

---

## Deployment

### Demo (Vercel)

Import this repo as-is — [`vercel.json`](./vercel.json) uses `build:mock` with mock data.

<div align="center">

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

</div>

> The [live demo](https://reactpress-theme-starter.vercel.app) runs in mock mode (UI + sample data only).

### Production

Deploy as a headless frontend pointed at your ReactPress API:

1. Set `REACTPRESS_API_URL`, `NEXT_PUBLIC_REACTPRESS_API_URL`, and `CLIENT_SITE_URL`
2. Build with `pnpm build` (not `build:mock`)
3. Start with `pnpm start` or your platform's Next.js runtime

`pnpm build` prefetches pages from the API — ensure the API is reachable at build time.

---

## Project Layout

```text
app/           App Router pages, feeds, sitemap, mock API route
components/    Layout, article, search, widgets
lib/           mock-api/, reactpress/ utilities
scripts/       dev, build, and smoke-test scripts
theme.json     Theme manifest (routes, appearance schema)
```

Route templates are declared in [`theme.json`](./theme.json). Appearance (colors, logo, navigation) is configured in the ReactPress admin console.

---

## Contributing

|                                             |                                   |
| :------------------------------------------ | :-------------------------------- |
| [Contributing](./CONTRIBUTING.md)           | Setup, conventions, pull requests |
| [Contributing (中文)](./CONTRIBUTING_zh.md) | 中文贡献指南                      |
| [Code of Conduct](./CODE_OF_CONDUCT.md)     | Community standards               |
| [Security](./SECURITY.md)                   | Report vulnerabilities            |

---

## Links

|                   |                                                                                                  |
| :---------------- | :----------------------------------------------------------------------------------------------- |
| ReactPress docs   | [reactpress.surge.sh](https://reactpress.surge.sh/)                                              |
| ReactPress source | [github.com/fecommunity/reactpress](https://github.com/fecommunity/reactpress)                   |
| Toolkit           | [@fecommunity/reactpress-toolkit](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) |
| Theme schema      | [theme.manifest.schema.json](./theme.manifest.schema.json)                                       |

<br />

<div align="center">

[MIT License](./LICENSE) · © ReactPress / FECommunity

</div>
