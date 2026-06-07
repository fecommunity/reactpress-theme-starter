import type { IPage } from '@fecommunity/reactpress-toolkit/types'

/** CMS page props from toolkit SSR helpers are typed as `unknown`. */
export function coercePublishedPage(page: unknown): IPage | null {
  if (!page || typeof page !== 'object') return null

  const candidate = page as Partial<IPage>
  if (typeof candidate.id !== 'string' || !candidate.id.trim()) return null
  if (candidate.status !== 'publish') return null

  return candidate as IPage
}
