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
const THEME_STARTER_GITHUB = 'https://github.com/fecommunity/reactpress-theme-starter'

const mockImages = {
  logo: '/logo-400.png',
  logoFull: '/logo.png',
  icon: '/icon-512.png',
  iconSmall: '/icon-192.png',
} as const

const mockFigure = (src: string, alt: string, caption?: string) =>
  `<figure><img src="${src}" alt="${alt}" loading="lazy" />${
    caption ? `<figcaption>${caption}</figcaption>` : ''
  }</figure>`

const mockSearchCategoriesEn = {
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

const mockSearchCategoriesZh = {
  categories: [
    { label: '站内', key: 'local' },
    { label: '搜索', key: 'search' },
    { label: 'GitHub', key: 'github' },
    { label: '包管理', key: 'packages' },
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
        label: '仓库',
        key: 'github-repos',
        url: 'https://github.com/search?type=repositories&q=',
      },
      {
        label: '代码',
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

const mockUrlConfigEn = [
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

const mockUrlConfigZh = [
  {
    key: 'reactpress',
    label: 'ReactPress',
    icon: 'GlobalOutlined',
    children: [
      {
        key: 'rp-github',
        label: 'GitHub',
        description: '官方开源仓库 — CLI、管理端、API、模板与工具包。',
        url: REACTPRESS_GITHUB,
      },
      {
        key: 'rp-site',
        label: '官方网站',
        description: '产品概览、3.0 亮点、平台能力与文档入口。',
        url: REACTPRESS_SITE,
      },
      {
        key: 'rp-demo',
        label: '在线演示',
        description: '查看正在运行的 ReactPress 访客站与管理后台。',
        url: REACTPRESS_DEMO,
      },
      {
        key: 'rp-npm',
        label: 'npm CLI',
        description: '全局安装 @fecommunity/reactpress，几分钟内启动 CMS。',
        url: REACTPRESS_NPM,
      },
    ],
  },
  {
    key: 'docs-community',
    label: '文档与社区',
    icon: 'BookOutlined',
    children: [
      {
        key: 'rp-tutorial',
        label: '教程',
        description: '安装、初始化与发布的分步指南。',
        url: `${REACTPRESS_SITE}docs/tutorial`,
      },
      {
        key: 'rp-blog',
        label: '博客',
        description: '产品更新、版本说明与内容发布实践。',
        url: `${REACTPRESS_SITE}blog`,
      },
      {
        key: 'stackoverflow',
        label: 'Stack Overflow',
        description: 'ReactPress 开发者社区问答。',
        url: 'https://stackoverflow.com/questions/tagged/reactpress',
      },
      {
        key: 'fecommunity',
        label: 'FECommunity',
        description: 'GitHub 上的 ReactPress 开源组织。',
        url: 'https://github.com/fecommunity',
      },
    ],
  },
  {
    key: 'tech-stack',
    label: '技术栈',
    icon: 'CodeOutlined',
    children: [
      {
        key: 'nextjs',
        label: 'Next.js',
        description: '驱动 ReactPress 访客站与主题的 React 框架。',
        url: 'https://nextjs.org/',
      },
      {
        key: 'nestjs',
        label: 'NestJS',
        description: 'ReactPress REST API 的后端框架。',
        url: 'https://nestjs.com/',
      },
      {
        key: 'antd',
        label: 'Ant Design',
        description: 'ReactPress 管理端使用的 UI 组件库。',
        url: 'https://ant.design/',
      },
      {
        key: 'theme-starter',
        label: '主题模板',
        description: '官方 Next.js App Router 访客站主题 Starter。',
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
}

const mockGlobalConfigBundleEn = {
  globalConfig: {
    navConfig: mockSearchCategoriesEn,
    urlConfig: mockUrlConfigEn,
  },
}

const mockGlobalConfigBundleZh = {
  globalConfig: {
    navConfig: mockSearchCategoriesZh,
    urlConfig: mockUrlConfigZh,
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
      suggestions: '建议反馈',
      archives: '归档',
      tags: '标签',
      search: '搜索',
      tagTitle: '标签',
      empty: '暂无数据',
      homeTitle: '首页',
      comment: '评论',
      recommendToReading: '推荐阅读',
      articleCover: '封面',
      totalSearch: '共找到',
      piece: '条结果',
      searchArticle: '搜索文章',
      searchArticlePlaceholder: '搜索 ReactPress 相关文章…',
      gettingArticle: '正在获取文章…',
      nav: '网址导航',
      aboutUsFallback:
        'ReactPress — 一个包，一分钟搭建属于你的 CMS。访客站、管理端与 API 开箱即用。',
    },
  }),
  globalSetting: JSON.stringify({
    en: mockGlobalConfigBundleEn,
    zh: mockGlobalConfigBundleZh,
    theme: {
      activeTheme: 'my-blog',
      installedThemes: ['my-blog'],
      mods: {},
    },
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
${mockFigure(mockImages.logo, 'ReactPress technical architecture — CLI, NestJS API, MySQL, admin, and headless themes', 'Official architecture overview · reactpress.surge.sh')}
<h2>ReactPress Technical Architecture</h2>
<p><strong>ReactPress</strong> is a monolithic-yet-modular publishing platform: one CLI bootstraps a NestJS API, MySQL database, built-in admin console, and optional headless visitor themes. Content is authored once in the admin and consumed everywhere through a stable REST envelope <code>{ "success": true, "data": ... }</code>.</p>
<p><img src="${mockImages.logo}" alt="ReactPress logo — atom mark with letter P" width="200" loading="lazy" /></p>
<blockquote><p><strong>One backend, many presentation layers.</strong> The same API powers the bundled admin UI, official themes, and your custom Next.js frontends.</p></blockquote>
<h3>Core layers</h3>
<table>
  <thead><tr><th>Layer</th><th>Technology</th><th>Role</th></tr></thead>
  <tbody>
    <tr><td>CLI</td><td><code>@fecommunity/reactpress</code></td><td><code>init</code>, <code>dev</code>, <code>build</code>, <code>doctor</code>, <code>status</code></td></tr>
    <tr><td>API Server</td><td>NestJS</td><td>REST on <code>:3002/api</code> — articles, pages, media, settings</td></tr>
    <tr><td>Database</td><td>MySQL</td><td>Persistent content store (Docker by default)</td></tr>
    <tr><td>Admin</td><td>Next.js + Ant Design</td><td>Authoring UI at <code>/admin</code></td></tr>
    <tr><td>Visitor theme</td><td>Next.js App Router</td><td>Headless SSR via <code>@fecommunity/reactpress-toolkit</code></td></tr>
  </tbody>
</table>
${mockFigure(mockImages.logoFull, 'ReactPress architecture stack diagram', 'From CLI to NestJS API, admin console, and Theme Starter')}
<h3>Learn more</h3>
<ul>
  <li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a> — product overview and documentation</li>
  <li><a href="${REACTPRESS_GITHUB}" rel="noopener noreferrer">GitHub repository</a> — CLI, server, client, toolkit, templates</li>
  <li><a href="${THEME_STARTER_GITHUB}" rel="noopener noreferrer">Theme Starter</a> — official headless visitor theme (this repo)</li>
</ul>
`.trim()

const quickStartHtml = `
${mockFigure(mockImages.logo, 'Quick Start with ReactPress CLI', 'Three commands to spin up visitor site, admin, and API')}
<h2>Quick Start</h2>
<p>The CLI orchestrates every service in the ReactPress architecture. After a global install, <code>init</code> writes project config and <code>dev</code> starts the API, admin, and default visitor site together.</p>
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
${mockFigure(mockImages.logoFull, 'ReactPress architecture stack', 'CLI → NestJS + MySQL → Admin UI + headless Theme Starter')}
<h2>Architecture in Detail</h2>
<p>ReactPress separates <strong>content management</strong> (NestJS + MySQL + admin) from <strong>presentation</strong> (visitor themes). The REST API is the contract between both sides.</p>
<h3>Request flow (headless mode)</h3>
<ol>
  <li>Editor publishes an article in the admin console.</li>
  <li>NestJS persists content to MySQL and exposes it at <code>GET /api/article/:id</code>.</li>
  <li>Theme Starter fetches via <code>themeApi</code> during SSR and renders App Router pages with ISR.</li>
  <li>Browser receives HTML; subsequent navigations hydrate client components from the toolkit.</li>
</ol>
<h3>Monorepo packages</h3>
<ul>
  <li><strong>CLI</strong> — project lifecycle and local orchestration</li>
  <li><strong>Server</strong> — NestJS modules for articles, categories, tags, pages, comments, knowledge, media</li>
  <li><strong>Client</strong> — bundled admin and default visitor UI</li>
  <li><strong>Toolkit</strong> — <code>@fecommunity/reactpress-toolkit</code> for third-party themes</li>
  <li><strong>Theme Starter</strong> — reference headless implementation (this repository)</li>
</ul>
<h3>Headless entry point</h3>
<p>Run <code>reactpress dev --api-only</code> when you only need the API and connect a custom theme such as Theme Starter with <code>pnpm dev</code>.</p>
<p>Documentation: <a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a></p>
`.trim()

const cliReferenceHtml = `
${mockFigure(mockImages.logo, 'ReactPress CLI workflow', 'Every command starts from the terminal after a global install')}
<h2>CLI Reference</h2>
<p>After a global install, every workflow starts from the terminal.</p>
<p><img src="${mockImages.logo}" alt="ReactPress" width="180" loading="lazy" /></p>
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
${mockFigure(mockImages.icon, 'Headless theme deployment', 'Theme Starter on Vercel · ReactPress API on your infrastructure')}
<h2>Deploy ReactPress</h2>
<p>Production deployment can be monolithic (CLI <code>build</code> + <code>start</code>) or split: NestJS API on your server, Theme Starter on Vercel.</p>
<h3>Production commands</h3>
<pre><code>npm i -g @fecommunity/reactpress@3
reactpress build
reactpress start</code></pre>
<p>Deploy with Vercel, PM2, Docker, or your preferred hosting. The public site, admin console, and API can run together or split across services in headless mode.</p>
<h3>Theme Starter on Vercel</h3>
<p>This repository deploys as a headless frontend. Point <code>REACTPRESS_API_URL</code> and <code>CLIENT_SITE_URL</code> at your ReactPress instance, or use <code>build:mock</code> for a demo without a backend. See <a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a> for deployment guides.</p>
<h3>Resources</h3>
<ul>
  <li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a> — official documentation</li>
  <li><a href="${REACTPRESS_GITHUB}/blob/master/README.md" rel="noopener noreferrer">README</a> — deployment details for Docker and monorepos</li>
</ul>
`.trim()

const themeStarterHtml = `
${mockFigure(mockImages.logoFull, 'ReactPress Theme Starter — official headless visitor theme', 'Next.js 15 · Tailwind 4 · toolkit · mock mode · Vercel')}
<h2>ReactPress Theme Starter</h2>
<p>This repository is the <strong>official headless visitor theme</strong> for ReactPress. It does not store content locally — every page is rendered from the ReactPress REST API (or built-in mock API during development).</p>
<h3>Project structure</h3>
<pre><code>app/              # App Router pages (home, article, category, search…)
components/       # Layout, article, comment, search UI
lib/reactpress/   # bootstrap, metadata, SEO, providers
lib/mock-api/     # Offline mock data for pnpm dev:mock
theme.json        # Template map + appearance panel schema</code></pre>
<h3>Data integration</h3>
<p>Server components call <code>fetch*PageProps(themeApi, …)</code> from <code>@fecommunity/reactpress-toolkit/theme/server</code>. Client islands use hooks and providers from <code>@fecommunity/reactpress-toolkit/ui</code>. All API responses follow <code>{ "success": true, "data": ... }</code>.</p>
${mockFigure(mockImages.icon, 'Headless deployment — API and theme on separate hosts', 'Production: remote API + Vercel theme · Demo: REACTPRESS_MOCK_API=1')}
<h3>Development modes</h3>
<ul>
  <li><code>pnpm dev:mock</code> — built-in mock API, no backend required (used by Vercel demo)</li>
  <li><code>pnpm dev</code> — connect to local or remote ReactPress API</li>
  <li><code>pnpm build:mock</code> — CI / demo production build with mock data</li>
</ul>
<h3>Appearance</h3>
<p>Light/dark mode and primary colors are driven by <code>theme.json</code> appearance settings (defaults: rose primary <code>#e11d48</code>, white / dark gray backgrounds) and applied at runtime via CSS variables.</p>
<p>Repository: <a href="${THEME_STARTER_GITHUB}" rel="noopener noreferrer">github.com/fecommunity/reactpress-theme-starter</a> · Docs: <a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a></p>
`.trim()

const suggestionsHtml = `
${mockFigure(mockImages.logo, 'ReactPress community feedback', 'Help us improve ReactPress and this theme starter')}
<p>Thank you for using ReactPress. We welcome your ideas, bug reports, and documentation feedback.</p>
<h2>Share your thoughts</h2>
<ul>
<li>Report bugs or UX issues on the <a href="${REACTPRESS_GITHUB}/issues" rel="noopener noreferrer">GitHub issue tracker</a>.</li>
<li>Suggest features for the CLI, admin console, or theme toolkit.</li>
<li>Share deployment guides for platforms beyond Vercel.</li>
<li>Tell us which documentation topics need clearer examples.</li>
</ul>
<h2>Contributing</h2>
<p>ReactPress is open source under the MIT license. Fork the repository, run <code>pnpm install</code> and <code>pnpm run dev</code>, and open a pull request. Meaningful contributions are credited in the README.</p>
<h2>Related reading</h2>
<ul>
<li><a href="/article/what-is-reactpress/">ReactPress Technical Architecture</a></li>
<li><a href="/article/quick-start/">Quick Start with ReactPress</a></li>
<li><a href="${REACTPRESS_SITE}" rel="noopener noreferrer">Official documentation</a></li>
<li><a href="${REACTPRESS_GITHUB}" rel="noopener noreferrer">GitHub repository</a></li>
</ul>
`.trim()

export const mockArticles = [
  {
    id: 'what-is-reactpress',
    title: 'ReactPress Technical Architecture',
    summary:
      'CLI, NestJS API, MySQL, admin console, and headless themes — how ReactPress splits content management from presentation.',
    content: whatIsReactPressHtml.replace(/<[^>]+>/g, ' '),
    html: whatIsReactPressHtml,
    toc: '',
    cover: mockImages.logo,
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
    cover: mockImages.logo,
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
    title: 'ReactPress Architecture in Detail',
    summary:
      'Request flow from admin to REST API to Theme Starter SSR — monorepo packages and headless mode explained.',
    content: platformCapabilitiesHtml.replace(/<[^>]+>/g, ' '),
    html: platformCapabilitiesHtml,
    toc: '',
    cover: mockImages.logoFull,
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
    cover: mockImages.icon,
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
    cover: mockImages.icon,
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
    title: 'ReactPress Theme Starter Guide',
    summary:
      'Official headless visitor theme — App Router, toolkit integration, theme.json, mock mode, and Vercel deployment.',
    content: themeStarterHtml.replace(/<[^>]+>/g, ' '),
    html: themeStarterHtml,
    toc: '',
    cover: mockImages.logoFull,
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
    cover: mockImages.logoFull,
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
    cover: mockImages.logo,
    summary: 'Commands for init, dev, doctor, status, build, and start.',
    content: 'ReactPress CLI overview for developers.',
    html: `${mockFigure(mockImages.logo, 'ReactPress CLI quick start', 'Global install, init, and dev')}<p>Install <code>@fecommunity/reactpress@3</code> globally and use the interactive menu or run commands directly from your terminal.</p><pre><code>npm i -g @fecommunity/reactpress@3
reactpress init
reactpress dev</code></pre><p><img src="${mockImages.logo}" alt="ReactPress logo" width="160" loading="lazy" /></p>`,
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
    cover: mockImages.logoFull,
    summary: 'Articles, pages, settings, categories, tags, and media via JSON API.',
    content: 'Core API endpoints for theme and integration developers.',
    html: `${mockFigure(mockImages.logoFull, 'ReactPress REST API in the architecture', 'NestJS exposes JSON resources consumed by Theme Starter')}<p>The API runs on port <strong>3002</strong> by default. Health check: <code>GET /api/health</code>. All responses use the <code>{ success, data }</code> envelope consumed by <code>@fecommunity/reactpress-toolkit</code>.</p><table><thead><tr><th>Resource</th><th>Theme Starter usage</th></tr></thead><tbody><tr><td>Articles</td><td><code>app/article/[id]</code> SSR detail pages</td></tr><tr><td>Pages</td><td><code>app/page/[id]</code> custom CMS pages</td></tr><tr><td>Settings</td><td>Site title, SEO, navigation via providers</td></tr></tbody></table><p>See <a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a> for full API reference.</p>`,
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
    cover: mockImages.logoFull,
    summary: 'Build visitor sites with theme.json, App Router, and the toolkit.',
    content: 'Guide to building custom ReactPress themes.',
    html: `${mockFigure(mockImages.logoFull, 'ReactPress Theme Starter', 'Official headless visitor theme for ReactPress')}<p>Start from <a href="${THEME_STARTER_GITHUB}">reactpress-theme-starter</a>. Map routes in <code>theme.json</code> templates and fetch content via <code>themeApi</code> during SSR.</p><ul><li><code>pnpm dev:mock</code> — offline preview with built-in mock API</li><li><code>pnpm dev</code> — connect to a live ReactPress instance</li><li><code>pnpm build:mock</code> — CI-friendly production build</li></ul><p>Docs: <a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a></p>`,
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
    cover: mockImages.logo,
    summary: 'CLI, API, and theme development essentials for ReactPress.',
    content: 'ReactPress handbook overview.',
    html: `${mockFigure(mockImages.logo, 'ReactPress Handbook', 'Architecture, API, and Theme Starter essentials')}<p>Everything you need to publish with ReactPress — from <code>reactpress init</code> to headless Theme Starter deployment. Official site: <a href="${REACTPRESS_SITE}" rel="noopener noreferrer">reactpress.surge.sh</a></p>`,
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
