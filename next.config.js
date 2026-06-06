const path = require('path')
const { config } = require('@fecommunity/reactpress-toolkit/config')
const {
  resolveThemeApiEnv,
  resolveApiRewriteOrigin,
  resolveClientSiteUrl,
  isLocalhostUrl,
} = require('./scripts/resolve-api-env.mjs')

// App Router (Next 15): do not use createReactPressNextConfig's react webpack alias —
// it conflicts with Next's compiled React and causes SSR "useContext" null errors.
// Server code imports `@fecommunity/reactpress-toolkit/theme/server` (no UI barrel).

const themeApiEnv = resolveThemeApiEnv()

function resolveUploadRewriteOrigin() {
  if (process.env.REACTPRESS_MOCK_API === '1') {
    const site = resolveClientSiteUrl()
    if (site && !isLocalhostUrl(site)) return site
  }
  return resolveApiRewriteOrigin(themeApiEnv)
}

const uploadRewriteOrigin = resolveUploadRewriteOrigin()

/** Only inline browser-safe env — server API URLs must stay runtime on Vercel. */
const publicThemeEnv = {
  NEXT_PUBLIC_REACTPRESS_API_URL: themeApiEnv.NEXT_PUBLIC_REACTPRESS_API_URL,
  NEXT_PUBLIC_REACTPRESS_ADMIN_URL: themeApiEnv.NEXT_PUBLIC_REACTPRESS_ADMIN_URL,
  CLIENT_SITE_URL: themeApiEnv.CLIENT_SITE_URL,
}

const basePath = process.env.BASE_PATH || undefined
const output = process.env.EXPORT ? 'export' : undefined

/** @type {import('next').NextConfig} */
module.exports = {
  output,
  basePath,
  distDir: process.env.NEXT_DIST_DIR || '.next',
  outputFileTracingRoot: path.join(__dirname),
  ...(config.CLIENT_ASSET_PREFIX ? { assetPrefix: config.CLIENT_ASSET_PREFIX } : {}),
  poweredByHeader: false,
  reactStrictMode: true,
  trailingSlash: true,
  skipTrailingSlashRedirect: true,
  transpilePackages: ['@fecommunity/reactpress-toolkit'],
  experimental: {
    optimizePackageImports: [
      '@fecommunity/reactpress-toolkit',
      '@fecommunity/reactpress-toolkit/ui',
    ],
    // Avoid SegmentViewNode manifest corruption in dev (Next 15.5+).
    devtoolSegmentExplorer: false,
  },
  eslint: { ignoreDuringBuilds: process.env.ENFORCE_ESLINT === '1' ? false : true },
  typescript: { ignoreBuildErrors: process.env.ENFORCE_TYPECHECK === '1' ? false : true },
  env: {
    ...publicThemeEnv,
  },
  images: {
    remotePatterns: [
      { protocol: 'http', hostname: 'localhost' },
      { protocol: 'https', hostname: '**' },
    ],
    unoptimized: process.env.UNOPTIMIZED ? true : undefined,
  },
  webpack: (webpackConfig) => {
    webpackConfig.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    })
    return webpackConfig
  },
  async rewrites() {
    return [{ source: '/uploads/:path*', destination: `${uploadRewriteOrigin}/uploads/:path*` }]
  },
  async redirects() {
    return [
      { source: '/blog', destination: '/', permanent: true },
      { source: '/blog/', destination: '/', permanent: true },
      { source: '/tags/:tag', destination: '/tag/:tag', permanent: true },
      { source: '/tags/:tag/page/:page', destination: '/tag/:tag', permanent: true },
      { source: '/page/suggestions', destination: '/suggestions', permanent: true },
      { source: '/page/suggestions/', destination: '/suggestions/', permanent: true },
      { source: '/nav', destination: '/search', permanent: true },
      { source: '/nav/', destination: '/search/', permanent: true },
    ]
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
        ],
      },
    ]
  },
}
