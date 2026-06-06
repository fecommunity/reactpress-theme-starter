/**
 * Single source of truth for ReactPress theme URL resolution (build, dev, Vercel).
 */
export const DEFAULT_LOCAL_API = 'http://localhost:3002/api'
export const DEFAULT_LOCAL_SITE = 'http://localhost:3001'
export const DEFAULT_LOCAL_ADMIN = 'http://localhost:3000'
export const DEFAULT_THEME_DEV_PORT = 3001
/** Public demo API when Vercel deploy has no env configured. */
export const DEFAULT_VERCEL_DEMO_API = 'https://reactpress-theme-starter.vercel.app/api'
export const DEFAULT_VERCEL_DEMO_SITE = 'https://reactpress-theme-starter.vercel.app'

function trimUrl(value) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\/$/, '')
}

function trimApiUrl(value) {
  return trimUrl(value)
}

export function isLocalhostUrl(url) {
  return /localhost|127\.0\.0\.1/i.test(url)
}

function toApiBase(origin) {
  const base = trimApiUrl(origin)
  if (!base) return ''
  return /\/api$/i.test(base) ? base : `${base}/api`
}

function apiOriginFromBase(serverApi) {
  return serverApi.replace(/\/api\/?$/, '')
}

/**
 * @param {NodeJS.ProcessEnv} [processEnv]
 */
export function resolveClientSiteUrl(processEnv = process.env) {
  const explicit = trimUrl(processEnv.CLIENT_SITE_URL)
  if (explicit) return explicit

  const vercelUrl = trimUrl(processEnv.VERCEL_URL)
  if (vercelUrl) {
    return (vercelUrl.startsWith('http') ? vercelUrl : `https://${vercelUrl}`).replace(/\/$/, '')
  }

  if (processEnv.VERCEL === '1') {
    return DEFAULT_VERCEL_DEMO_SITE
  }

  return DEFAULT_LOCAL_SITE
}

/**
 * @param {NodeJS.ProcessEnv} [processEnv]
 */
export function resolveThemeApiEnv(processEnv = process.env) {
  const mockEnabled = processEnv.REACTPRESS_MOCK_API === '1'
  const explicitServer =
    trimApiUrl(processEnv.REACTPRESS_API_URL) || trimApiUrl(processEnv.SERVER_API_URL)
  const explicitPublic = trimApiUrl(processEnv.NEXT_PUBLIC_REACTPRESS_API_URL)
  const remoteApi = toApiBase(processEnv.REACTPRESS_DEV_REMOTE_ORIGIN)

  let serverApi = explicitServer || explicitPublic || remoteApi || DEFAULT_LOCAL_API

  // Vercel runtime: SSR should call this deployment's /api mock route handler.
  if (mockEnabled && processEnv.VERCEL === '1' && !explicitServer) {
    serverApi = `${resolveClientSiteUrl(processEnv)}/api`
  }

  if (processEnv.VERCEL === '1' && isLocalhostUrl(serverApi) && !mockEnabled) {
    serverApi = DEFAULT_VERCEL_DEMO_API
  }

  let publicApi = explicitPublic
  if (mockEnabled) {
    publicApi = explicitPublic || '/api'
  } else if (!publicApi) {
    if (processEnv.NODE_ENV === 'production' && !isLocalhostUrl(serverApi)) {
      publicApi = '/api'
    } else {
      publicApi = serverApi
    }
  }

  const nginxEntry = trimUrl(processEnv.REACTPRESS_NGINX_ENTRY_URL || processEnv.NGINX_ENTRY_URL)
  let adminUrl =
    trimUrl(processEnv.NEXT_PUBLIC_REACTPRESS_ADMIN_URL) ||
    (nginxEntry ? `${nginxEntry}/admin` : DEFAULT_LOCAL_ADMIN)

  if (processEnv.VERCEL === '1' && isLocalhostUrl(adminUrl) && !isLocalhostUrl(serverApi)) {
    adminUrl = `${apiOriginFromBase(serverApi)}/admin`
  }

  return {
    SERVER_API_URL: serverApi,
    REACTPRESS_API_URL: serverApi,
    NEXT_PUBLIC_REACTPRESS_API_URL: publicApi,
    NEXT_PUBLIC_REACTPRESS_ADMIN_URL: adminUrl,
    CLIENT_SITE_URL: resolveClientSiteUrl(processEnv),
  }
}

/**
 * @param {ReturnType<typeof resolveThemeApiEnv>} apiEnv
 */
export function resolveApiRewriteOrigin(apiEnv) {
  return apiOriginFromBase(apiEnv.SERVER_API_URL)
}

/**
 * @param {NodeJS.ProcessEnv} [processEnv]
 */
export function resolveApiPreconnectOrigin(processEnv = process.env) {
  const apiEnv = resolveThemeApiEnv(processEnv)
  const origin = resolveApiRewriteOrigin(apiEnv)
  if (!origin.startsWith('http') || isLocalhostUrl(origin)) return null
  return origin
}
