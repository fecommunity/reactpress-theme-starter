const now = new Date()
const daysAgo = (days: number) => {
  const date = new Date(now)
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

export const mockSetting = {
  systemTitle: 'ReactPress Theme Starter',
  systemSubTitle: 'Headless blog theme powered by ReactPress',
  systemUrl: 'http://localhost:3001',
  seoDesc:
    'A Next.js App Router theme starter for ReactPress — dynamic content, ISR, dark mode, and Vercel-ready deployment.',
  seoKeyword: 'reactpress,nextjs,headless cms,theme,starter,tailwind,vercel',
  i18n: JSON.stringify({
    en: {
      suggestions: 'Suggestions',
      archives: 'Archives',
      tags: 'Tags',
      search: 'Search',
      tagTitle: 'Tags',
      empty: 'No data',
      homeTitle: 'Home',
      comment: 'Comments',
      recommendToReading: 'Recommended Readings',
      articleCover: 'Cover',
      totalSearch: 'Found',
      piece: 'results',
    },
  }),
  globalSetting: JSON.stringify({
    en: {
      globalConfig: {
        navConfig: { categories: [], subCategories: {} },
        urlConfig: [],
      },
    },
  }),
}

export const mockCategories = [
  {
    id: 'getting-started',
    value: 'getting-started',
    label: 'Getting Started',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(1),
  },
  {
    id: 'theme-development',
    value: 'theme-development',
    label: 'Theme Development',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
  },
  {
    id: 'deployment',
    value: 'deployment',
    label: 'Deployment',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(3),
  },
]

export const mockTags = [
  {
    value: 'reactpress',
    label: 'ReactPress',
    articleCount: 6,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(1),
  },
  {
    value: 'nextjs',
    label: 'Next.js',
    articleCount: 5,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(1),
  },
  {
    value: 'headless-cms',
    label: 'Headless CMS',
    articleCount: 4,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
  },
  {
    value: 'theme',
    label: 'Theme',
    articleCount: 4,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
  },
  {
    value: 'tailwind',
    label: 'Tailwind CSS',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(3),
  },
  {
    value: 'vercel',
    label: 'Vercel',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(3),
  },
  {
    value: 'typescript',
    label: 'TypeScript',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(4),
  },
  {
    value: 'app-router',
    label: 'App Router',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(4),
  },
  {
    value: 'isr',
    label: 'ISR',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(5),
  },
  {
    value: 'toolkit',
    label: 'Toolkit',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(5),
  },
]

const tag = (value: string) => mockTags.find((item) => item.value === value) ?? mockTags[0]

const helloWorldHtml = `
<h2>Hello World</h2>
<p>Welcome to <strong>ReactPress</strong> — an open-source headless CMS for teams who want a modern content platform without locking the frontend to a single stack.</p>
<p>ReactPress splits responsibilities cleanly:</p>
<ul>
  <li><strong>Admin &amp; API</strong> — NestJS backend, role-based workflows, media library, comments, knowledge base, and custom pages.</li>
  <li><strong>Theme</strong> — a swappable visitor site. This repository is the official <em>Theme Starter</em> built with Next.js 15 App Router and Tailwind CSS 4.</li>
  <li><strong>Toolkit</strong> — <code>@fecommunity/reactpress-toolkit</code> ships SSR helpers, providers, and UI primitives so themes stay thin and consistent.</li>
</ul>
<h3>Why headless?</h3>
<p>Your marketing site can deploy to Vercel while the API runs elsewhere. Designers iterate on the theme repo independently from CMS releases. Multiple frontends can consume the same content API.</p>
<h3>Try it locally</h3>
<pre><code>pnpm install
pnpm dev:mock   # offline mock API via app/api routes
pnpm dev        # connect to a real ReactPress instance</code></pre>
<p>Official docs: <a href="https://reactpress.dev" rel="noopener noreferrer">reactpress.dev</a></p>
`.trim()

const themeStarterHtml = `
<h2>Getting Started with the Theme Starter</h2>
<p>This project is the recommended starting point for building a ReactPress visitor theme. It already wires up routing, SEO metadata, RSS, search, archives, and responsive layout components.</p>
<h3>Prerequisites</h3>
<ul>
  <li>Node.js 20+ and pnpm 9+</li>
  <li>A running ReactPress API, <em>or</em> mock mode for offline development</li>
</ul>
<h3>Environment variables</h3>
<ul>
  <li><code>REACTPRESS_API_URL</code> — SSR requests (include <code>/api</code> suffix)</li>
  <li><code>NEXT_PUBLIC_REACTPRESS_API_URL</code> — browser requests, often <code>/api</code> with rewrites</li>
  <li><code>CLIENT_SITE_URL</code> — canonical site URL for sitemap and Open Graph</li>
</ul>
<p>Run <code>pnpm dev -- --remote-origin api.example.com</code> to point at a remote CMS while developing the theme.</p>
`.trim()

const headlessHtml = `
<h2>Headless CMS Architecture</h2>
<p>ReactPress treats content as data and presentation as code. The API exposes resources such as articles, categories, tags, pages, comments, and knowledge books through a stable JSON envelope:</p>
<pre><code>{ "success": true, "data": ... }</code></pre>
<p>Server Components call <code>themeApi</code> during SSR/ISR. Client islands use the same providers from <code>@fecommunity/reactpress-toolkit/theme</code> for interactive features like search, comments, and pagination.</p>
<h3>Deployment topologies</h3>
<ol>
  <li>Monorepo — theme lives under <code>themes/</code> next to the CMS.</li>
  <li>Split repos — theme on Vercel, API on your infrastructure.</li>
  <li>Preview — mock API routes for CI and design reviews without a live backend.</li>
</ol>
`.trim()

const deployHtml = `
<h2>Deploy to Vercel</h2>
<p>The theme starter is optimized for Vercel's Next.js runtime. Set production environment variables in the Vercel dashboard before your first deploy.</p>
<h3>Checklist</h3>
<ul>
  <li>Connect the Git repository and enable pnpm install</li>
  <li>Set <code>REACTPRESS_API_URL</code> to your production API</li>
  <li>Set <code>CLIENT_SITE_URL</code> to your public domain</li>
  <li>Redeploy after changing env vars so SSR picks up new values</li>
</ul>
<p>Browser requests can use the built-in <code>/api</code> route handler to proxy or mock upstream APIs depending on <code>REACTPRESS_MOCK_API</code>.</p>
`.trim()

const toolkitHtml = `
<h2>Working with the Toolkit</h2>
<p>Import server helpers from <code>@fecommunity/reactpress-toolkit/theme/server</code> inside Server Components — for example <code>fetchHomePageProps</code>, <code>fetchArticleDetailProps</code>, and <code>fetchAppBootstrap</code>.</p>
<p>Client components should import from <code>@fecommunity/reactpress-toolkit/theme</code> and <code>@fecommunity/reactpress-toolkit/ui</code> to access hooks like <code>useSiteCatalog</code> and <code>useLocale</code>.</p>
<h3>Providers</h3>
<p><code>ReactPressAppProviders</code> in <code>app/layout.tsx</code> hydrates bootstrap data (settings, tags, categories, pages) once per request so nested routes stay fast.</p>
`.trim()

const isrHtml = `
<h2>ISR and Caching</h2>
<p>Most list and detail routes export <code>revalidate = 60</code> (or higher for sitemap) so pages stay fresh without rebuilding the entire site on every content change.</p>
<p>When content editors publish updates in ReactPress, the next visitor request after the revalidation window triggers a background refresh.</p>
<h3>Mock builds in CI</h3>
<p>GitHub Actions starts Next.js dev with <code>REACTPRESS_MOCK_API=1</code> so production builds can prefetch realistic pages without contacting a remote API.</p>
`.trim()

const suggestionsHtml = `
<h1>Suggestions &amp; Feedback</h1>
<p>Thank you for trying the <strong>ReactPress Theme Starter</strong>. This page is a CMS-managed route (<code>/suggestions</code>) rendered through the same pipeline as other custom pages.</p>
<h2>We would love your input</h2>
<ul>
  <li>Report layout or accessibility issues you notice on mobile and desktop.</li>
  <li>Suggest additional starter components (e.g. newsletter, series navigation, author cards).</li>
  <li>Share deployment guides for platforms beyond Vercel.</li>
  <li>Tell us which toolkit APIs need clearer examples in the docs.</li>
</ul>
<h2>How to contribute</h2>
<p>Open an issue or pull request on GitHub with reproduction steps, expected behavior, and screenshots when relevant. If you extend the theme for your own site, consider upstreaming generic improvements.</p>
<h3>Related reading</h3>
<ul>
  <li><a href="/article/hello-world/">Hello World — What Is ReactPress?</a></li>
  <li><a href="/article/theme-starter-guide/">Getting Started with the Theme Starter</a></li>
  <li><a href="https://reactpress.dev" rel="noopener noreferrer">ReactPress documentation</a></li>
</ul>
<p>Mock mode serves this page from <code>lib/mock-api/data.ts</code> via <code>GET /api/page/suggestions</code>.</p>
`.trim()

export const mockArticles = [
  {
    id: 'hello-world',
    title: 'Hello World — What Is ReactPress?',
    summary:
      'Welcome to ReactPress: a headless CMS with a swappable Next.js theme, toolkit helpers, and API-driven content.',
    content: helloWorldHtml.replace(/<[^>]+>/g, ' '),
    html: helloWorldHtml,
    toc: '',
    cover: '/logo-400.png',
    status: 'publish',
    publishAt: daysAgo(1),
    updateAt: daysAgo(1),
    createAt: daysAgo(1),
    category: mockCategories[0],
    tags: [tag('reactpress'), tag('nextjs'), tag('headless-cms'), tag('theme')],
    views: 3280,
    likes: 96,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'theme-starter-guide',
    title: 'Getting Started with the Theme Starter',
    summary:
      'Install dependencies, configure environment variables, and run the ReactPress theme in local or mock mode.',
    content: themeStarterHtml.replace(/<[^>]+>/g, ' '),
    html: themeStarterHtml,
    toc: '',
    cover: '/logo.png',
    status: 'publish',
    publishAt: daysAgo(3),
    updateAt: daysAgo(2),
    createAt: daysAgo(10),
    category: mockCategories[0],
    tags: [tag('reactpress'), tag('theme'), tag('typescript'), tag('app-router')],
    views: 2140,
    likes: 54,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'headless-architecture',
    title: 'ReactPress Headless CMS Architecture',
    summary:
      'How ReactPress splits admin, API, and theme layers for flexible content delivery and independent deployments.',
    content: headlessHtml.replace(/<[^>]+>/g, ' '),
    html: headlessHtml,
    toc: '',
    cover: '/icon-512.png',
    status: 'publish',
    publishAt: daysAgo(7),
    updateAt: daysAgo(5),
    createAt: daysAgo(14),
    category: mockCategories[1],
    tags: [tag('headless-cms'), tag('reactpress'), tag('toolkit')],
    views: 1560,
    likes: 41,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'deploy-vercel',
    title: 'Deploy Your ReactPress Theme to Vercel',
    summary:
      'Configure API URLs, connect your Git repository, and ship a production visitor site on Vercel.',
    content: deployHtml.replace(/<[^>]+>/g, ' '),
    html: deployHtml,
    toc: '',
    cover: '/icon-192.png',
    status: 'publish',
    publishAt: daysAgo(12),
    updateAt: daysAgo(8),
    createAt: daysAgo(20),
    category: mockCategories[2],
    tags: [tag('vercel'), tag('nextjs'), tag('tailwind'), tag('theme')],
    views: 980,
    likes: 28,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'toolkit-guide',
    title: 'Working with @fecommunity/reactpress-toolkit',
    summary:
      'Server helpers, client providers, and UI primitives that keep ReactPress themes consistent and maintainable.',
    content: toolkitHtml.replace(/<[^>]+>/g, ' '),
    html: toolkitHtml,
    toc: '',
    cover: '/logo-400.png',
    status: 'publish',
    publishAt: daysAgo(15),
    updateAt: daysAgo(10),
    createAt: daysAgo(22),
    category: mockCategories[1],
    tags: [tag('toolkit'), tag('typescript'), tag('app-router'), tag('theme')],
    views: 740,
    likes: 22,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'isr-caching',
    title: 'ISR and Caching in the Theme Starter',
    summary:
      'How revalidate windows, mock CI builds, and App Router caching work together in this starter project.',
    content: isrHtml.replace(/<[^>]+>/g, ' '),
    html: isrHtml,
    toc: '',
    cover: '/icon-512.png',
    status: 'publish',
    publishAt: daysAgo(18),
    updateAt: daysAgo(12),
    createAt: daysAgo(25),
    category: mockCategories[2],
    tags: [tag('isr'), tag('nextjs'), tag('vercel')],
    views: 620,
    likes: 17,
    isRecommended: false,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
]

export const mockRecommendedArticles = mockArticles.filter((article) => article.isRecommended)

export const mockArticle = mockArticles[0]
export const mockCategory = mockCategories[0]
export const mockTag = mockTags[0]

export const mockPages = [
  {
    id: 'suggestions',
    cover: '/logo.png',
    name: 'Suggestions',
    path: 'suggestions',
    order: 0,
    content: suggestionsHtml.replace(/<[^>]+>/g, ' '),
    html: suggestionsHtml,
    toc: '',
    status: 'publish',
    publishAt: daysAgo(30),
    views: 128,
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
  },
]

export const mockPage = mockPages[0]

export const mockArchives = {
  [String(new Date().getFullYear())]: {
    [String(new Date().getMonth() + 1).padStart(2, '0')]: mockArticles.map(
      ({ id, title, publishAt }) => ({ id, title, publishAt })
    ),
  },
}

export const mockKnowledgeBooks = [
  {
    id: 'reactpress-docs',
    parentId: '',
    order: 0,
    title: 'ReactPress Handbook',
    cover: '/logo-400.png',
    summary: 'Core concepts for building themes on top of ReactPress.',
    content: 'ReactPress handbook overview.',
    html: '<p>Start with the API overview, theme manifest, and deployment guides.</p>',
    toc: '',
    status: 'publish',
    views: 42,
    likes: 0,
    isCommentable: false,
    publishAt: daysAgo(30),
    createAt: daysAgo(30),
    updateAt: daysAgo(30),
  },
]

export function getMockArticleById(id: string) {
  return mockArticles.find((article) => article.id === id) ?? mockArticles[0]
}

export function getMockPageById(id: string) {
  return mockPages.find((page) => page.id === id || page.path === id) ?? mockPage
}

export function getMockCategoryByValue(value: string) {
  return mockCategories.find((category) => category.value === value) ?? mockCategories[0]
}

export function getMockTagByValue(value: string) {
  return mockTags.find((item) => item.value === value) ?? mockTags[0]
}

export function filterMockArticlesByCategory(value: string) {
  return mockArticles.filter((article) => article.category?.value === value)
}

export function filterMockArticlesByTag(value: string) {
  return mockArticles.filter((article) =>
    article.tags?.some((item: { value?: string }) => item.value === value)
  )
}

export function searchMockArticles(keyword: string) {
  const trimmed = keyword.trim().toLowerCase()
  if (!trimmed) return []

  const terms = trimmed.split(/\s+/).filter((term) => term.length >= 2)
  if (!terms.length) return []

  return mockArticles.filter((article) => {
    const fields = [
      article.title,
      article.summary,
      article.id,
      article.category?.label,
      article.category?.value,
      ...(article.tags?.map((item: { label?: string; value?: string }) =>
        [item.label, item.value].filter(Boolean).join(' ')
      ) ?? []),
    ]
      .filter(Boolean)
      .join(' ')
      .toLowerCase()

    return terms.every((term) => fields.includes(term))
  })
}
