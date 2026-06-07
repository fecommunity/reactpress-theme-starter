#!/usr/bin/env node
/**
 * Theme dev server with optional remote ReactPress API.
 *
 * Examples:
 *   pnpm dev
 *   pnpm dev -- --remote-origin api.yoursite.com
 *   pnpm dev -- --remote-origin https://api.example.com --port 3001
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  applyDevApiOriginsToEnv,
  normalizeRemoteOrigin,
  readDevClientApiOrigin,
  resolveDevApiOrigins,
  resolveRemoteThemeApiBase,
} from './remote-dev.mjs'
import {
  DEFAULT_LOCAL_API,
  DEFAULT_THEME_DEV_PORT,
  resolveThemeApiEnv as resolveProjectApiEnv,
} from './resolve-api-env.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const ERROR_MESSAGES = {
  REMOTE_DEFAULT_REQUIRED:
    'remote mode requires a URL: pass --remote-origin or set REACTPRESS_DEV_REMOTE_ORIGIN',
  INVALID_ORIGIN: 'Invalid API origin — use a hostname or full URL (e.g. api.yoursite.com)',
}

function parseArgs(argv) {
  const result = {
    port: DEFAULT_THEME_DEV_PORT,
    remoteOrigin: undefined,
    adminOrigin: undefined,
    clientOrigin: undefined,
    passthrough: [],
  }

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i]

    if (arg === '--remote-origin') {
      result.remoteOrigin = argv[++i]
      continue
    }
    if (arg.startsWith('--remote-origin=')) {
      result.remoteOrigin = arg.slice('--remote-origin='.length)
      continue
    }
    if (arg === '--admin-origin') {
      result.adminOrigin = argv[++i]
      continue
    }
    if (arg.startsWith('--admin-origin=')) {
      result.adminOrigin = arg.slice('--admin-origin='.length)
      continue
    }
    if (arg === '--client-origin') {
      result.clientOrigin = argv[++i]
      continue
    }
    if (arg.startsWith('--client-origin=')) {
      result.clientOrigin = arg.slice('--client-origin='.length)
      continue
    }
    if (arg === '-p' || arg === '--port') {
      result.port = Number(argv[++i]) || DEFAULT_THEME_DEV_PORT
      continue
    }
    if (arg.startsWith('--port=')) {
      result.port = Number(arg.slice('--port='.length)) || DEFAULT_THEME_DEV_PORT
      continue
    }

    result.passthrough.push(arg)
  }

  return result
}

function readLocalApiUrl() {
  const fromEnv =
    process.env.REACTPRESS_API_URL?.trim() ||
    process.env.SERVER_API_URL?.trim() ||
    DEFAULT_LOCAL_API
  return fromEnv.replace(/\/$/, '')
}

function resolveThemeApiEnv(cli) {
  const hasOriginFlag =
    cli.remoteOrigin !== undefined ||
    cli.adminOrigin !== undefined ||
    cli.clientOrigin !== undefined

  if (hasOriginFlag) {
    const resolved = resolveDevApiOrigins(projectRoot, {
      remoteOrigin: cli.remoteOrigin,
      adminOrigin: cli.adminOrigin,
      clientOrigin: cli.clientOrigin,
    })

    if (resolved.error) {
      console.error(`[dev] ${ERROR_MESSAGES[resolved.error] || resolved.error}`)
      process.exit(1)
    }

    if (
      cli.remoteOrigin !== undefined &&
      !resolved.remoteDefault &&
      cli.adminOrigin === undefined &&
      cli.clientOrigin === undefined
    ) {
      console.error('[dev] --remote-origin requires a hostname (e.g. api.yoursite.com)')
      process.exit(1)
    }

    applyDevApiOriginsToEnv(resolved)

    const remoteClient =
      resolved.client ||
      (cli.remoteOrigin !== undefined && resolved.remoteDefault ? resolved.remoteDefault : null)

    if (remoteClient) {
      const apiBase = resolveRemoteThemeApiBase(remoteClient)
      return {
        serverApiUrl: apiBase,
        publicApiUrl: apiBase,
        remoteOrigin: normalizeRemoteOrigin(remoteClient),
      }
    }
  }

  const envClient = readDevClientApiOrigin(projectRoot)
  if (envClient) {
    const apiBase = resolveRemoteThemeApiBase(envClient)
    return {
      serverApiUrl: apiBase,
      publicApiUrl: apiBase,
      remoteOrigin: normalizeRemoteOrigin(envClient),
    }
  }

  const local = readLocalApiUrl()
  const publicApi = process.env.NEXT_PUBLIC_REACTPRESS_API_URL?.trim()?.replace(/\/$/, '') || local

  return {
    serverApiUrl: local,
    publicApiUrl: publicApi,
    remoteOrigin: null,
  }
}

function buildChildEnv(apiEnv, port) {
  const projectEnv = resolveProjectApiEnv()
  const mockEnabled = process.env.REACTPRESS_MOCK_API === '1'
  const localMockApi = `http://localhost:${port}/api`
  const serverApiUrl = mockEnabled ? localMockApi : apiEnv.serverApiUrl
  const publicApiUrl = mockEnabled ? '/api' : apiEnv.publicApiUrl

  return {
    ...process.env,
    INIT_CWD: projectRoot,
    REACTPRESS_ORIGINAL_CWD: projectRoot,
    SERVER_API_URL: serverApiUrl,
    REACTPRESS_API_URL: serverApiUrl,
    NEXT_PUBLIC_REACTPRESS_API_URL: publicApiUrl,
    NEXT_PUBLIC_REACTPRESS_ADMIN_URL: projectEnv.NEXT_PUBLIC_REACTPRESS_ADMIN_URL,
    CLIENT_SITE_URL: projectEnv.CLIENT_SITE_URL,
    REACTPRESS_MOCK_API: mockEnabled ? '1' : '',
    NEXT_TELEMETRY_DISABLED: '1',
  }
}

function printBanner(apiEnv, port) {
  const mockEnabled = process.env.REACTPRESS_MOCK_API === '1'
  console.log('')
  console.log('  ReactPress Theme Dev')
  console.log(`  Local:  http://localhost:${port}`)
  if (mockEnabled) {
    console.log(`  API:    /api (mock routes, same-origin in browser)`)
  } else if (apiEnv.remoteOrigin) {
    console.log(`  API:    ${apiEnv.serverApiUrl} (remote: ${apiEnv.remoteOrigin})`)
  } else {
    console.log(`  API:    ${apiEnv.serverApiUrl} (local)`)
  }
  console.log('')
}

function main() {
  const cli = parseArgs(process.argv.slice(2))
  const apiEnv = resolveThemeApiEnv(cli)
  const childEnv = buildChildEnv(apiEnv, cli.port)

  printBanner(apiEnv, cli.port)

  const nextBin = path.join(projectRoot, 'node_modules', 'next', 'dist', 'bin', 'next')
  const child = spawn(
    process.execPath,
    [nextBin, 'dev', '-p', String(cli.port), ...cli.passthrough],
    {
      cwd: projectRoot,
      env: childEnv,
      stdio: 'inherit',
    }
  )

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal)
      return
    }
    process.exit(code ?? 0)
  })
}

main()
