'use client'

import AuthPageClient from '@/components/auth/AuthPageClient'
import { normalizeSessionUser } from '@/lib/auth/sessionUser'
import { UserProvider } from '@/lib/providers/client'
import { useLocale } from '@fecommunity/reactpress-toolkit/ui'
import type { IUser } from '@fecommunity/reactpress-toolkit/types'
import { useSiteSetting, useSiteUser } from '@fecommunity/reactpress-toolkit/theme'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

interface LoginClientProps {
  code?: string
  from?: string
}

export default function LoginClient({ code = '', from = '/' }: LoginClientProps) {
  const { t } = useLocale()
  const { setUser } = useSiteUser()
  const setting = useSiteSetting()
  const router = useRouter()
  const [githubError, setGithubError] = useState('')

  useEffect(() => {
    if (!code) return

    UserProvider.loginWithGithub(code)
      .then((response) => {
        const sessionUser = normalizeSessionUser(response)
        if (!sessionUser?.token) {
          throw new Error(t('wrongPasswd'))
        }
        setUser?.(sessionUser as IUser & { token: string })
        router.replace(from || '/')
      })
      .catch((error: unknown) => {
        const message =
          error && typeof error === 'object' && 'message' in error
            ? String((error as { message?: unknown }).message || '')
            : ''
        setGithubError(message || t('wrongPasswd'))
      })
  }, [code, from, router, setUser, t])

  if (code) {
    if (githubError) {
      return (
        <div className="rp-auth-page">
          <div className="rp-auth-card">
            <header className="rp-auth-card__header">
              <p className="rp-auth-card__eyebrow">{setting.systemTitle}</p>
              <h1 className="rp-auth-card__title">{t('pageTitleLogin')}</h1>
            </header>
            <div className="rp-auth-alert is-error" role="alert">
              {githubError}
            </div>
            <a
              href={`/login?from=${encodeURIComponent(from || '/')}`}
              className="rp-auth-submit rp-auth-submit--link"
            >
              {t('commentNamespace.loginNow')}
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className="rp-auth-page">
        <div className="rp-auth-card rp-auth-card--loading">
          <div
            className="rp-auth-spinner"
            role="status"
            aria-label={t('logingWithGithub')}
          />
          <p className="rp-auth-loading-text">{t('logingWithGithub')}</p>
          <p className="rp-auth-loading-subtext">{setting.systemTitle}</p>
        </div>
      </div>
    )
  }

  return <AuthPageClient mode="login" from={from} />
}
