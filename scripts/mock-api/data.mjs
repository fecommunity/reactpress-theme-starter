const now = new Date().toISOString()

export const mockSetting = {
  systemTitle: 'CI Mock Site',
  systemSubTitle: 'Mock data for CI build',
  systemUrl: 'https://example.com',
  seoDesc: 'Mock site description for CI',
  seoKeyword: 'mock,ci',
  i18n: JSON.stringify({ zh: {} }),
  globalSetting: JSON.stringify({ zh: {} }),
}

export const mockCategory = {
  value: 'mock-category',
  label: 'Mock Category',
  articleCount: 1,
}

export const mockTag = {
  value: 'mock-tag',
  label: 'Mock Tag',
  articleCount: 1,
}

export const mockArticle = {
  id: 'mock-article-1',
  title: 'Mock Article',
  content: 'Mock content for CI build.',
  html: '<p>Mock content for CI build.</p>',
  status: 'publish',
  publishAt: now,
  updateAt: now,
  category: mockCategory,
  tags: [mockTag],
  cover: '',
  views: 0,
  likes: 0,
}

export const mockPage = {
  id: 'suggestions',
  title: 'Suggestions',
  content: 'Mock suggestions page.',
  html: '<p>Mock suggestions page.</p>',
  status: 'publish',
  order: 0,
}

export const mockArticles = [mockArticle]
export const mockCategories = [mockCategory]
export const mockTags = [mockTag]
export const mockPages = [mockPage]
export const mockArchives = {}
export const mockKnowledgeBooks = []
