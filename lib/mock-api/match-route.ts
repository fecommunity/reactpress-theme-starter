import { mockAuthGithub, mockAuthLogin, mockAuthRegister } from './auth'
import {
  filterMockArticlesByCategory,
  filterMockArticlesByTag,
  getMockArticleById,
  getMockCategoryByValue,
  getMockKnowledgeById,
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

function incrementViews<T extends { views?: number }>(item: T): T {
  return { ...item, views: (item.views ?? 0) + 1 }
}

function findMockKnowledgeById(id: string) {
  return getMockKnowledgeById(id)
}

type MatchOptions = {
  keyword?: string
  body?: unknown
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
  return (path.replace(/\/$/, '') || '/').toLowerCase()
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

  if (method === 'POST' && path === '/auth/login') {
    return mockAuthLogin(options.body)
  }
  if (method === 'POST' && path === '/auth/github') {
    return mockAuthGithub(options.body)
  }
  if (method === 'POST' && path === '/user/register') {
    return mockAuthRegister(options.body)
  }

  if (method === 'POST' && path === '/setting/get') {
    return jsonEnvelope(mockSetting)
  }

  if (method === 'POST' && path === '/view') {
    return jsonEnvelope(null)
  }

  if (method === 'GET' && path.startsWith('/comment/host/')) {
    return jsonEnvelope(paginated([]))
  }
  if (method === 'POST' && path === '/comment') {
    return jsonEnvelope({
      id: 'mock-comment',
      hostId: '',
      content: '',
      status: 'approved',
      createAt: new Date().toISOString(),
      updateAt: new Date().toISOString(),
    })
  }

  if (method === 'POST' && path.startsWith('/article/')) {
    const rest = decodeURIComponent(path.slice('/article/'.length))
    const slash = rest.indexOf('/')
    if (slash === -1) {
      return null
    }
    const id = rest.slice(0, slash)
    const action = rest.slice(slash + 1)
    const article = getMockArticleById(id)

    if (action === 'views') {
      return jsonEnvelope(incrementViews(article))
    }
    if (action === 'likes') {
      return jsonEnvelope({ ...article, likes: (article.likes ?? 0) + 1 })
    }
    if (action === 'checkPassword') {
      return jsonEnvelope({ pass: true, ...article, needPassword: false })
    }
  }

  if (method === 'POST' && path.startsWith('/knowledge/')) {
    const rest = decodeURIComponent(path.slice('/knowledge/'.length))
    const slash = rest.indexOf('/')
    if (slash === -1) {
      return null
    }
    const id = rest.slice(0, slash)
    const action = rest.slice(slash + 1)
    const book = findMockKnowledgeById(id)
    if (!book) {
      return jsonEnvelope(null)
    }
    if (action === 'views') {
      return jsonEnvelope(incrementViews(book))
    }
    if (action === 'likes') {
      return jsonEnvelope({ ...book, likes: (book.likes ?? 0) + 1 })
    }
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
    const id = decodeURIComponent(path.slice('/page/'.length, -'/views'.length))
    const page = getMockPageById(id)
    return jsonEnvelope(incrementViews(page))
  }

  if (method === 'GET' && path === '/knowledge') {
    return jsonEnvelope(paginated(mockKnowledgeBooks))
  }
  if (method === 'GET' && path.startsWith('/knowledge/')) {
    const id = decodeURIComponent(path.slice('/knowledge/'.length))
    return jsonEnvelope(getMockKnowledgeById(id))
  }

  if (method === 'GET' && path === '/search/article') {
    return jsonEnvelope(searchMockArticles(options.keyword ?? ''))
  }

  return null
}
