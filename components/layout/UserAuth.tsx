'use client'

import Link from '@/components/shared/Link'
import { getAdminBaseUrl } from '@/lib/reactpress/env'
import { useLocale } from '@fecommunity/reactpress-toolkit/ui'
import { resolveImageUrl, useSiteUser } from '@fecommunity/reactpress-toolkit/theme'
import { usePathname } from 'next/navigation'
import { useMemo, useState } from 'react'

function resolveAdminHref(): string {
  const configured = process.env.NEXT_PUBLIC_REACTPRESS_ADMIN_URL?.trim()
  if (configured) return configured.endsWith('/') ? configured : `${configured}/`
  if (typeof window !== 'undefined') return `${window.location.origin}/admin/`
  return `${getAdminBaseUrl()}/`
}

function resolveThemeAuthHref(path: 'login' | 'register', from: string): string {
  const safeFrom = from.startsWith('/') ? from : '/'
  return `/${path}?from=${encodeURIComponent(safeFrom)}`
}

type UserAuthLayout = 'header' | 'drawer'

export default function UserAuth({ layout = 'header' }: { layout?: UserAuthLayout }) {
  const { t } = useLocale()
  const pathname = usePathname() ?? '/'
  const { user, removeUser } = useSiteUser()
  const [menuOpen, setMenuOpen] = useState(false)
  const authFrom = useMemo(() => pathname, [pathname])

  if (user?.name) {
    const initial = user.name.trim().charAt(0).toUpperCase()
    return (
      <div className="relative">
        <button
          type="button"
          aria-label={user.name}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border-0 bg-transparent p-0"
        >
          {user.avatar ? (
            <img
              src={resolveImageUrl(user.avatar, 'avatar')}
              alt={user.name}
              className="h-7 w-7 rounded-full object-cover"
            />
          ) : (
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#fde3cf] text-xs leading-none font-medium text-[#f56a00]">
              {initial}
            </span>
          )}
        </button>
        {menuOpen ? (
          <>
            <button
              type="button"
              aria-label="Close menu"
              className="fixed inset-0 z-40 cursor-default border-0 bg-transparent p-0"
              onClick={() => setMenuOpen(false)}
            />
            <div className="absolute right-0 z-50 mt-2 min-w-[120px] rounded-lg border border-[var(--border-color)] bg-[var(--bg-box)] py-1 shadow-[var(--box-shadow)]">
              <a
                href={resolveAdminHref()}
                target="_blank"
                rel="noreferrer"
                className="block px-4 py-2 text-sm text-[var(--main-text-color)] no-underline hover:bg-[var(--bg-second)]"
                onClick={() => setMenuOpen(false)}
              >
                {user.name}
              </a>
              <button
                type="button"
                onClick={() => {
                  removeUser?.()
                  setMenuOpen(false)
                }}
                className="block w-full px-4 py-2 text-left text-sm text-[var(--main-text-color)] hover:bg-[var(--bg-second)]"
              >
                {t('commentNamespace.logout')}
              </button>
            </div>
          </>
        ) : null}
      </div>
    )
  }

  const loginLabel = t('commentNamespace.userInfoConfirm')
  const registerLabel = t('commentNamespace.register')

  if (layout === 'drawer') {
    return (
      <div className="flex w-full flex-col gap-2">
        <Link
          href={resolveThemeAuthHref('login', authFrom)}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-box)] text-sm font-medium text-[var(--main-text-color)] no-underline transition-colors hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
        >
          {loginLabel}
        </Link>
        <Link
          href={resolveThemeAuthHref('register', authFrom)}
          className="inline-flex h-11 w-full items-center justify-center rounded-lg bg-[var(--primary-color)] text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
        >
          {registerLabel}
        </Link>
      </div>
    )
  }

  return (
    <div className="flex shrink-0 items-center gap-2">
      <Link
        href={resolveThemeAuthHref('login', authFrom)}
        className="inline-flex h-8 items-center justify-center rounded-lg border border-[var(--border-color)] bg-transparent px-3 text-sm text-[var(--main-text-color)] no-underline transition-colors hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
      >
        {loginLabel}
      </Link>
      <Link
        href={resolveThemeAuthHref('register', authFrom)}
        className="inline-flex h-8 items-center justify-center rounded-lg bg-[var(--primary-color)] px-3 text-sm font-medium text-white no-underline transition-opacity hover:opacity-90"
      >
        {registerLabel}
      </Link>
    </div>
  )
}
