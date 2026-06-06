/**
 * Resolve ReactPress API URLs for Next.js build / Vercel runtime.
 * Keeps SSR (REACTPRESS_API_URL) and browser (NEXT_PUBLIC_*) in sync.
 */
const DEFAULT_LOCAL_API = 'http://localhost:3002/api'
/** Public demo API used when Vercel deploy has no env configured. */
const DEFAULT_VERCEL_DEMO_API = 'https://reactpress-theme-starter.vercel.app/api'

function trimApiUrl(value) {
  if (typeof value !== 'string') return ''
  return value.trim().replace(/\/$/, '')
}

function isLocalhostApi(url) {
  return /localhost|127\.0\.0\.1/i.test(url)
}

function toApiBase(origin) {
  const base = trimApiUrl(origin)
  if (!base) return ''
  return /\/api$/i.test(base) ? base : `${base}/api`
}

/**
 * @param {NodeJS.ProcessEnv} [processEnv]
 */
export function resolveThemeApiEnv(processEnv = process.env) {
  const explicitServer =
    trimApiUrl(processEnv.REACTPRESS_API_URL) || trimApiUrl(processEnv.SERVER_API_URL)
  const explicitPublic = trimApiUrl(processEnv.NEXT_PUBLIC_REACTPRESS_API_URL)
  const remoteApi = toApiBase(processEnv.REACTPRESS_DEV_REMOTE_ORIGIN)

  let serverApi = explicitServer || explicitPublic || remoteApi || DEFAULT_LOCAL_API

  if (processEnv.VERCEL === '1' && isLocalhostApi(serverApi)) {
    serverApi = DEFAULT_VERCEL_DEMO_API
  }

  let publicApi = explicitPublic
  if (!publicApi) {
    if (processEnv.NODE_ENV === 'production' && !isLocalhostApi(serverApi)) {
      publicApi = '/api'
    } else {
      publicApi = serverApi
    }
  }

  const nginxEntry = trimApiUrl(processEnv.REACTPRESS_NGINX_ENTRY_URL || processEnv.NGINX_ENTRY_URL)
  const adminUrl =
    trimApiUrl(processEnv.NEXT_PUBLIC_REACTPRESS_ADMIN_URL) ||
    (nginxEntry ? `${nginxEntry}/admin` : 'http://localhost:3000')

  return {
    SERVER_API_URL: serverApi,
    REACTPRESS_API_URL: serverApi,
    NEXT_PUBLIC_REACTPRESS_API_URL: publicApi,
    NEXT_PUBLIC_REACTPRESS_ADMIN_URL: adminUrl,
  }
}

/**
 * @param {ReturnType<typeof resolveThemeApiEnv>} apiEnv
 */
export function resolveApiRewriteOrigin(apiEnv) {
  return apiEnv.SERVER_API_URL.replace(/\/api\/?$/, '')
}
