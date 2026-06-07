# Overseas Launch Pack — ReactPress Theme Starter

Copy-paste materials for the international (English-first) launch.
Complete the **Manual checklist** on GitHub before posting.

---

## Manual checklist (GitHub Settings)

Do these in the repo UI before launch day:

- [ ] **About** (top-right on repo home):
  - Description: `Official Next.js 15 theme for ReactPress — headless blog with mock mode, knowledge base, comments, and one-click Vercel deploy.`
  - Website: `https://reactpress-theme-starter.vercel.app`
  - Topics: `nextjs`, `react`, `typescript`, `tailwindcss`, `blog`, `blog-theme`, `headless-cms`, `starter-kit`, `reactpress`, `vercel`
- [ ] **Social preview**: Settings → General → Social preview → upload `public/home-dark.png`
- [ ] **Discussions**: Settings → General → Features → enable Discussions
  - Categories: **Announcements**, **Q&A**, **Showcase**, **Ideas**
- [ ] **Pin** the Announcement discussion after posting
- [ ] **Release**: create tag `v1.0.0` from current `master`
- [ ] **Main repo link**: add theme link in [fecommunity/reactpress](https://github.com/fecommunity/reactpress) README (Official Theme section)
- [ ] **Vercel demo**: confirm https://reactpress-theme-starter.vercel.app loads < 3s

---

## Launch timeline (US/EU friendly)

| Day            | Action                                        | Channel                      |
| :------------- | :-------------------------------------------- | :--------------------------- |
| **D0 Tue–Thu** | Release v1.0.0 + Announcement Discussion      | GitHub                       |
| **D0**         | X thread + pin demo GIF                       | X / Twitter                  |
| **D1**         | Show HN                                       | news.ycombinator.com         |
| **D2**         | Dev.to tutorial                               | dev.to                       |
| **D3**         | Reddit r/nextjs, r/webdev                     | Reddit                       |
| **D5–D7**      | Product Hunt (optional, pair with ReactPress) | producthunt.com              |
| **D7**         | Newsletter pitch                              | React Status, Next.js Weekly |

Best Show HN window: **Tuesday–Thursday, 8–10 AM US Eastern**.

---

## GitHub Release v1.0.0

**Title:** `v1.0.0 — Official ReactPress Theme Starter`

**Body:**

````markdown
## ReactPress Theme Starter v1.0.0

The official public-facing theme for [ReactPress](https://github.com/fecommunity/reactpress) — a headless blog/CMS stack with a Next.js frontend.

### Highlights

- **Next.js 15** · **React 19** · **Tailwind CSS 4** · TypeScript
- **Try without a backend:** `pnpm dev:mock` — full UI with sample data in under a minute
- **Full stack via CLI:** `reactpress init && reactpress dev` — site, admin, and API
- Articles, archives, search, knowledge base, comments, RSS/sitemap, light/dark mode
- One-click [Vercel deploy](https://vercel.com/new/clone?repository-url=https://github.com/fecommunity/reactpress-theme-starter) (mock demo)

### Quick start

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter
pnpm install
pnpm dev:mock
# → http://localhost:3001
```
````

- **Live demo:** https://reactpress-theme-starter.vercel.app
- **Docs:** https://reactpress.surge.sh/
- **Contributing:** [CONTRIBUTING.md](./CONTRIBUTING.md)

If you find this useful, ⭐ the repo — it helps others discover the project.

````

---

## GitHub Discussions — Announcement (pin this)

**Category:** Announcements
**Title:** `🚀 ReactPress Theme Starter is live — official Next.js 15 theme`

**Body:**

```markdown
We're open-sourcing the **official visitor theme** for ReactPress — routing, layout, SEO, and UI on Next.js 15, powered by a headless ReactPress API.

### Why we built this

Most blog starters give you pages and components, but you still need to build or wire a CMS. ReactPress Theme Starter is the **frontend half** of a full stack: content and admin live in ReactPress; this repo is what your readers see.

### Try it in 60 seconds (no backend)

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter && pnpm install && pnpm dev:mock
````

Open http://localhost:3001 — or skip the install and use the [live demo](https://reactpress-theme-starter.vercel.app).

### Full stack

```bash
npm i -g @fecommunity/reactpress@3
reactpress init
reactpress dev
```

Then clone this theme and run `pnpm dev` against the local API.

### What's included

- Articles, archives, tags, search
- CMS pages & knowledge base
- Comments, RSS, sitemap
- Light/dark mode
- Customizable via ReactPress admin + `theme.json`

### Get involved

- ⭐ Star the repo if it helps you
- [Q&A](../../discussions/categories/q-a) — setup help
- [Showcase](../../discussions/categories/showcase) — sites built with this theme
- [Good first issues](https://github.com/fecommunity/reactpress-theme-starter/issues?q=is%3Aissue+is%3Aopen+label%3Agood-first-issue) — docs, mock data, UI polish

Questions welcome — we're watching this thread.

````

---

## Show HN

**Title:** `Show HN: ReactPress Theme Starter – Next.js 15 headless blog theme (runs without backend)`

**URL:** `https://github.com/fecommunity/reactpress-theme-starter`

**First comment (post immediately after submit):**

```markdown
Author here. This is the official public theme for ReactPress (headless CMS + admin + API).

Two ways to try it:

1. **No install** — live demo: https://reactpress-theme-starter.vercel.app
2. **Local mock mode** — full UI with sample data, no CMS required:

```bash
git clone https://github.com/fecommunity/reactpress-theme-starter.git
cd reactpress-theme-starter && pnpm install && pnpm dev:mock
````

Stack: Next.js 15, React 19, Tailwind 4. Includes knowledge base, comments, search, RSS.

For the full stack (CMS + admin + API), there's a CLI: `npm i -g @fecommunity/reactpress@3 && reactpress init`.

Happy to answer questions about architecture, headless setup, or theme customization.

```

**HN tips:**
- Post Tue–Thu, 8–10 AM ET
- Reply to every comment within 1–2 hours on launch day
- Don't ask for stars on HN — let the demo speak

---

## X / Twitter thread

**Tweet 1:**

```

We just open-sourced the official ReactPress theme 🚀

Next.js 15 · React 19 · Tailwind 4
Headless blog with knowledge base, comments, search, RSS

Try it WITHOUT a backend:
pnpm dev:mock → http://localhost:3001

⭐ + demo ↓
https://github.com/fecommunity/reactpress-theme-starter

```

**Tweet 2:**

```

Why mock mode matters:

Most starters need a CMS or markdown pipeline before you see anything.

We ship an embedded mock API — clone, install, dev:mock, and you get the full UI in ~60 seconds.

Same mode as our Vercel demo:
https://reactpress-theme-starter.vercel.app

```

**Tweet 3:**

```

Full stack when you're ready:

npm i -g @fecommunity/reactpress@3
reactpress init
reactpress dev

Site + admin + API. This theme is the visitor-facing Next.js frontend.

Docs: https://reactpress.surge.sh/

````

**Optional:** Attach `public/home-dark.png` or a 30–60s screen recording of `dev:mock`.

---

## Reddit

### r/nextjs

**Title:** `[Showcase] Official ReactPress theme — Next.js 15 App Router, mock mode for zero-backend preview`

**Body:**

```markdown
Hey r/nextjs — we open-sourced the official theme for ReactPress, a headless blog/CMS stack.

**Repo:** https://github.com/fecommunity/reactpress-theme-starter
**Demo:** https://reactpress-theme-starter.vercel.app

Stack: Next.js 15, React 19, Tailwind 4, TypeScript.

The part I think r/nextjs might appreciate: **`pnpm dev:mock`** runs the full theme with an embedded mock API — no CMS, no .env wiring. Good for evaluating the UI or hacking on components before committing to the backend.

Full stack is available via `reactpress init` if you want admin + API.

Feedback and PRs welcome. What would you want in a headless blog theme?
````

### r/webdev

**Title:** `Open-source headless blog theme on Next.js 15 — preview locally without a backend`

Same body as above; emphasize headless architecture and mock mode.

---

## Dev.to article

**Title:** `Build a Headless Blog on Next.js 15 in 60 Seconds (No CMS Required)`

**Tags:** `nextjs`, `react`, `opensource`, `webdev`

**Outline:**

1. **Intro** — headless vs monolithic; why preview friction kills starter adoption
2. **What is ReactPress Theme Starter** — architecture diagram (API → Next.js → public site)
3. **60-second mock preview** — clone, install, dev:mock, screenshot
4. **What's in the box** — articles, KB, comments, RSS, theme.json
5. **Going full stack** — ReactPress CLI 3-line setup
6. **Deploy** — Vercel one-click vs production API env vars
7. **Customize** — components/, theme.json, admin appearance
8. **CTA** — star repo, join Discussions, link demo

**Closing CTA:**

```markdown
⭐ Star the repo: https://github.com/fecommunity/reactpress-theme-starter  
💬 Questions: GitHub Discussions  
🌐 Demo: https://reactpress-theme-starter.vercel.app
```

---

## Product Hunt (optional)

**Tagline:** `Official Next.js 15 theme for ReactPress — headless blog, mock mode, one-click deploy`

**Description:**

```markdown
ReactPress Theme Starter is the official public-facing theme for ReactPress — a headless blog and CMS stack.

Preview the entire UI without installing a backend: clone the repo, run pnpm dev:mock, and open localhost:3001. Same experience as the live Vercel demo.

Built with Next.js 15, React 19, and Tailwind CSS 4. Includes articles, knowledge base, comments, search, RSS, sitemap, and light/dark mode.

When you're ready for the full stack, the ReactPress CLI sets up site, admin, and API in minutes.

MIT licensed. Contributions welcome.
```

**First comment:** Link to demo + mock quick start + ask "What features would you want in a headless blog theme?"

---

## Newsletter pitch (email to editors)

**Subject:** `For your next issue: Next.js 15 headless blog theme with zero-backend preview`

**Body:**

```markdown
Hi,

We open-sourced ReactPress Theme Starter — the official Next.js 15 frontend for ReactPress (headless CMS + admin + API).

Hook for readers: `pnpm dev:mock` runs the full theme with sample data — no CMS install — which lowers the barrier for evaluating or forking the theme.

- Repo: https://github.com/fecommunity/reactpress-theme-starter
- Demo: https://reactpress-theme-starter.vercel.app
- Stack: Next.js 15, React 19, Tailwind 4

Happy to provide a guest post or more detail if useful.

Thanks,
[Your name]
```

**Targets:** [React Status](https://react.statuscode.com/), [Next.js Weekly](https://nextjsweekly.com/), [JavaScript Weekly](https://javascriptweekly.com/) (submit via their forms).

---

## Good first issues (create on launch day)

1. **docs: add architecture diagram to README** — `good-first-issue`
2. **docs: expand FAQ with deployment troubleshooting** — `good-first-issue`
3. **enhancement: add more mock articles for showcase categories** — `good-first-issue`
4. **a11y: improve search page keyboard navigation** — `good-first-issue`
5. **docs: Dev.to-style "Getting Started" in Discussions wiki** — `good-first-issue`

---

## Seed outreach (DM 5–10 people)

**Template:**

```markdown
Hi [Name] — we're launching the official ReactPress Next.js theme on [date].

You [starred ReactPress / work with Next.js / built a blog recently] — would love your take on the mock-mode preview flow:

https://github.com/fecommunity/reactpress-theme-starter

No pressure to star; honest feedback on README or dev:mock UX is super valuable. We're posting Show HN on [date] if you'd like to follow along.
```

**Who to target:** past ReactPress issue authors, Next.js bloggers, headless CMS advocates, Vercel template curators.

---

## Post-launch (week 1)

- [ ] Reply to every Issue and Discussion within 24–48h
- [ ] Retweet/quote first user Showcase
- [ ] Ship `v1.0.1` with any quick doc fix from feedback (creates a second news moment)
- [ ] Submit PR to `officially-awesome/nextjs` or similar awesome lists

---

## Metrics to track

| Metric        | Tool                           |
| :------------ | :----------------------------- |
| Stars / forks | GitHub Insights                |
| Demo traffic  | Vercel Analytics               |
| Referrers     | GitHub Traffic (HN, Reddit, X) |
| Clone count   | GitHub Traffic                 |

Target week 1: **100–300 stars**, **1K+ demo visits**, **5+ Discussions threads**.
