/** App/runtime helpers — values are injected via next.config `env` when possible. */
import { DEFAULT_LOCAL_ADMIN, DEFAULT_LOCAL_SITE } from '../../scripts/resolve-api-env.mjs'

export {
  DEFAULT_LOCAL_ADMIN,
  DEFAULT_LOCAL_API,
  DEFAULT_LOCAL_SITE,
} from '../../scripts/resolve-api-env.mjs'

export function getClientSiteUrl(): string {
  return (process.env.CLIENT_SITE_URL || DEFAULT_LOCAL_SITE).replace(/\/$/, '')
}

export function getAdminBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_REACTPRESS_ADMIN_URL?.trim()
  if (configured) return configured.replace(/\/$/, '')
  return DEFAULT_LOCAL_ADMIN
}

export function getApiPreconnectOrigin(): string | null {
  const api =
    process.env.REACTPRESS_API_URL?.trim() ||
    process.env.SERVER_API_URL?.trim() ||
    process.env.NEXT_PUBLIC_REACTPRESS_API_URL?.trim()

  if (!api || api.startsWith('/')) return null

  const origin = api.replace(/\/api\/?$/, '')
  if (/localhost|127\.0\.0\.1/i.test(origin)) return null
  return origin
}
