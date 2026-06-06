import {
  filterMockArticlesByCategory,
  filterMockArticlesByTag,
  getMockArticleById,
  getMockCategoryByValue,
  getMockPageById,
  getMockTagByValue,
  mockArchives,
  mockArticles,
  mockCategories,
  mockKnowledgeBooks,
  mockPages,
  mockRecommendedArticles,
  mockSetting,
  mockTags,
  searchMockArticles,
} from './data'

type MatchOptions = {
  keyword?: string
}

function jsonEnvelope(data: unknown, status = 200): Response {
  return Response.json(
    { success: true, data },
    {
      status,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  )
}

function normalizePath(segments: string[]): string {
  const path = `/${segments.map((segment) => decodeURIComponent(segment)).join('/')}`
  return path.replace(/\/$/, '') || '/'
}

function paginated<T>(items: T[]) {
  return [items, items.length] as const
}

export function matchMockRoute(
  method: string,
  segments: string[],
  options: MatchOptions = {}
): Response | null {
  const path = normalizePath(segments)

  if (method === 'POST' && path === '/setting/get') {
    return jsonEnvelope(mockSetting)
  }

  if (method === 'GET' && path === '/article') {
    return jsonEnvelope(paginated(mockArticles))
  }
  if (method === 'GET' && (path === '/article/recommend' || path === '/article/all/recommend')) {
    return jsonEnvelope(mockRecommendedArticles)
  }
  if (method === 'GET' && path === '/article/archives') {
    return jsonEnvelope(mockArchives)
  }
  if (method === 'GET' && path.startsWith('/article/category/')) {
    const value = decodeURIComponent(path.slice('/article/category/'.length))
    return jsonEnvelope(paginated(filterMockArticlesByCategory(value)))
  }
  if (method === 'GET' && path.startsWith('/article/tag/')) {
    const value = decodeURIComponent(path.slice('/article/tag/'.length))
    return jsonEnvelope(paginated(filterMockArticlesByTag(value)))
  }
  if (method === 'GET' && path.startsWith('/article/')) {
    const id = decodeURIComponent(path.slice('/article/'.length))
    if (!id.includes('/')) {
      return jsonEnvelope(getMockArticleById(id))
    }
  }

  if (method === 'GET' && path === '/category') {
    return jsonEnvelope(mockCategories)
  }
  if (method === 'GET' && path.startsWith('/category/')) {
    const value = decodeURIComponent(path.slice('/category/'.length))
    return jsonEnvelope(getMockCategoryByValue(value))
  }

  if (method === 'GET' && path === '/tag') {
    return jsonEnvelope(mockTags)
  }
  if (method === 'GET' && path.startsWith('/tag/')) {
    const value = decodeURIComponent(path.slice('/tag/'.length))
    return jsonEnvelope(getMockTagByValue(value))
  }

  if (method === 'GET' && path === '/page') {
    return jsonEnvelope(paginated(mockPages))
  }
  if (method === 'GET' && path.startsWith('/page/')) {
    const id = decodeURIComponent(path.slice('/page/'.length))
    if (id.endsWith('/views')) {
      return jsonEnvelope(null)
    }
    return jsonEnvelope(getMockPageById(id))
  }
  if (method === 'POST' && path.startsWith('/page/') && path.endsWith('/views')) {
    return jsonEnvelope(null)
  }

  if (method === 'GET' && path === '/knowledge') {
    return jsonEnvelope(paginated(mockKnowledgeBooks))
  }
  if (method === 'GET' && path.startsWith('/knowledge/')) {
    const id = decodeURIComponent(path.slice('/knowledge/'.length))
    const book = mockKnowledgeBooks.find((item) => item.id === id) ?? mockKnowledgeBooks[0] ?? null
    return jsonEnvelope(book)
  }

  if (method === 'GET' && path === '/search/article') {
    return jsonEnvelope(searchMockArticles(options.keyword ?? ''))
  }

  return null
}
