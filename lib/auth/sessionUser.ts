import type { ThemeSessionUser } from '@fecommunity/reactpress-toolkit/theme'

function readToken(record: Record<string, unknown>): string {
  if (typeof record.token === 'string' && record.token.trim()) {
    return record.token.trim()
  }
  if (typeof record.accessToken === 'string' && record.accessToken.trim()) {
    return record.accessToken.trim()
  }
  const tokens = record.tokens
  if (tokens && typeof tokens === 'object') {
    const accessToken = (tokens as Record<string, unknown>).accessToken
    if (typeof accessToken === 'string' && accessToken.trim()) {
      return accessToken.trim()
    }
  }
  return ''
}

/** Map `/auth/login` and `/auth/github` payloads to theme session storage shape. */
export function normalizeSessionUser(data: unknown): ThemeSessionUser | null {
  if (!data || typeof data !== 'object') return null

  const record = data as Record<string, unknown>
  const nested =
    record.user && typeof record.user === 'object'
      ? (record.user as Record<string, unknown>)
      : record

  const name = typeof nested.name === 'string' ? nested.name.trim() : ''
  const token = readToken(record) || readToken(nested)
  if (!name) return null

  return {
    name,
    email: typeof nested.email === 'string' ? nested.email : '',
    avatar: typeof nested.avatar === 'string' ? nested.avatar : '',
    token,
    role: typeof nested.role === 'string' ? nested.role : undefined,
  }
}
