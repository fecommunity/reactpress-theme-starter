#!/usr/bin/env node
/**
 * Production server with in-process mock API (after `pnpm build:mock`).
 *
 * Usage:
 *   pnpm build:mock && pnpm start:mock
 *   pnpm start:mock -- --port 3002
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { DEFAULT_THEME_DEV_PORT } from './resolve-api-env.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

function parseArgs(argv) {
  let port = DEFAULT_THEME_DEV_PORT
  const passthrough = []

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]
    if (arg === '-p' || arg === '--port') {
      port = Number(argv[++i]) || DEFAULT_THEME_DEV_PORT
      continue
    }
    if (arg.startsWith('--port=')) {
      port = Number(arg.slice('--port='.length)) || DEFAULT_THEME_DEV_PORT
      continue
    }
    passthrough.push(arg)
  }

  return { port, passthrough }
}

function buildEnv(port) {
  const siteUrl = (process.env.CLIENT_SITE_URL || `http://localhost:${port}`).replace(/\/$/, '')
  const serverApiUrl = `http://localhost:${port}/api`

  return {
    ...process.env,
    INIT_CWD: projectRoot,
    REACTPRESS_ORIGINAL_CWD: projectRoot,
    REACTPRESS_MOCK_API: '1',
    SERVER_API_URL: serverApiUrl,
    REACTPRESS_API_URL: serverApiUrl,
    NEXT_PUBLIC_REACTPRESS_API_URL: '/api',
    CLIENT_SITE_URL: siteUrl,
    NEXT_TELEMETRY_DISABLED: '1',
  }
}

function main() {
  const { port, passthrough } = parseArgs(process.argv.slice(2))
  const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next')

  console.log('')
  console.log('  ReactPress Theme (production + mock API)')
  console.log(`  Local:  http://localhost:${port}`)
  console.log(`  API:    /api (mock routes, same-origin in browser)`)
  console.log('')

  const child = spawn(process.execPath, [nextBin, 'start', '-p', String(port), ...passthrough], {
    cwd: projectRoot,
    env: buildEnv(port),
    stdio: 'inherit',
  })

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }
    process.exit(code ?? 0)
  })
}

main()
