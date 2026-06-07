import './globals.css'

import DevChunkRecovery from '@/components/shared/DevChunkRecovery'
import SiteHeader from '@/components/layout/SiteHeader'
import BackToTop from '@/components/layout/BackToTop'
import ConditionalSiteFooter from '@/components/layout/ConditionalSiteFooter'
import PageContainer from '@/components/layout/PageContainer'
import { loadAppBootstrap } from '@/lib/reactpress/bootstrap'
import { buildThemeStarterAppearanceCss } from '@/lib/reactpress/appearance'
import { getApiPreconnectOrigin } from '@/lib/reactpress/env'
import { ReactPressAppProviders } from '@/lib/reactpress/providers'
import { buildRootMetadata } from '@/lib/reactpress/siteMetadata'
import { DEFAULT_DESCRIPTION } from '@/lib/reactpress/seoMetadata'
import { colorModeInitScript } from '@fecommunity/reactpress-toolkit/theme/server'
import type { Metadata, Viewport } from 'next'

export const revalidate = 60
export const dynamic = 'force-dynamic'

export async function generateMetadata(): Promise<Metadata> {
  return buildRootMetadata()
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const bootstrap = await loadAppBootstrap('/')
  const appearanceCss = buildThemeStarterAppearanceCss(bootstrap.themeMods)
  const basePath = process.env.BASE_PATH || ''
  const apiPreconnect = getApiPreconnectOrigin()
  const rootMetadata = await buildRootMetadata()
  const siteDescription =
    typeof rootMetadata.description === 'string' && rootMetadata.description.trim()
      ? rootMetadata.description
      : DEFAULT_DESCRIPTION

  return (
    <html lang={bootstrap.initialLocale} suppressHydrationWarning>
      <head>
        <meta name="description" content={siteDescription} />
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-rp-loading','');`,
          }}
        />
        {apiPreconnect ? (
          <link rel="preconnect" href={apiPreconnect} crossOrigin="anonymous" />
        ) : null}
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32.png`} />
        <link rel="apple-touch-icon" sizes="180x180" href={`${basePath}/apple-touch-icon.png`} />
        <link rel="manifest" href={`${basePath}/site.webmanifest`} />
      </head>
      <body
        className="flex min-h-dvh flex-col bg-[var(--bg-body)] text-[var(--main-text-color)] antialiased"
        suppressHydrationWarning
      >
        <script dangerouslySetInnerHTML={{ __html: colorModeInitScript }} />
        {appearanceCss ? <style dangerouslySetInnerHTML={{ __html: appearanceCss }} /> : null}
        <ReactPressAppProviders bootstrap={bootstrap}>
          <DevChunkRecovery />
          <SiteHeader />
          <main id="main-content" className="flex flex-1 flex-col">
            <PageContainer className="flex flex-1 flex-col">{children}</PageContainer>
          </main>
          <ConditionalSiteFooter />
          <BackToTop />
        </ReactPressAppProviders>
      </body>
    </html>
  )
}
