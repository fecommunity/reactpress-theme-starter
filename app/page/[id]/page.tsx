import CmsPageClient from '@/components/article/CmsPageClient'
import { buildCmsPageMetadata, parseSiteSeoContext } from '@/lib/reactpress/contentSeo'
import { coercePublishedPage } from '@/lib/reactpress/coercePublishedPage'
import {
  fetchCmsPageProps,
  fetchSiteMeta,
  themeApi,
  unwrapSetting,
  withApiRetry,
} from '@fecommunity/reactpress-toolkit/theme/server'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const revalidate = 60

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params

  try {
    const [{ page: rawPage }, siteMeta, settingRow] = await Promise.all([
      withApiRetry(() => fetchCmsPageProps(themeApi, id)),
      withApiRetry(() => fetchSiteMeta(themeApi)),
      withApiRetry(() => themeApi.setting.findAll()).then(unwrapSetting),
    ])

    const page = coercePublishedPage(rawPage)
    if (!page) {
      return {}
    }

    const site = parseSiteSeoContext(settingRow, siteMeta)
    return buildCmsPageMetadata(page, site)
  } catch (error) {
    console.error('[my-blog] cms page metadata fetch failed', error)
    return {}
  }
}

export default async function CmsPage({ params }: PageProps) {
  const { id } = await params

  try {
    const { page: rawPage } = await withApiRetry(() => fetchCmsPageProps(themeApi, id))
    const page = coercePublishedPage(rawPage)
    if (!page) {
      notFound()
    }
    return <CmsPageClient page={page} />
  } catch (error) {
    console.error('[my-blog] cms page fetch failed', error)
    notFound()
  }
}
