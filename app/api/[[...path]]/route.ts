import { isMockApiEnabled } from '@/lib/mock-api/config'
import { corsPreflightResponse, withCors } from '@/lib/mock-api/cors'
import { matchMockRoute } from '@/lib/mock-api/match-route'
import { proxyToUpstreamApi } from '@/lib/mock-api/proxy'

export const dynamic = 'force-dynamic'

type RouteContext = {
  params: Promise<{ path?: string[] }>
}

async function readJsonBody(request: Request): Promise<unknown> {
  if (request.method === 'GET' || request.method === 'HEAD') return undefined
  try {
    const text = await request.text()
    if (!text.trim()) return undefined
    return JSON.parse(text) as unknown
  } catch {
    return undefined
  }
}

async function handleRequest(request: Request, context: RouteContext): Promise<Response> {
  if (request.method === 'OPTIONS') {
    return corsPreflightResponse(request)
  }

  const { path = [] } = await context.params
  const keyword = new URL(request.url).searchParams.get('keyword')?.trim() ?? ''
  const body = await readJsonBody(request)

  let response: Response
  if (isMockApiEnabled()) {
    const mockResponse = matchMockRoute(request.method, path, { keyword, body })
    response = mockResponse ?? Response.json({ success: true, data: null })
  } else {
    response = await proxyToUpstreamApi(request, path)
  }

  return withCors(request, response)
}

export function GET(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}

export function POST(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}

export function PUT(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}

export function PATCH(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}

export function DELETE(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}

export function HEAD(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}

export function OPTIONS(request: Request, context: RouteContext) {
  return handleRequest(request, context)
}
