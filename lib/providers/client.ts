import { createThemeHttpStack } from '@fecommunity/reactpress-toolkit/theme'
import { normalizeList, normalizePaginated } from '@/lib/reactpress/normalizeApiResponse'
import { materializeProvider } from '@/lib/providers/materializeProvider'

/** API messages already shown in UI (login form, etc.) — skip dev console noise. */
function isExpectedClientError(message: string, status?: number): boolean {
  if (status === 400 || status === 401 || status === 403) return true
  return /用户名|密码|登录|注册|邮箱|授权|已存在|锁定|未认证|无权|Unauthorized|Request failed/i.test(
    message
  )
}

const stack = createThemeHttpStack({
  onError: (msg, status) => {
    if (process.env.NODE_ENV !== 'development') return
    if (isExpectedClientError(msg, status)) return
    console.error('[my-blog]', msg)
  },
})

export const { CommentProvider, UserProvider, SettingProvider } = stack

export const ArticleProvider = {
  ...materializeProvider(stack.ArticleProvider),
  getArticles: (params: Parameters<typeof stack.ArticleProvider.getArticles>[0]) =>
    stack.ArticleProvider.getArticles(params).then(normalizePaginated),
  getArticlesByCategory: (
    category: Parameters<typeof stack.ArticleProvider.getArticlesByCategory>[0],
    params: Parameters<typeof stack.ArticleProvider.getArticlesByCategory>[1]
  ) => stack.ArticleProvider.getArticlesByCategory(category, params).then(normalizePaginated),
  getArticlesByTag: (
    tag: Parameters<typeof stack.ArticleProvider.getArticlesByTag>[0],
    params: Parameters<typeof stack.ArticleProvider.getArticlesByTag>[1]
  ) => stack.ArticleProvider.getArticlesByTag(tag, params).then(normalizePaginated),
  getRecommend: (
    articleId?: Parameters<typeof stack.ArticleProvider.getRecommend>[0],
    pageSize?: Parameters<typeof stack.ArticleProvider.getRecommend>[1]
  ) => stack.ArticleProvider.getRecommend(articleId, pageSize).then(normalizeList),
  getAllRecommendArticles: () =>
    stack.ArticleProvider.getAllRecommendArticles().then(normalizeList),
} as typeof stack.ArticleProvider

export const SearchProvider = {
  ...materializeProvider(stack.SearchProvider),
  searchArticles: (keyword: string) =>
    stack.SearchProvider.searchArticles(keyword).then(normalizeList),
} as typeof stack.SearchProvider

export const PageProvider = {
  ...materializeProvider(stack.PageProvider),
  getAllPublisedPages: () => stack.PageProvider.getAllPublisedPages().then(normalizePaginated),
} as typeof stack.PageProvider

export const KnowledgeProvider = {
  ...materializeProvider(stack.KnowledgeProvider),
  getKnowledges: (params: Parameters<typeof stack.KnowledgeProvider.getKnowledges>[0]) =>
    stack.KnowledgeProvider.getKnowledges(params).then(normalizePaginated),
} as typeof stack.KnowledgeProvider
