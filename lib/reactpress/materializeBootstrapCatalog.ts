import type { AppBootstrapResult } from '@fecommunity/reactpress-toolkit/theme/server'
import type { SiteCatalogContextValue } from '@fecommunity/reactpress-toolkit/ui'
import type { ICategory, IPage, ISetting, ITag } from '@fecommunity/reactpress-toolkit/types'

/** Toolkit bootstrap uses loose records; catalog context expects typed entities. */
export function materializeBootstrapCatalog(bootstrap: AppBootstrapResult) {
  const globalSetting = normalizeGlobalSetting(bootstrap.globalSetting)

  return {
    setting: bootstrap.setting as unknown as ISetting,
    globalSetting,
    siteConfig: bootstrap.siteConfig as unknown as NonNullable<
      SiteCatalogContextValue['siteConfig']
    >,
    tags: bootstrap.tags as ITag[],
    categories: bootstrap.categories as ICategory[],
    pages: bootstrap.pages as IPage[],
  }
}

function normalizeGlobalSetting(
  raw: AppBootstrapResult['globalSetting']
): SiteCatalogContextValue['globalSetting'] {
  if (!raw) return undefined

  if (typeof raw.globalConfig === 'object' && raw.globalConfig !== null) {
    return raw as { globalConfig: Record<string, unknown> }
  }

  return { globalConfig: raw }
}
