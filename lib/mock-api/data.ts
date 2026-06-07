const now = new Date()
const daysAgo = (days: number) => {
  const date = new Date(now)
  date.setDate(date.getDate() - days)
  return date.toISOString()
}

const REACTPRESS_GITHUB = 'https://github.com/fecommunity/reactpress'
const REACTPRESS_SITE = 'https://reactpress.surge.sh/'
const REACTPRESS_DEMO = 'https://reactpress-theme-starter.vercel.app'
const REACTPRESS_NPM = 'https://www.npmjs.com/package/@fecommunity/reactpress'

const mockSearchCategories = {
  categories: [
    { label: 'Site', key: 'local' },
    { label: 'Web', key: 'search' },
    { label: 'GitHub', key: 'github' },
    { label: 'Packages', key: 'packages' },
  ],
  subCategories: {
    search: [
      {
        label: 'Google',
        key: 'search-google',
        url: 'https://www.google.com/search?q=',
      },
      {
        label: 'Bing',
        key: 'search-bing',
        url: 'https://www.bing.com/search?q=',
      },
    ],
    github: [
      {
        label: 'Repositories',
        key: 'github-repos',
        url: 'https://github.com/search?type=repositories&q=',
      },
      {
        label: 'Code',
        key: 'github-code',
        url: 'https://github.com/search?type=code&q=',
      },
      {
        label: 'Issues',
        key: 'github-issues',
        url: 'https://github.com/search?type=issues&q=',
      },
    ],
    packages: [
      {
        label: 'npm',
        key: 'npm-search',
        url: 'https://www.npmjs.com/search?q=',
      },
    ],
  },
}

const mockUrlConfig = [
  {
    key: 'reactpress',
    label: 'ReactPress',
    icon: 'GlobalOutlined',
    children: [
      {
        key: 'rp-github',
        label: 'GitHub',
        description:
          'Official open-source repository — CLI, admin console, API, templates, and toolkit.',
        url: REACTPRESS_GITHUB,
      },
      {
        key: 'rp-site',
        label: 'Official Site',
        description:
          'Product overview, 3.0 highlights, platform capabilities, and documentation links.',
        url: REACTPRESS_SITE,
      },
      {
        key: 'rp-demo',
        label: 'Live Demo',
        description: 'See a running ReactPress public site and admin dashboard in action.',
        url: REACTPRESS_DEMO,
      },
      {
        key: 'rp-npm',
        label: 'npm CLI',
        description: 'Install @fecommunity/reactpress globally and launch your CMS in minutes.',
        url: REACTPRESS_NPM,
      },
    ],
  },
  {
    key: 'docs-community',
    label: 'Docs & Community',
    icon: 'BookOutlined',
    children: [
      {
        key: 'rp-tutorial',
        label: 'Tutorial',
        description: 'Step-by-step guides to install, initialize, and publish with ReactPress.',
        url: `${REACTPRESS_SITE}docs/tutorial`,
      },
      {
        key: 'rp-blog',
        label: 'Blog',
        description: 'Product updates, release notes, and publishing best practices.',
        url: `${REACTPRESS_SITE}blog`,
      },
      {
        key: 'stackoverflow',
        label: 'Stack Overflow',
        description: 'Community Q&A for ReactPress developers.',
        url: 'https://stackoverflow.com/questions/tagged/reactpress',
      },
      {
        key: 'fecommunity',
        label: 'FECommunity',
        description: 'The open-source organization behind ReactPress on GitHub.',
        url: 'https://github.com/fecommunity',
      },
    ],
  },
  {
    key: 'tech-stack',
    label: 'Tech Stack',
    icon: 'CodeOutlined',
    children: [
      {
        key: 'nextjs',
        label: 'Next.js',
        description: 'The React framework powering ReactPress public sites and themes.',
        url: 'https://nextjs.org/',
      },
      {
        key: 'nestjs',
        label: 'NestJS',
        description: 'The backend framework behind the ReactPress REST API.',
        url: 'https://nestjs.com/',
      },
      {
        key: 'antd',
        label: 'Ant Design',
        description: 'UI components used in the ReactPress admin console.',
        url: 'https://ant.design/',
      },
      {
        key: 'theme-starter',
        label: 'Theme Starter',
        description: 'Official Next.js App Router theme starter for ReactPress visitor sites.',
        url: 'https://github.com/fecommunity/reactpress-theme-starter',
      },
    ],
  },
]

const mockThemeConfig = {
  header: {
    navLinks: [
      { path: '/', locale: 'home', icon: 'HomeOutlined', visible: true },
      { path: '/archives', locale: 'archives', icon: 'HistoryOutlined', visible: true },
      { path: '/search', locale: 'search', icon: 'SearchOutlined', visible: true },
    ],
  },
  nav: {
    urlConfig: mockUrlConfig,
    searchCategories: mockSearchCategories,
  },
}

const mockGlobalConfigBundle = {
  globalConfig: {
    navConfig: mockSearchCategories,
    urlConfig: mockUrlConfig,
  },
}

export const mockSetting = {
  systemTitle: 'ReactPress',
  systemSubTitle: 'One package. Your CMS in about a minute.',
  systemUrl: REACTPRESS_SITE,
  aboutUsGithubUrl: REACTPRESS_GITHUB,
  seoDesc:
    'ReactPress is a modern publishing platform for blogs, company sites, and content-driven products. Install the CLI once, run init and dev, and get a public site, admin console, and API.',
  seoKeyword: 'reactpress,cms,blog,nextjs,nestjs,headless,cli,mysql,vercel,open source,publishing',
  systemFooterInfo:
    '<p>ReactPress — a modern publishing platform built with Next.js, NestJS, and Ant Design. <a href="https://github.com/fecommunity/reactpress" rel="noopener noreferrer">Star us on GitHub</a> · <a href="https://reactpress.surge.sh/" rel="noopener noreferrer">Official site</a></p>',
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
      searchArticle: 'Search Articles',
      searchArticlePlaceholder: 'Search ReactPress articles…',
      gettingArticle: 'Fetching articles…',
      aboutUsFallback:
        'ReactPress — one package, one minute to your own CMS. Public site, admin, and API ready to go.',
    },
    zh: {
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
      searchArticle: 'Search Articles',
      searchArticlePlaceholder: 'Search ReactPress articles…',
      gettingArticle: 'Fetching articles…',
      aboutUsFallback:
        'ReactPress — one package, one minute to your own CMS. Public site, admin, and API ready to go.',
    },
  }),
  globalSetting: JSON.stringify({
    en: mockGlobalConfigBundle,
    zh: mockGlobalConfigBundle,
    config: {
      'my-blog': mockThemeConfig,
    },
  }),
}

export const mockCategories = [
  {
    id: 'quick-start',
    value: 'quick-start',
    label: 'Quick Start',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(1),
  },
  {
    id: 'platform',
    value: 'platform',
    label: 'Platform',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
  },
  {
    id: 'cli-deploy',
    value: 'cli-deploy',
    label: 'CLI & Deploy',
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
    value: 'cli',
    label: 'CLI',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(1),
  },
  {
    value: 'nextjs',
    label: 'Next.js',
    articleCount: 4,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(1),
  },
  {
    value: 'nestjs',
    label: 'NestJS',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
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
    value: 'cms',
    label: 'CMS',
    articleCount: 5,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(2),
  },
  {
    value: 'mysql',
    label: 'MySQL',
    articleCount: 2,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(3),
  },
  {
    value: 'docker',
    label: 'Docker',
    articleCount: 2,
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
    updateAt: daysAgo(4),
  },
  {
    value: 'open-source',
    label: 'Open Source',
    articleCount: 3,
    articles: [],
    createAt: daysAgo(30),
    updateAt: daysAgo(4),
  },
]

const tag = (value: string) => mockTags.find((item) => item.value === value) ?? mockTags[0]

const whatIsReactPressHtml = `
<h2>What is ReactPress?</h2>
<p><strong>ReactPress</strong> is a modern publishing platform for blogs, company sites, and content-driven products. Install the CLI once, run <code>init</code> and <code>dev</code>, and you get a public site, admin console, and API — without hand-writing config files or wiring a database yourself.</p>
<blockquote><p><strong>One backend, many fronts.</strong> Publish in one place; show content on the web, in admin, or through your own apps via the API.</p></blockquote>
<h3>3.0 highlights</h3>
<ul>
  <li><strong>Zero-config setup</strong> — two commands set up your site and database.</li>
  <li><strong>All-in-one CLI</strong> — initialize, develop, self-check, and view status from the terminal.</li>
  <li><strong>Easy to get started</strong> — interactive guides, environment checks, and status tips right after startup.</li>
</ul>
<h3>Learn more</h3>
<ul>
  <li><a href="${REACTPRESS_GITHUB}" rel="noopener noreferrer">GitHub repository</a> — 689+ stars, MIT license</li>
  <li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">Official site</a> — documentation and live demo links</li>
  <li><a href="${REACTPRESS_DEMO}" rel="noopener noreferrer">Live demo</a> — see admin and public site in action</li>
</ul>
`.trim()

const quickStartHtml = `
<h2>Quick Start</h2>
<p>Get a working CMS in about a minute with the ReactPress CLI.</p>
<h3>Prerequisites</h3>
<ul>
  <li><strong>Node.js 18+</strong> — required for the CLI</li>
  <li><strong>Docker</strong> — recommended; default bundled MySQL runs in a container</li>
  <li><strong>MySQL</strong> — optional; use your own instance instead of Docker</li>
</ul>
<h3>Install and run</h3>
<pre><code>npm i -g @fecommunity/reactpress@3
mkdir my-blog &amp;&amp; cd my-blog
reactpress init
reactpress dev</code></pre>
<p>When <code>dev</code> is ready, open the URLs printed in the terminal:</p>
<table>
  <thead><tr><th>Service</th><th>Typical URL</th></tr></thead>
  <tbody>
    <tr><td>Public site</td><td>http://localhost:3001</td></tr>
    <tr><td>Admin</td><td>http://localhost:3001/admin</td></tr>
    <tr><td>API health</td><td>http://localhost:3002/api/health</td></tr>
  </tbody>
</table>
<h3>Tips</h3>
<ul>
  <li>Run <code>reactpress</code> with no arguments for the interactive menu.</li>
  <li>Run <code>reactpress doctor</code> or <code>reactpress status</code> if something does not look right.</li>
</ul>
`.trim()

const platformCapabilitiesHtml = `
<h2>Platform Capabilities</h2>
<p>From personal blogs to team content sites — publish, manage, and collaborate out of the box.</p>
<h3>Content &amp; authoring</h3>
<ul>
  <li>Built-in Markdown editor</li>
  <li>Articles, categories, tags, pages, comments, and media in one place</li>
  <li>Knowledge base for structured documentation</li>
</ul>
<h3>Open integrations</h3>
<ul>
  <li>Open APIs and access keys for external systems</li>
  <li>Event callbacks for automation workflows</li>
  <li>Headless mode via <code>reactpress dev --api-only</code></li>
</ul>
<h3>Modern interface</h3>
<ul>
  <li>Modern admin and public site with light/dark theme support</li>
  <li>Chinese/English UI — comfortable on desktop, tablet, and mobile</li>
  <li>Swappable themes from minimal hello-world to full blog layouts</li>
</ul>
<h3>How it compares</h3>
<p>Unlike traditional CMS setups that require server plugins and manual configuration, or static generators that rebuild on every change, ReactPress gives you <strong>one CLI and about one minute to a working CMS</strong> with an admin UI and your choice of presentation layer.</p>
`.trim()

const cliReferenceHtml = `
<h2>CLI Reference</h2>
<p>After a global install, every workflow starts from the terminal.</p>
<pre><code>npm i -g @fecommunity/reactpress@3</code></pre>
<table>
  <thead><tr><th>Command</th><th>Description</th></tr></thead>
  <tbody>
    <tr><td><code>reactpress</code></td><td>Interactive menu</td></tr>
    <tr><td><code>reactpress init</code></td><td>Set up a new project (config + .env)</td></tr>
    <tr><td><code>reactpress dev</code></td><td>Run site + admin + API locally</td></tr>
    <tr><td><code>reactpress dev --api-only</code></td><td>API only — for custom frontends</td></tr>
    <tr><td><code>reactpress doctor</code></td><td>Check your environment</td></tr>
    <tr><td><code>reactpress status</code></td><td>See what is running</td></tr>
    <tr><td><code>reactpress build</code></td><td>Production build</td></tr>
    <tr><td><code>reactpress start</code></td><td>Run production build</td></tr>
  </tbody>
</table>
<p>The monorepo on <a href="${REACTPRESS_GITHUB}" rel="noopener noreferrer">GitHub</a> contains the CLI, client, server, toolkit, and templates. Contributors use <code>pnpm install</code> and <code>pnpm run dev</code> to develop the platform itself.</p>
`.trim()

const deployHtml = `
<h2>Deploy ReactPress</h2>
<p>Ship your publishing platform to production with a straightforward build workflow.</p>
<h3>Production commands</h3>
<pre><code>npm i -g @fecommunity/reactpress@3
reactpress build
reactpress start</code></pre>
<p>Deploy with Vercel, PM2, Docker, or your preferred hosting. The public site, admin console, and API can run together or split across services in headless mode.</p>
<h3>Theme on Vercel</h3>
<p>Visitor themes like this starter deploy independently to Vercel while the API runs elsewhere. Set <code>REACTPRESS_API_URL</code> and <code>CLIENT_SITE_URL</code> in your environment before the first deploy.</p>
<h3>Resources</h3>
<ul>
  <li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">Official documentation</a></li>
  <li><a href="${REACTPRESS_GITHUB}/blob/master/README.md" rel="noopener noreferrer">README</a> — deployment details for Docker and monorepos</li>
</ul>
`.trim()

const themeStarterHtml = `
<h2>Theme Starter &amp; Headless Frontends</h2>
<p>ReactPress separates content management from presentation. The API exposes articles, categories, tags, pages, comments, and knowledge books through a stable JSON envelope:</p>
<pre><code>{ "success": true, "data": ... }</code></pre>
<p>This repository is the official <strong>Theme Starter</strong> — a Next.js 15 App Router project with Tailwind CSS 4, ISR, dark mode, RSS, search, and Vercel-ready deployment.</p>
<h3>Development modes</h3>
<ul>
  <li><code>pnpm dev:mock</code> — offline mock API via <code>app/api</code> routes</li>
  <li><code>pnpm dev</code> — connect to a real ReactPress instance</li>
</ul>
<h3>Toolkit</h3>
<p><code>@fecommunity/reactpress-toolkit</code> ships SSR helpers, providers, and UI primitives so themes stay thin and consistent. Import server helpers from <code>@fecommunity/reactpress-toolkit/theme/server</code> and client hooks from <code>@fecommunity/reactpress-toolkit/ui</code>.</p>
<p>Repository: <a href="https://github.com/fecommunity/reactpress-theme-starter" rel="noopener noreferrer">reactpress-theme-starter</a></p>
`.trim()

const suggestionsHtml = `
<h1>Suggestions &amp; Feedback</h1>
<p>Thank you for exploring <strong>ReactPress</strong>. We welcome your ideas to make the platform and this theme starter better.</p>
<h2>Share your thoughts</h2>
<ul>
  <li>Report bugs or UX issues on the <a href="${REACTPRESS_GITHUB}/issues" rel="noopener noreferrer">GitHub issue tracker</a>.</li>
  <li>Suggest features for the CLI, admin console, or theme toolkit.</li>
  <li>Share deployment guides for platforms beyond Vercel.</li>
  <li>Tell us which documentation topics need clearer examples.</li>
</ul>
<h2>Contributing</h2>
<p>ReactPress is open source under the MIT license. Fork the repository, run <code>pnpm install</code> and <code>pnpm run dev</code>, and open a pull request. Meaningful contributions are credited in the README.</p>
<h3>Related reading</h3>
<ul>
  <li><a href="/article/what-is-reactpress/">What is ReactPress?</a></li>
  <li><a href="/article/quick-start/">Quick Start with ReactPress</a></li>
  <li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">Official documentation</a></li>
</ul>
`.trim()

export const mockArticles = [
  {
    id: 'what-is-reactpress',
    title: 'What is ReactPress?',
    summary:
      'A modern publishing platform — install the CLI once, run init and dev, and get a public site, admin console, and API in about a minute.',
    content: whatIsReactPressHtml.replace(/<[^>]+>/g, ' '),
    html: whatIsReactPressHtml,
    toc: '',
    cover: '/logo-400.png',
    status: 'publish',
    publishAt: daysAgo(1),
    updateAt: daysAgo(1),
    createAt: daysAgo(1),
    category: mockCategories[0],
    tags: [tag('reactpress'), tag('cms'), tag('open-source'), tag('headless-cms')],
    views: 6890,
    likes: 128,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'quick-start',
    title: 'Quick Start with ReactPress',
    summary:
      'Install @fecommunity/reactpress@3 globally, run init and dev, and open your public site, admin, and API locally.',
    content: quickStartHtml.replace(/<[^>]+>/g, ' '),
    html: quickStartHtml,
    toc: '',
    cover: '/logo.png',
    status: 'publish',
    publishAt: daysAgo(3),
    updateAt: daysAgo(2),
    createAt: daysAgo(10),
    category: mockCategories[0],
    tags: [tag('reactpress'), tag('cli'), tag('docker'), tag('mysql')],
    views: 4520,
    likes: 96,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'platform-capabilities',
    title: 'ReactPress Platform Capabilities',
    summary:
      'Content authoring, open APIs, modern admin UI, internationalization, and flexible theme customization — from blogs to team content sites.',
    content: platformCapabilitiesHtml.replace(/<[^>]+>/g, ' '),
    html: platformCapabilitiesHtml,
    toc: '',
    cover: '/icon-512.png',
    status: 'publish',
    publishAt: daysAgo(7),
    updateAt: daysAgo(5),
    createAt: daysAgo(14),
    category: mockCategories[1],
    tags: [tag('reactpress'), tag('cms'), tag('headless-cms'), tag('nextjs')],
    views: 3180,
    likes: 72,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'cli-reference',
    title: 'ReactPress CLI Reference',
    summary:
      'Interactive menu, init, dev, doctor, status, build, and start — every command you need from the terminal.',
    content: cliReferenceHtml.replace(/<[^>]+>/g, ' '),
    html: cliReferenceHtml,
    toc: '',
    cover: '/icon-192.png',
    status: 'publish',
    publishAt: daysAgo(12),
    updateAt: daysAgo(8),
    createAt: daysAgo(20),
    category: mockCategories[2],
    tags: [tag('cli'), tag('reactpress'), tag('open-source'), tag('nestjs')],
    views: 2140,
    likes: 54,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'deploy-reactpress',
    title: 'Deploy ReactPress to Production',
    summary:
      'Build and start your CMS for production. Deploy with Vercel, Docker, or PM2 — monolithic or headless.',
    content: deployHtml.replace(/<[^>]+>/g, ' '),
    html: deployHtml,
    toc: '',
    cover: '/logo-400.png',
    status: 'publish',
    publishAt: daysAgo(15),
    updateAt: daysAgo(10),
    createAt: daysAgo(22),
    category: mockCategories[2],
    tags: [tag('vercel'), tag('docker'), tag('reactpress'), tag('cli')],
    views: 1680,
    likes: 41,
    isRecommended: true,
    password: '',
    needPassword: false,
    isCommentable: true,
  },
  {
    id: 'theme-starter',
    title: 'Theme Starter & Headless Frontends',
    summary:
      'Build visitor sites with the official Next.js theme starter and @fecommunity/reactpress-toolkit — mock mode, ISR, and Vercel deployment.',
    content: themeStarterHtml.replace(/<[^>]+>/g, ' '),
    html: themeStarterHtml,
    toc: '',
    cover: '/icon-512.png',
    status: 'publish',
    publishAt: daysAgo(18),
    updateAt: daysAgo(12),
    createAt: daysAgo(25),
    category: mockCategories[1],
    tags: [tag('nextjs'), tag('headless-cms'), tag('reactpress'), tag('vercel')],
    views: 1240,
    likes: 33,
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
    views: 256,
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

export const mockKnowledgeChapters = [
  {
    id: 'cli-overview',
    parentId: 'reactpress-handbook',
    order: 0,
    title: 'CLI Overview',
    cover: '',
    summary: 'Commands for init, dev, doctor, status, build, and start.',
    content: 'ReactPress CLI overview for developers.',
    html: '<p>Install <code>@fecommunity/reactpress@3</code> globally and use the interactive menu or run commands directly from your terminal.</p>',
    toc: '',
    status: 'publish',
    views: 42,
    likes: 0,
    isCommentable: false,
    publishAt: daysAgo(20),
    createAt: daysAgo(20),
    updateAt: daysAgo(20),
  },
  {
    id: 'api-endpoints',
    parentId: 'reactpress-handbook',
    order: 1,
    title: 'REST API Endpoints',
    cover: '',
    summary: 'Articles, pages, settings, categories, tags, and media via JSON API.',
    content: 'Core API endpoints for theme and integration developers.',
    html: '<p>The API runs on port 3002 by default. Health check: <code>GET /api/health</code>. All responses use the <code>{ success, data }</code> envelope.</p>',
    toc: '',
    status: 'publish',
    views: 36,
    likes: 0,
    isCommentable: false,
    publishAt: daysAgo(15),
    createAt: daysAgo(15),
    updateAt: daysAgo(15),
  },
  {
    id: 'theme-development',
    parentId: 'reactpress-handbook',
    order: 2,
    title: 'Theme Development',
    cover: '',
    summary: 'Build visitor sites with theme.json, App Router, and the toolkit.',
    content: 'Guide to building custom ReactPress themes.',
    html: '<p>Start from <a href="https://github.com/fecommunity/reactpress-theme-starter">reactpress-theme-starter</a>. Map templates in <code>theme.json</code> and fetch content via <code>themeApi</code> during SSR.</p>',
    toc: '',
    status: 'publish',
    views: 28,
    likes: 0,
    isCommentable: false,
    publishAt: daysAgo(10),
    createAt: daysAgo(10),
    updateAt: daysAgo(10),
  },
]

export const mockKnowledgeBooks = [
  {
    id: 'reactpress-handbook',
    parentId: '',
    order: 0,
    title: 'ReactPress Handbook',
    cover: '/logo-400.png',
    summary: 'CLI, API, and theme development essentials for ReactPress.',
    content: 'ReactPress handbook overview.',
    html: '<p>Everything you need to publish with ReactPress — from <code>reactpress init</code> to custom themes and headless integrations.</p>',
    toc: '',
    status: 'publish',
    views: 128,
    likes: 0,
    isCommentable: false,
    publishAt: daysAgo(30),
    createAt: daysAgo(30),
    updateAt: daysAgo(30),
    children: mockKnowledgeChapters,
  },
]

export const mockKnowledgeItems = [...mockKnowledgeBooks, ...mockKnowledgeChapters]

export function getMockKnowledgeById(id: string) {
  const item = mockKnowledgeItems.find((entry) => entry.id === id)
  if (!item) return mockKnowledgeBooks[0] ?? null
  if (!item.parentId) {
    return {
      ...item,
      children: mockKnowledgeChapters.filter((chapter) => chapter.parentId === item.id),
    }
  }
  return item
}

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
