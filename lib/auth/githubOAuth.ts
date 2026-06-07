const BASE_PATH = (process.env.BASE_PATH || '').replace(/\/$/, '')

export function resolveGithubCallbackUrl(from = '/'): string {
  if (typeof window === 'undefined') {
    const site = (process.env.CLIENT_SITE_URL || 'http://localhost:3001').replace(/\/$/, '')
    const safeFrom = from.startsWith('/') ? from : '/'
    return `${site}${BASE_PATH}/login/?from=${encodeURIComponent(safeFrom)}`
  }

  const origin = window.location.origin
  const safeFrom = from.startsWith('/') ? from : '/'
  return `${origin}${BASE_PATH}/login/?from=${encodeURIComponent(safeFrom)}`
}

export function resolveGithubAuthorizeUrl(from = '/'): string | null {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID?.trim()
  if (!clientId) return null

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: resolveGithubCallbackUrl(from),
    scope: 'user:email',
  })

  return `https://github.com/login/oauth/authorize?${params.toString()}`
}
