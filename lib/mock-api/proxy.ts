import { resolveUpstreamApiBase } from './config'

export async function proxyToUpstreamApi(request: Request, segments: string[]): Promise<Response> {
  const base = resolveUpstreamApiBase()
  const pathname = segments.map((segment) => decodeURIComponent(segment)).join('/')
  const incoming = new URL(request.url)
  const target = new URL(pathname ? `${base}/${pathname}` : base)
  target.search = incoming.search

  const headers = new Headers(request.headers)
  headers.delete('host')
  headers.delete('connection')

  const body =
    request.method === 'GET' || request.method === 'HEAD' ? undefined : await request.arrayBuffer()

  const upstream = await fetch(target, {
    method: request.method,
    headers,
    body,
    redirect: 'manual',
  })

  return new Response(upstream.body, {
    status: upstream.status,
    headers: upstream.headers,
  })
}
