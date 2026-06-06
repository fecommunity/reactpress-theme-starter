#!/usr/bin/env node
/**
 * Production build against the in-process mock API (same data as `pnpm dev:mock`).
 *
 * Used by Vercel and CI: start `next dev` with mock routes, wait until ready,
 * then run `next build` so SSR/ISR prefetch uses mock data instead of a remote API.
 */
import { spawn } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '..')

const MOCK_PORT = Number(process.env.REACTPRESS_MOCK_BUILD_PORT) || 3010
const MOCK_HOST = process.env.REACTPRESS_MOCK_BUILD_HOST || '127.0.0.1'
const MOCK_API = `http://${MOCK_HOST}:${MOCK_PORT}/api`
const DEV_DIST_DIR = process.env.NEXT_DIST_DIR || '.next-dev'

function run(command, args, env = process.env) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: projectRoot,
      env,
      stdio: 'inherit',
      shell: process.platform === 'win32',
    })

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) resolve()
      else reject(new Error(`${command} exited with code ${code ?? signal}`))
    })
  })
}

async function waitForMockApi() {
  const healthUrl = `${MOCK_API}/setting/get`
  const maxAttempts = 90

  for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
    try {
      const response = await fetch(healthUrl, { method: 'POST' })
      if (response.ok) {
        console.log(`[build:mock] Mock API ready at ${MOCK_API}`)
        return
      }
    } catch {
      // dev server still starting
    }

    await new Promise((resolve) => setTimeout(resolve, 1000))
  }

  throw new Error(`Mock API failed to start at ${MOCK_API}`)
}

async function main() {
  const devEnv = {
    ...process.env,
    INIT_CWD: projectRoot,
    REACTPRESS_ORIGINAL_CWD: projectRoot,
    NEXT_DIST_DIR: DEV_DIST_DIR,
    REACTPRESS_MOCK_API: '1',
    REACTPRESS_API_URL: MOCK_API,
    SERVER_API_URL: MOCK_API,
    NEXT_PUBLIC_REACTPRESS_API_URL: MOCK_API,
    NEXT_TELEMETRY_DISABLED: '1',
  }

  console.log(`[build:mock] Starting mock dev server on ${MOCK_HOST}:${MOCK_PORT}`)
  const devProcess = spawn(
    'pnpm',
    ['exec', 'next', 'dev', '-p', String(MOCK_PORT), '-H', MOCK_HOST],
    {
      cwd: projectRoot,
      env: devEnv,
      stdio: 'inherit',
      shell: process.platform === 'win32',
      detached: process.platform !== 'win32',
    }
  )

  const stopDev = () => {
    if (devProcess.killed) return
    if (process.platform === 'win32') {
      devProcess.kill()
      return
    }
    try {
      process.kill(-devProcess.pid, 'SIGTERM')
    } catch {
      devProcess.kill('SIGTERM')
    }
  }

  process.on('SIGINT', stopDev)
  process.on('SIGTERM', stopDev)

  try {
    await waitForMockApi()

    const buildEnv = {
      ...process.env,
      INIT_CWD: projectRoot,
      REACTPRESS_MOCK_API: '1',
      REACTPRESS_API_URL: MOCK_API,
      SERVER_API_URL: MOCK_API,
      NEXT_PUBLIC_REACTPRESS_API_URL: MOCK_API,
    }

    console.log('[build:mock] Running production build')
    await run('pnpm', ['exec', 'next', 'build'], buildEnv)
  } finally {
    stopDev()
  }
}

main().catch((error) => {
  console.error('[build:mock]', error.message || error)
  process.exit(1)
})
