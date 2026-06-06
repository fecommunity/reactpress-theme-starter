const ALLOWED_METHODS = 'GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD'

function resolveAllowedOrigin(request: Request): string | null {
  const origin = request.headers.get('Origin')?.trim()
  if (!origin) return null

  try {
    const url = new URL(origin)
    if (url.hostname === 'localhost' || url.hostname === '127.0.0.1') {
      return origin
    }
  } catch {
    // ignore invalid Origin
  }

  return null
}

export function corsPreflightResponse(request: Request): Response {
  const origin = resolveAllowedOrigin(request)
  const headers = new Headers({
    'Access-Control-Allow-Methods': ALLOWED_METHODS,
    'Access-Control-Allow-Headers':
      request.headers.get('Access-Control-Request-Headers') ??
      'Authorization, Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  })

  if (origin) {
    headers.set('Access-Control-Allow-Origin', origin)
    headers.set('Access-Control-Allow-Credentials', 'true')
  } else {
    headers.set('Access-Control-Allow-Origin', '*')
  }

  return new Response(null, { status: 204, headers })
}

export function withCors(request: Request, response: Response): Response {
  const origin = resolveAllowedOrigin(request)
  if (!origin) return response

  const headers = new Headers(response.headers)
  headers.set('Access-Control-Allow-Origin', origin)
  headers.set('Access-Control-Allow-Credentials', 'true')
  headers.set('Vary', 'Origin')
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  })
}
