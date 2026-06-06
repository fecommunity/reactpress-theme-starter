export function isMockApiEnabled(): boolean {
  return process.env.REACTPRESS_MOCK_API === '1'
}

export function resolveUpstreamApiBase(): string {
  return (
    process.env.REACTPRESS_API_URL?.trim() ||
    process.env.SERVER_API_URL?.trim() ||
    'http://localhost:3002/api'
  ).replace(/\/$/, '')
}
