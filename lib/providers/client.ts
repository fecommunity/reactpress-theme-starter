import { createThemeHttpStack } from '@fecommunity/reactpress-toolkit/theme'
import { normalizeList, normalizePaginated } from '@/lib/reactpress/normalizeApiResponse'

const stack = createThemeHttpStack({
  onError: (msg) => {
    if (process.env.NODE_ENV === 'development') {
      console.error('[my-blog]', msg)
    }
  },
})

export const { CommentProvider, UserProvider, SettingProvider } = stack

export const ArticleProvider = {
  ...stack.ArticleProvider,
  getArticles: (params) => stack.ArticleProvider.getArticles(params).then(normalizePaginated),
  getArticlesByCategory: (category, params) =>
    stack.ArticleProvider.getArticlesByCategory(category, params).then(normalizePaginated),
  getArticlesByTag: (tag, params) =>
    stack.ArticleProvider.getArticlesByTag(tag, params).then(normalizePaginated),
  getRecommend: (articleId?: string | null, pageSize?: number) =>
    stack.ArticleProvider.getRecommend(articleId, pageSize).then(normalizeList),
  getAllRecommendArticles: () =>
    stack.ArticleProvider.getAllRecommendArticles().then(normalizeList),
}

export const SearchProvider = {
  ...stack.SearchProvider,
  searchArticles: (keyword) => stack.SearchProvider.searchArticles(keyword).then(normalizeList),
}

export const PageProvider = {
  ...stack.PageProvider,
  getAllPublisedPages: () => stack.PageProvider.getAllPublisedPages().then(normalizePaginated),
}

export const KnowledgeProvider = {
  ...stack.KnowledgeProvider,
  getKnowledges: (params) => stack.KnowledgeProvider.getKnowledges(params).then(normalizePaginated),
}
