# ReactPress Theme Starter

![ReactPress Theme Starter](/public/logo-400.png)

Official **[ReactPress](https://github.com/fecommunity/reactpress)** visitor theme — Tailwind CSS 4 + Next.js 15 App Router, powered by [`@fecommunity/reactpress-toolkit`](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit) for articles, categories, tags, comments, knowledge base, and more.

> This repo is a **theme**, not a full CMS. You need a running ReactPress API, or use built-in **mock mode** for offline preview.

[![TypeScript](https://img.shields.io/badge/%3C%2F%3E-TypeScript-%230074c1.svg)](http://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![pnpm](https://img.shields.io/badge/pnpm-9-F69220)](https://pnpm.io/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

**Languages:** English · [简体中文](./README_zh.md)

## Features

- **App Router + RSC** — Home, articles, categories, tags, archives, and search with ISR (`revalidate = 60`)
- **ReactPress data layer** — `fetch*PageProps` / `themeApi`; no local MDX content
- **Mock mode** — `pnpm dev:mock` for offline development and CI builds; the Vercel demo uses the same mock API
- **Light / dark mode** — System preference or manual toggle; primary colors via `theme.json` appearance panel
- **Full site toolkit** — Comments, knowledge base, aggregated search, custom pages, RSS / sitemap, GitHub login, i18n
- **Remote API dev** — `pnpm dev -- --remote-origin api.example.com` for live CMS integration
- **Vercel-ready** — Headless theme with remote API, or one-click mock demo deploy

## Requirements

| Item | Notes |
| :--- | :--- |
| Node.js | **20+** |
| pnpm | **9+** (this repo uses pnpm only) |
| ReactPress API | Local `reactpress dev`, remote instance, or skip with mock mode |
| toolkit | **3.1.0+** (`@fecommunity/reactpress-toolkit`) |

## Quick start

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install

# Option A: Mock mode (no backend required — recommended first run)
pnpm dev:mock

# Option B: Connect to a local ReactPress API (default http://localhost:3002/api)
pnpm dev
```

Open **http://localhost:3001**. Mock content is based on the [official ReactPress repository](https://github.com/fecommunity/reactpress) and [product site](https://reactpress.surge.sh/), in English by default.

## Remote API

```bash
pnpm dev -- --remote-origin api.yoursite.com

# Or set in .env
# REACTPRESS_DEV_REMOTE_ORIGIN=https://api.yoursite.com
pnpm dev
```

Split admin / client API origins:

```bash
pnpm dev -- --remote-origin api.yoursite.com --admin-origin local --client-origin remote
```

## Environment variables

Copy [`.env.example`](./.env.example) to `.env`:

| Variable | Description |
| :--- | :--- |
| `REACTPRESS_API_URL` | SSR API base URL (include `/api`) |
| `NEXT_PUBLIC_REACTPRESS_API_URL` | Browser requests; often `/api` in production |
| `CLIENT_SITE_URL` | Public site URL for SEO / sitemap / OG |
| `BASE_PATH` | Optional subpath deployment |
| `REACTPRESS_MOCK_API` | Set to `1` to enable built-in mock API |
| `REACTPRESS_DEV_REMOTE_ORIGIN` | Default remote API for dev (same as `--remote-origin`) |

## Scripts

```bash
pnpm dev:mock          # Mock development (offline)
pnpm dev               # Connect to a real API
pnpm build:mock        # Mock production build (Vercel demo / CI)
pnpm build             # Standard build (requires reachable API)
pnpm start             # Production preview on :3001
pnpm run check         # lint + format
pnpm run typecheck     # TypeScript
```

Smoke-test all routes against a running mock server:

```bash
pnpm dev:mock &
node scripts/smoke-pages.mjs http://127.0.0.1:3001
```

## Theme manifest (theme.json)

Route → template mapping lives in [`theme.json`](./theme.json). Schema: [`theme.manifest.schema.json`](./theme.manifest.schema.json).

| Template key | Path |
| :--- | :--- |
| `home` | `app/page.tsx` |
| `single` | `app/article/[id]/page.tsx` |
| `page` | `app/page/[id]/page.tsx` |
| `archive-category` | `app/category/[category]/page.tsx` |
| `archive-tag` | `app/tag/[tag]/page.tsx` |
| `archives` | `app/archives/page.tsx` |
| `search` | `app/search/page.tsx` |
| `404` | `app/not-found.tsx` |

Appearance controls declared under `theme.json` → `appearance` are applied at runtime via `useThemeMod` and CSS variables.

## Project layout

```
reactpress-theme-starter/
├── app/                    # App Router pages & API route handler
├── components/             # Layout, article, comment, search, widgets, views
├── lib/mock-api/           # Mock data & route matching
├── lib/reactpress/         # bootstrap, metadata, appearance, SEO
├── scripts/                # dev, build:mock, smoke-pages, etc.
├── theme.json              # ReactPress theme manifest
└── vercel.json             # Vercel build & env defaults
```

## Deploy to Vercel

This is a **headless frontend**. Point API env vars at your ReactPress instance for production.

**Demo / no backend:** `vercel.json` ships with `build:mock` and `REACTPRESS_MOCK_API=1` — import the repo for an instant theme preview.

**Production site:**

1. [Vercel New Project](https://vercel.com/new) → Import `fecommunity/reactpress-theme-starter`
2. Framework: **Next.js**
3. Set `REACTPRESS_API_URL`, `NEXT_PUBLIC_REACTPRESS_API_URL`, `CLIENT_SITE_URL`
4. Change `buildCommand` to `pnpm run build` and remove mock env vars

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter)

## CI

[`.github/workflows/ci.yml`](./.github/workflows/ci.yml) runs on push / PR: lint, format, typecheck, mock API startup, and `pnpm run build:ci`.

## Use inside the ReactPress monorepo

Place this theme under `themes/` and switch toolkit to `workspace:*`, then run `pnpm dev` from the monorepo root.

## Links

- [ReactPress product site](https://reactpress.surge.sh/)
- [ReactPress on GitHub](https://github.com/fecommunity/reactpress)
- [Toolkit on npm](https://www.npmjs.com/package/@fecommunity/reactpress-toolkit)
- [Theme Manifest Schema](./theme.manifest.schema.json)

## License

[MIT](./LICENSE) © ReactPress / FECommunity
