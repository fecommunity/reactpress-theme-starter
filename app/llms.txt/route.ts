import { getClientSiteUrl } from '@/lib/reactpress/env'

export async function GET() {
  const siteUrl = getClientSiteUrl()

  const body = `# ReactPress Theme Starter

> Headless blog theme powered by ReactPress — dynamic content, ISR, dark mode, and Vercel-ready deployment.

## Links

- [Home](${siteUrl}/): Blog homepage with latest articles
- [Archives](${siteUrl}/archives): Browse all published articles
- [Search](${siteUrl}/search): Search articles by keyword
- [Tags](${siteUrl}/tags): Browse articles by tag
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
