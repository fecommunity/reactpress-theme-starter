# Contributing to ReactPress Theme Starter

Thank you for your interest in contributing. This repository is the official headless visitor theme for [ReactPress](https://github.com/fecommunity/reactpress).

**简体中文：** [CONTRIBUTING_zh.md](./CONTRIBUTING_zh.md)

---

## Ways to Contribute

- Report bugs or suggest features via [GitHub Issues](https://github.com/fecommunity/reactpress-theme-starter/issues)
- Improve documentation (README, comments, mock data)
- Fix bugs or enhance UI/UX in theme components
- Extend mock API coverage for local development

Please open an issue before large changes (new routes, breaking API assumptions, major refactors) so we can align on scope.

---

## Development Setup

### Prerequisites

- Node.js **20+**
- pnpm **9+** (this repo uses pnpm exclusively)

### Quick start (mock mode — no backend required)

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
pnpm dev:mock
```

Open **http://localhost:3001**.

### Live API mode

Copy [`.env.example`](./.env.example) to `.env` and point variables at your ReactPress API, then run `pnpm dev`.

See [README.md](./README.md) for full configuration, scripts, and deployment notes.

---

## Project Conventions

| Area            | Convention                                                                                             |
| :-------------- | :----------------------------------------------------------------------------------------------------- |
| Package manager | `pnpm` only — do not commit `package-lock.json` or `yarn.lock`                                         |
| Framework       | Next.js 15 App Router, React 19, Tailwind CSS 4                                                        |
| Data layer      | `@fecommunity/reactpress-toolkit` — avoid duplicating API client logic in the theme                    |
| Images          | Use [`ThemeImage`](./components/shared/ThemeImage.tsx) (`next/image`) for theme UI images              |
| Mock data       | English sample content in [`lib/mock-api/data.ts`](./lib/mock-api/data.ts)                             |
| Commits         | [Conventional Commits](https://www.conventionalcommits.org/) — e.g. `feat:`, `fix:`, `docs:`, `chore:` |

---

## Quality Checks

Before opening a pull request, run:

```bash
pnpm run check        # ESLint + Prettier
pnpm run typecheck    # TypeScript (tsc --noEmit)
```

### Smoke test (optional)

With mock dev server running:

```bash
pnpm dev:mock &
node scripts/smoke-pages.mjs http://127.0.0.1:3001
```

---

## Pull Request Guidelines

1. **Branch** from `master` (or `main`) with a descriptive name, e.g. `fix/search-hero-a11y`.
2. **Scope** — keep PRs focused; one logical change per PR when possible.
3. **Tests** — manual verification is acceptable for UI changes; describe what you tested in the PR body.
4. **Documentation** — update README / CONTRIBUTING if behavior or setup changes.
5. **No secrets** — never commit `.env`, API keys, tokens, or internal URLs.

---

## Code of Conduct

This project follows the [Contributor Covenant](./CODE_OF_CONDUCT.md). By participating, you agree to uphold it.

---

## Questions

- [GitHub Discussions (Q&A)](https://github.com/fecommunity/reactpress-theme-starter/discussions/categories/q-a)
- [ReactPress documentation](https://reactpress.surge.sh/)
- [ReactPress repository](https://github.com/fecommunity/reactpress)
- [Bug reports & features](https://github.com/fecommunity/reactpress-theme-starter/issues)
