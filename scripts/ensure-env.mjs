#!/usr/bin/env node
/**
 * Ensure a `.env` file exists for @fecommunity/reactpress-toolkit/config (requires on-disk env).
 * Copies from `.env.example` when missing; optionally merges overrides from CI / Vercel / mock build.
 */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const MERGE_KEYS = [
  'REACTPRESS_API_URL',
  'SERVER_API_URL',
  'NEXT_PUBLIC_REACTPRESS_API_URL',
  'CLIENT_SITE_URL',
  'BASE_PATH',
  'REACTPRESS_MOCK_API',
  'NEXT_PUBLIC_REACTPRESS_ADMIN_URL',
  'REACTPRESS_DEV_REMOTE_ORIGIN',
]

const FALLBACK_ENV = `# Auto-generated for CI / Vercel mock build
REACTPRESS_API_URL=http://localhost:3002/api
NEXT_PUBLIC_REACTPRESS_API_URL=http://localhost:3002/api
CLIENT_SITE_URL=http://localhost:3001
`

function readBaseContent(envPath, examplePath) {
  if (fs.existsSync(envPath)) {
    return fs.readFileSync(envPath, 'utf8')
  }
  if (fs.existsSync(examplePath)) {
    return fs.readFileSync(examplePath, 'utf8')
  }
  return FALLBACK_ENV
}

function upsertEnvLine(lines, key, value) {
  const entry = `${key}=${value}`
  const index = lines.findIndex((line) => {
    const trimmed = line.trim()
    return trimmed && !trimmed.startsWith('#') && trimmed.startsWith(`${key}=`)
  })

  if (index >= 0) {
    lines[index] = entry
  } else {
    lines.push(entry)
  }
}

/**
 * @param {string} [root]
 * @param {{ onlyIfMissing?: boolean, overrides?: Record<string, string | undefined> }} [options]
 */
export function ensureEnvFile(root = projectRoot, options = {}) {
  const { onlyIfMissing = false, overrides = {} } = options
  const envPath = path.join(root, '.env')
  const examplePath = path.join(root, '.env.example')

  if (onlyIfMissing && fs.existsSync(envPath)) {
    return envPath
  }

  const lines = readBaseContent(envPath, examplePath)
    .split('\n')
    .filter((line, index, all) => !(index === all.length - 1 && line === ''))

  for (const key of MERGE_KEYS) {
    const override = overrides[key]?.trim()
    if (override) {
      upsertEnvLine(lines, key, override)
      continue
    }

    if (onlyIfMissing) continue

    const fromProcess = process.env[key]?.trim()
    if (fromProcess) {
      upsertEnvLine(lines, key, fromProcess)
    }
  }

  const nextContent = `${lines.join('\n').trimEnd()}\n`
  if (!fs.existsSync(envPath) || fs.readFileSync(envPath, 'utf8') !== nextContent) {
    fs.writeFileSync(envPath, nextContent)
    console.log(`[ensure-env] wrote ${envPath}`)
  }

  return envPath
}

const isDirectRun = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)

if (isDirectRun) {
  ensureEnvFile(projectRoot, { onlyIfMissing: true })
}
