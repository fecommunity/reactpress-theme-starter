#!/usr/bin/env node
/**
 * Smoke-test all theme routes against a running dev:mock server.
 * Usage: node scripts/smoke-pages.mjs [baseUrl]
 */
const base = (process.argv[2] || 'http://127.0.0.1:3040').replace(/\/$/, '')

const pages = [
  ['/', 200],
  ['/article/hello-world/', 200],
  ['/article/theme-starter-guide/', 200],
  ['/article/headless-architecture/', 200],
  ['/article/deploy-vercel/', 200],
  ['/article/toolkit-guide/', 200],
  ['/article/isr-caching/', 200],
  ['/category/getting-started/', 200],
  ['/category/theme-development/', 200],
  ['/category/deployment/', 200],
  ['/tag/reactpress/', 200],
  ['/tag/nextjs/', 200],
  ['/tags/', 200],
  ['/archives/', 200],
  ['/search/', 200],
  ['/search/?keyword=reactpress', 200],
  ['/suggestions/', 200],
  ['/knowledge/', 200],
  ['/knowledge/reactpress-docs/', 200],
  ['/knowledge/reactpress-docs/api-overview/', 200],
  ['/knowledge/reactpress-docs/theme-manifest/', 200],
  ['/login/', 200],
  ['/nav/example.com/', 200],
  ['/this-page-does-not-exist/', 404],
  ['/rss/', 200],
  ['/sitemap.xml', 200],
  ['/robots.txt', 200],
]

const apis = [
  ['POST', '/api/setting/get'],
  ['POST', '/api/view'],
  ['GET', '/api/article'],
  ['GET', '/api/article/hello-world'],
  ['POST', '/api/article/hello-world/views'],
  ['GET', '/api/article/recommend?pageSize=15'],
  ['GET', '/api/category'],
  ['GET', '/api/tag'],
  ['GET', '/api/page'],
  ['GET', '/api/page/suggestions'],
  ['POST', '/api/page/suggestions/views'],
  ['GET', '/api/knowledge'],
  ['GET', '/api/Knowledge/reactpress-docs'],
  ['GET', '/api/Knowledge/api-overview'],
  ['GET', '/api/search/article?keyword=reactpress'],
  ['GET', '/api/comment/host/hello-world'],
  ['POST', '/api/knowledge/reactpress-docs/views'],
]

async function checkPage(path, expected) {
  const res = await fetch(`${base}${path}`, { redirect: 'follow' })
  const ok = res.status === expected
  return { ok, status: res.status, path, expected }
}

async function checkApi(method, path) {
  const res = await fetch(`${base}${path}`, {
    method,
    headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
    body: method === 'POST' ? '{}' : undefined,
  })
  let json = null
  try {
    json = await res.json()
  } catch {
    // non-json routes like robots.txt tested separately
  }
  const ok = res.ok && (json === null || json.success !== false)
  return { ok, status: res.status, method, path, success: json?.success }
}

async function main() {
  let failed = 0

  console.log(`Smoke testing ${base}\n`)

  console.log('--- Pages ---')
  for (const [path, expected] of pages) {
    const result = await checkPage(path, expected)
    const mark = result.ok ? 'OK' : 'FAIL'
    if (!result.ok) failed += 1
    console.log(`${mark} ${result.status} (expected ${expected}) ${path}`)
  }

  console.log('\n--- APIs ---')
  for (const [method, path] of apis) {
    const result = await checkApi(method, path)
    const mark = result.ok ? 'OK' : 'FAIL'
    if (!result.ok) failed += 1
    console.log(`${mark} ${result.status} ${method} ${path}`)
  }

  if (failed) {
    console.log(`\n${failed} check(s) failed`)
    process.exit(1)
  }

  console.log('\nAll checks passed')
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
