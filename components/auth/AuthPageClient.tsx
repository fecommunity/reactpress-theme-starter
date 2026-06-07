'use client'

import Link from '@/components/shared/Link'
import { resolveGithubAuthorizeUrl } from '@/lib/auth/githubOAuth'
import { normalizeSessionUser } from '@/lib/auth/sessionUser'
import { UserProvider } from '@/lib/providers/client'
import { isLoggedInUser } from '@/lib/utils/comment'
import { useLocale } from '@fecommunity/reactpress-toolkit/ui'
import type { IUser } from '@fecommunity/reactpress-toolkit/types'
import {
  getCommentEmailError,
  useAsyncLoading,
  useSiteSetting,
  useSiteUser,
} from '@fecommunity/reactpress-toolkit/theme'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useMemo, useState } from 'react'

type AuthMode = 'login' | 'register'

interface AuthPageClientProps {
  mode: AuthMode
  from?: string
}

type FieldErrors = Partial<Record<'name' | 'email' | 'password' | 'confirmPassword', string>>

function resolveErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) return error.message.trim()
  if (error && typeof error === 'object' && 'message' in error) {
    const message = (error as { message?: unknown }).message
    if (typeof message === 'string' && message.trim()) return message.trim()
  }
  return ''
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden fill="currentColor">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12Z" />
    </svg>
  )
}

export default function AuthPageClient({ mode: initialMode, from = '/' }: AuthPageClientProps) {
  const { t, locale } = useLocale()
  const router = useRouter()
  const setting = useSiteSetting()
  const { user, setUser } = useSiteUser()
  const [mode, setMode] = useState<AuthMode>(initialMode)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [formError, setFormError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loginRequest, loggingIn] = useAsyncLoading(UserProvider.login)
  const [registerRequest, registering] = useAsyncLoading(UserProvider.register)

  const redirectTarget = from.startsWith('/') ? from : '/'
  const loading = loggingIn || registering
  const githubAuthorizeUrl = useMemo(
    () => resolveGithubAuthorizeUrl(redirectTarget),
    [redirectTarget]
  )

  useEffect(() => {
    setMode(initialMode)
  }, [initialMode])

  useEffect(() => {
    if (isLoggedInUser(user)) {
      router.replace(redirectTarget)
    }
  }, [redirectTarget, router, user])

  const validate = useCallback((): boolean => {
    const nextErrors: FieldErrors = {}
    const trimmedName = name.trim()

    if (!trimmedName) {
      nextErrors.name = t('commentNamespace.userInfoNameValidMsg')
    }

    if (mode === 'register') {
      const emailError = getCommentEmailError(email, {
        required: t('commentNamespace.userInfoEmailValidMsg'),
        invalid: t('commentNamespace.userInfoIllegalEmailValidMsg'),
      })
      if (emailError) nextErrors.email = emailError
    }

    if (!password.trim()) {
      nextErrors.password = t('commentNamespace.userInfoPasswordValidMsg')
    }

    if (mode === 'register') {
      if (!confirmPassword.trim()) {
        nextErrors.confirmPassword = t('commentNamespace.userInfoPleaseEnterConfirmPassword')
      } else if (confirmPassword !== password) {
        nextErrors.confirmPassword = t('commentNamespace.confirmPasswordIsNotMatchTips')
      }
    }

    setFieldErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }, [confirmPassword, email, mode, name, password, t])

  const completeLogin = useCallback(
    async (payload: { name: string; password: string }) => {
      const response = await loginRequest(payload)
      const sessionUser = normalizeSessionUser(response)
      if (!sessionUser?.token) {
        throw { message: t('commentNamespace.userInfoPasswordValidMsg') }
      }
      setUser?.(sessionUser as IUser & { token: string })
      router.replace(redirectTarget)
    },
    [loginRequest, redirectTarget, router, setUser, t]
  )

  const handleSubmit = useCallback(
    async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      setFormError('')
      setSuccessMessage('')
      if (!validate()) return

      const trimmedName = name.trim()
      const trimmedEmail = email.trim()

      try {
        if (mode === 'register') {
          await registerRequest({
            name: trimmedName,
            email: trimmedEmail,
            password,
          })
          setSuccessMessage(t('commentNamespace.registerSuccessTips'))
          await completeLogin({ name: trimmedName, password })
          return
        }

        await completeLogin({ name: trimmedName, password })
      } catch (error) {
        setFormError(resolveErrorMessage(error) || t('wrongPasswd'))
      }
    },
    [completeLogin, email, mode, name, password, registerRequest, t, validate]
  )

  const title =
    mode === 'login' ? t('commentNamespace.userInfoConfirm') : t('commentNamespace.userRegister')
  const subtitle =
    mode === 'login' ? t('loginTipMessage') : setting.systemSubTitle?.trim() || t('loginTipMessage')

  return (
    <div className="rp-auth-page">
      <div className="rp-auth-card">
        <header className="rp-auth-card__header">
          <h1 className="rp-auth-card__title">{title}</h1>
          <p className="rp-auth-card__subtitle">{subtitle}</p>
        </header>

        {formError ? (
          <div className="rp-auth-alert is-error" role="alert">
            {formError}
          </div>
        ) : null}
        {successMessage ? (
          <div className="rp-auth-alert is-success" role="status">
            {successMessage}
          </div>
        ) : null}

        <form className="rp-auth-form" onSubmit={handleSubmit} noValidate>
          <label className="rp-auth-field">
            <span className="rp-auth-field__label">{t('commentNamespace.userInfoName')}</span>
            <input
              type="text"
              name="name"
              autoComplete="username"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`rp-auth-input${fieldErrors.name ? 'is-error' : ''}`}
              placeholder={t('commentNamespace.userInfoName')}
            />
            {fieldErrors.name ? (
              <span className="rp-auth-field__error">{fieldErrors.name}</span>
            ) : null}
          </label>

          {mode === 'register' ? (
            <label className="rp-auth-field">
              <span className="rp-auth-field__label">{t('commentNamespace.userInfoEmail')}</span>
              <input
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className={`rp-auth-input${fieldErrors.email ? 'is-error' : ''}`}
                placeholder="name@example.com"
              />
              {fieldErrors.email ? (
                <span className="rp-auth-field__error">{fieldErrors.email}</span>
              ) : null}
            </label>
          ) : null}

          <label className="rp-auth-field">
            <span className="rp-auth-field__label">{t('commentNamespace.userInfoPassword')}</span>
            <div className="rp-auth-input-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className={`rp-auth-input${fieldErrors.password ? 'is-error' : ''}`}
                placeholder={t('commentNamespace.userInfoPassword')}
              />
              <button
                type="button"
                className="rp-auth-input-toggle"
                aria-label={
                  showPassword
                    ? locale === 'zh'
                      ? '隐藏密码'
                      : 'Hide password'
                    : locale === 'zh'
                      ? '显示密码'
                      : 'Show password'
                }
                onClick={() => setShowPassword((open) => !open)}
              >
                {showPassword
                  ? locale === 'zh'
                    ? '隐藏'
                    : 'Hide'
                  : locale === 'zh'
                    ? '显示'
                    : 'Show'}
              </button>
            </div>
            {fieldErrors.password ? (
              <span className="rp-auth-field__error">{fieldErrors.password}</span>
            ) : null}
          </label>

          {mode === 'register' ? (
            <label className="rp-auth-field">
              <span className="rp-auth-field__label">
                {t('commentNamespace.userInfoPleaseEnterConfirmPassword')}
              </span>
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                autoComplete="new-password"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                className={`rp-auth-input${fieldErrors.confirmPassword ? 'is-error' : ''}`}
                placeholder={t('commentNamespace.userInfoPleaseEnterConfirmPassword')}
              />
              {fieldErrors.confirmPassword ? (
                <span className="rp-auth-field__error">{fieldErrors.confirmPassword}</span>
              ) : null}
            </label>
          ) : null}

          <button type="submit" className="rp-auth-submit" disabled={loading}>
            {loading
              ? t('loading')
              : mode === 'login'
                ? t('commentNamespace.userInfoConfirm')
                : t('commentNamespace.register')}
          </button>
        </form>

        {githubAuthorizeUrl ? (
          <>
            <div className="rp-auth-divider">
              <span>{t('commentNamespace.openAuth')}</span>
            </div>
            <a href={githubAuthorizeUrl} className="rp-auth-github">
              <GithubIcon />
              <span>{t('useGithubToLogin')}</span>
            </a>
          </>
        ) : null}

        <p className="rp-auth-switch">
          {mode === 'login' ? (
            <>
              {t('commentNamespace.areYouNoAccount')}{' '}
              <Link href={`/register?from=${encodeURIComponent(redirectTarget)}`}>
                {t('commentNamespace.registerNow')}
              </Link>
            </>
          ) : (
            <>
              {t('commentNamespace.areYouHasAccount')}{' '}
              <Link href={`/login?from=${encodeURIComponent(redirectTarget)}`}>
                {t('commentNamespace.loginNow')}
              </Link>
            </>
          )}
        </p>
      </div>
    </div>
  )
}
