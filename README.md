<div align="center">

<a href="https://reactpress.surge.sh/">
  <img src="./public/logo.png" alt="ReactPress" width="480" />
</a>

<br />

**ReactPress Theme Starter**

Official headless visitor theme for [ReactPress](https://github.com/fecommunity/reactpress) — a Next.js frontend that renders content from the ReactPress REST API.

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

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
pnpm dev:mock
```

Open **http://localhost:3001** — no backend needed. Mock mode serves sample data from [`lib/mock-api/data.ts`](./lib/mock-api/data.ts).

### Connect to a live API

```bash
cp .env.example .env   # edit API URLs
pnpm dev               # default: http://localhost:3002/api
```

Remote API during development:

```bash
pnpm dev -- --remote-origin api.yoursite.com
```

---

## Commands

| Command              | Purpose                                  |
| :------------------- | :--------------------------------------- |
| `pnpm dev:mock`      | Dev server + mock API                    |
| `pnpm dev`           | Dev server + live ReactPress API         |
| `pnpm build:mock`    | Production build with mock data          |
| `pnpm build`         | Production build (API must be reachable) |
| `pnpm start`         | Run production server on port **3001**   |
| `pnpm run check`     | ESLint + Prettier                        |
| `pnpm run typecheck` | TypeScript check                         |

---

## Configuration

Copy [`.env.example`](./.env.example) to `.env` for live API mode.

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

CI runs lint, typecheck, and a mock-API production build on every push — see [`.github/workflows/ci.yml`](./.github/workflows/ci.yml).

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
