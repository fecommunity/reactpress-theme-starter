'use client'

import { fetchVisitorSetting } from '@/lib/reactpress/fetchSetting'
import { resolveSiteNavConfig, type SiteNavBlocks } from '@/lib/reactpress/resolveSiteNav'
import themeManifest from '../../theme.json'
import { safeJsonParse } from '@fecommunity/reactpress-toolkit/theme'
import { useLocale } from '@fecommunity/reactpress-toolkit/ui'
import { useEffect, useRef, useState } from 'react'

export function useSiteNavConfig(initialNav?: Partial<SiteNavBlocks>) {
  const { locale } = useLocale()
  const initialLocaleRef = useRef(locale)
  const skipInitialFetchRef = useRef(Boolean(initialNav?.urlConfig?.length))
  const [nav, setNav] = useState<SiteNavBlocks>(() => ({
    urlConfig: initialNav?.urlConfig ?? [],
    searchCategories: initialNav?.searchCategories ?? { categories: [], subCategories: {} },
  }))

  useEffect(() => {
    if (skipInitialFetchRef.current && locale === initialLocaleRef.current) {
      skipInitialFetchRef.current = false
      return
    }

    let cancelled = false

    fetchVisitorSetting().then((setting) => {
      if (cancelled || !setting) return
      const raw = safeJsonParse(setting.globalSetting, {})
      setNav(resolveSiteNavConfig(raw, locale, themeManifest.id))
    })

    return () => {
      cancelled = true
    }
  }, [locale])

  return nav
}
