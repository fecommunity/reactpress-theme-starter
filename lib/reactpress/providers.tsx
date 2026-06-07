'use client'

import { normalizeSessionUser } from '@/lib/auth/sessionUser'
import { fetchVisitorSetting } from '@/lib/reactpress/fetchSetting'
import { materializeBootstrapCatalog } from '@/lib/reactpress/materializeBootstrapCatalog'
import {
  ReactPressProvider,
  SiteCatalogProvider,
  readPersistedLocale,
  useLocale,
  type SiteCatalogContextValue,
} from '@fecommunity/reactpress-toolkit/ui'
import {
  applyColorModeClass,
  clearThemeSession,
  mergeVisitorI18n,
  persistColorMode,
  persistThemeSession,
  persistVisitorLocale,
  resolveClientThemeMode,
  resolveStoredUser,
  safeJsonParse,
  type ThemeColorMode,
} from '@fecommunity/reactpress-toolkit/theme'
import type { AppBootstrapResult } from '@fecommunity/reactpress-toolkit/theme/server'
import type { IUser } from '@fecommunity/reactpress-toolkit/types'
import { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react'

import { HomeFooterProvider } from './homeFooter'
import { LayoutShell } from './layout-shell'

type Props = {
  bootstrap: AppBootstrapResult
  children: React.ReactNode
}

function VisitorLocaleBootstrap({ locales, ssrLocale }: { locales: string[]; ssrLocale: string }) {
  const { setLocale } = useLocale()

  useLayoutEffect(() => {
    const stored = readPersistedLocale(locales, ssrLocale)
    if (stored && stored !== ssrLocale) {
      setLocale(stored)
    }
  }, [locales, setLocale, ssrLocale])

  return null
}

export function ReactPressAppProviders({ bootstrap, children }: Props) {
  const catalogSeed = useMemo(() => materializeBootstrapCatalog(bootstrap), [bootstrap])
  const { i18n: bootstrapI18n, locales, initialLocale, themeMods } = bootstrap

  const [theme, setTheme] = useState<ThemeColorMode>('light')
  const [locale, setLocale] = useState(initialLocale)
  const [collapsed, setCollapsed] = useState(false)
  const [user, setUserState] = useState<SiteCatalogContextValue['user']>(null)
  const [i18nCatalog, setI18nCatalog] = useState<Record<string, Record<string, string>>>(
    () =>
      mergeVisitorI18n(bootstrapI18n as Record<string, unknown>) as Record<
        string,
        Record<string, string>
      >
  )

  useLayoutEffect(() => {
    const storedUser = resolveStoredUser()
    if (storedUser) {
      persistThemeSession(storedUser)
      setUserState(storedUser)
    }

    const preferred = resolveClientThemeMode()
    applyColorModeClass(preferred === 'dark')
    setTheme(preferred)
  }, [])

  useEffect(() => {
    applyColorModeClass(theme === 'dark')
  }, [theme])

  const prefetchRemainingI18nLocales = useCallback(() => {
    if (!Array.isArray(locales) || locales.length <= 1) return

    fetchVisitorSetting()
      .then((res) => {
        if (!res) return
        const full = mergeVisitorI18n(safeJsonParse(res.i18n, {})) as Record<
          string,
          Record<string, string>
        >
        setI18nCatalog((prev) => ({ ...prev, ...full }))
      })
      .catch(() => {
        // Active locale messages are already available from SSR / builtins.
      })
  }, [locales])

  useEffect(() => {
    prefetchRemainingI18nLocales()
  }, [prefetchRemainingI18nLocales])

  const changeTheme = useCallback((next: ThemeColorMode) => {
    const isDark = next === 'dark'
    applyColorModeClass(isDark)
    persistColorMode(isDark)
    setTheme(next)
  }, [])

  const changeLocale = useCallback(
    (key: string) => {
      if (!key || key === locale) return
      persistVisitorLocale(key)
      setLocale(key)

      if (!i18nCatalog[key]) {
        prefetchRemainingI18nLocales()
      }
    },
    [i18nCatalog, locale, prefetchRemainingI18nLocales]
  )

  const setUser = useCallback((next: IUser) => {
    const session = normalizeSessionUser(next)
    if (session) {
      persistThemeSession(session)
    }
    setUserState(next)
  }, [])

  const removeUser = useCallback(() => {
    clearThemeSession()
    setUserState(null)
    window.location.reload()
  }, [])

  const toggleCollapse = useCallback(() => setCollapsed((value) => !value), [])

  const catalogValue = useMemo<SiteCatalogContextValue>(
    () => ({
      setting: catalogSeed.setting,
      i18n: i18nCatalog,
      locale,
      locales,
      globalSetting: catalogSeed.globalSetting,
      siteConfig: catalogSeed.siteConfig,
      tags: catalogSeed.tags,
      categories: catalogSeed.categories,
      pages: catalogSeed.pages,
      theme,
      collapsed,
      changeLocale,
      user,
      setUser,
      removeUser,
      changeTheme,
      getSetting: () => catalogSeed.setting,
      toggleCollapse,
    }),
    [
      catalogSeed,
      i18nCatalog,
      locale,
      locales,
      theme,
      collapsed,
      changeLocale,
      user,
      setUser,
      removeUser,
      changeTheme,
      toggleCollapse,
    ]
  )

  const messages = (i18nCatalog[locale] ?? {}) as Record<string, string>

  return (
    <ReactPressProvider
      locale={locale}
      locales={locales}
      messages={messages}
      catalog={i18nCatalog}
      themeId="reactpress-theme-starter"
      activeThemeId="reactpress-theme-starter"
      mods={themeMods}
      onLocaleChange={changeLocale}
    >
      <SiteCatalogProvider value={catalogValue}>
        <HomeFooterProvider>
          <LayoutShell>
            <VisitorLocaleBootstrap locales={locales} ssrLocale={initialLocale} />
            {children}
          </LayoutShell>
        </HomeFooterProvider>
      </SiteCatalogProvider>
    </ReactPressProvider>
  )
}
