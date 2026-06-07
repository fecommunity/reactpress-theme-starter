import themeManifest from '../../theme.json'
import { safeJsonParse } from '@fecommunity/reactpress-toolkit/theme'

export type SiteNavBlocks = {
  urlConfig: unknown[]
  searchCategories: {
    categories?: Array<{ key: string; label: string }>
    subCategories?: Record<string, Array<{ key: string; label: string; url?: string }>>
  }
}

type GlobalSettingRaw = {
  theme?: { activeTheme?: string }
  config?: Record<
    string,
    {
      nav?: {
        urlConfig?: unknown[]
        searchCategories?: SiteNavBlocks['searchCategories']
      }
    }
  >
  en?: { globalConfig?: { urlConfig?: unknown[]; navConfig?: SiteNavBlocks['searchCategories'] } }
  zh?: { globalConfig?: { urlConfig?: unknown[]; navConfig?: SiteNavBlocks['searchCategories'] } }
}

const EMPTY_NAV: SiteNavBlocks = {
  urlConfig: [],
  searchCategories: { categories: [], subCategories: {} },
}

/** Resolve nav blocks for the active theme and visitor locale (client-safe). */
export function resolveSiteNavConfig(
  globalSettingRaw: unknown,
  locale: string,
  themeId = themeManifest.id
): SiteNavBlocks {
  const gs = (globalSettingRaw ?? {}) as GlobalSettingRaw
  const activeTheme = gs.theme?.activeTheme ?? themeId
  const themeNav = gs.config?.[activeTheme]?.nav
  const legacyBundle = locale === 'en' ? (gs.en ?? gs.zh) : (gs.zh ?? gs.en)
  const legacy = legacyBundle?.globalConfig

  return {
    urlConfig: themeNav?.urlConfig ?? legacy?.urlConfig ?? [],
    searchCategories: themeNav?.searchCategories ?? legacy?.navConfig ?? EMPTY_NAV.searchCategories,
  }
}

export function resolveSiteNavFromSetting(
  setting: { globalSetting?: unknown } | null | undefined,
  locale: string
): SiteNavBlocks {
  const raw = safeJsonParse(setting?.globalSetting, {})
  return resolveSiteNavConfig(raw, locale)
}
