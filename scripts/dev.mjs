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

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const ERROR_MESSAGES = {
  REMOTE_DEFAULT_REQUIRED:
    'remote 需配合 URL：使用 --remote-origin 或为 REACTPRESS_DEV_REMOTE_ORIGIN 填写地址',
  INVALID_ORIGIN: '无效的 API 地址，请使用域名或完整 URL（如 api.yoursite.com）',
}

function parseArgs(argv) {
  const result = {
    port: 3001,
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
      result.port = Number(argv[++i]) || 3001
      continue
    }
    if (arg.startsWith('--port=')) {
      result.port = Number(arg.slice('--port='.length)) || 3001
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
    'http://localhost:3002/api'
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
      console.error('[dev] --remote-origin 需要填写地址（如 api.yoursite.com）')
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

function buildChildEnv(apiEnv) {
  return {
    ...process.env,
    INIT_CWD: projectRoot,
    REACTPRESS_ORIGINAL_CWD: projectRoot,
    SERVER_API_URL: apiEnv.serverApiUrl,
    REACTPRESS_API_URL: apiEnv.serverApiUrl,
    NEXT_PUBLIC_REACTPRESS_API_URL: apiEnv.publicApiUrl,
    NEXT_TELEMETRY_DISABLED: '1',
  }
}

function printBanner(apiEnv, port) {
  console.log('')
  console.log('  ReactPress Theme Dev')
  console.log(`  Local:  http://localhost:${port}`)
  if (apiEnv.remoteOrigin) {
    console.log(`  API:    ${apiEnv.serverApiUrl} (remote: ${apiEnv.remoteOrigin})`)
  } else {
    console.log(`  API:    ${apiEnv.serverApiUrl} (local)`)
  }
  console.log('')
}

function main() {
  const cli = parseArgs(process.argv.slice(2))
  const apiEnv = resolveThemeApiEnv(cli)
  const childEnv = buildChildEnv(apiEnv)

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
