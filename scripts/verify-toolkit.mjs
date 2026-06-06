#!/usr/bin/env node
/**
 * Verify installed @fecommunity/reactpress-toolkit includes theme/* exports (3.1.0+).
 */
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)

const REQUIRED = [
  '@fecommunity/reactpress-toolkit/theme/server',
  '@fecommunity/reactpress-toolkit/theme/next-config',
  '@fecommunity/reactpress-toolkit/ui',
]

const missing = REQUIRED.filter((spec) => {
  try {
    require.resolve(spec)
    return false
  } catch {
    return true
  }
})

if (missing.length === 0) {
  console.log('[toolkit] theme/* exports OK')
  process.exit(0)
}

console.error(`[toolkit] @fecommunity/reactpress-toolkit 缺少 theme/* 导出，请升级到 3.1.0+：

  pnpm add @fecommunity/reactpress-toolkit@^3.1.0

缺失路径：
${missing.map((item) => `  - ${item}`).join('\n')}
`)

process.exit(1)
