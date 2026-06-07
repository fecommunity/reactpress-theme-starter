import { getClientSiteUrl } from '@/lib/reactpress/env'

export async function GET() {
  const siteUrl = getClientSiteUrl()

  const body = `# ReactPress

> One package. Your CMS in about a minute. Modern publishing platform for blogs, company sites, and content-driven products.

## Links

- [Home](${siteUrl}/): Latest ReactPress articles and guides
- [Archives](${siteUrl}/archives): Browse all published articles
- [Search](${siteUrl}/search): Search ReactPress documentation articles
- [Tags](${siteUrl}/tags): Browse articles by tag
- [GitHub](https://github.com/fecommunity/reactpress): Official open-source repository
- [Official Site](https://reactpress.surge.sh/): Product overview and documentation
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  })
}
