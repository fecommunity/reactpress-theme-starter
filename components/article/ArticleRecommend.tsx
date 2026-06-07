'use client'

import ArticleList from '@/components/article/ArticleList'
import Link from '@/components/shared/Link'
import SectionHeading, { EmptyState } from '@/components/shared/SectionHeading'
import { ArticleProvider } from '@/lib/providers/client'
import { normalizeList, normalizePaginated } from '@/lib/reactpress/normalizeApiResponse'
import { EyeIcon, HeartIcon } from '@/lib/utils/icons'
import { useLocale } from '@fecommunity/reactpress-toolkit/ui'
import { slimArticlesForList } from '@fecommunity/reactpress-toolkit/theme'
import type { IArticle } from '@fecommunity/reactpress-toolkit/types'
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type TransitionEvent,
} from 'react'

interface ArticleRecommendProps {
  articleId?: string | null
  mode?: 'inline' | 'vertical'
  needTitle?: boolean
  deferFetch?: boolean
  /** Render as article page section (heading + panel wrapper). */
  asPageSection?: boolean
  /** Hide entire section when loaded with no articles. */
  hideWhenEmpty?: boolean
}

type RecommendArticle = {
  id: string
  title: string
  views: number
  summary?: string
  likes?: number
  publishAt?: string
  cover?: string
  category?: { value: string; label: string }
}

const SKELETON_ROWS = 5
const INLINE_VISIBLE = 5
const INLINE_FETCH_SIZE = 15
const VERTICAL_FETCH_SIZE = 6
const SCROLL_ROW_PX = 42
const SCROLL_INTERVAL_MS = 3600

function formatCompactViews(views: number): string {
  if (views >= 10000) {
    return `${(views / 10000).toFixed(1).replace(/\.0$/, '')}w`
  }
  if (views >= 1000) {
    return `${(views / 1000).toFixed(1).replace(/\.0$/, '')}k`
  }
  return String(views)
}

function dedupeById(articles: RecommendArticle[]): RecommendArticle[] {
  const seen = new Set<string>()
  return articles.filter((article) => {
    if (seen.has(article.id)) return false
    seen.add(article.id)
    return true
  })
}

/** Recommend API may still cap at 6 on older backends — pad with hot articles from list API. */
async function loadRecommendArticles(
  articleId: string | null,
  fetchSize: number
): Promise<RecommendArticle[]> {
  const recommended = slimArticlesForList(
    normalizeList<IArticle>(await ArticleProvider.getRecommend(articleId, fetchSize))
  )
  let pool = dedupeById(recommended)
  pool.sort((a, b) => b.views - a.views)

  if (pool.length >= fetchSize || articleId) {
    return pool.slice(0, fetchSize)
  }

  const [listRows] = normalizePaginated<IArticle>(
    await ArticleProvider.getArticles({
      page: 1,
      pageSize: Math.max(fetchSize * 2, 24),
      status: 'publish',
    })
  )

  pool = dedupeById([...pool, ...slimArticlesForList(listRows)])
  pool.sort((a, b) => b.views - a.views)
  return pool.slice(0, fetchSize)
}

function RecommendSkeleton() {
  return (
    <ul className="rp-recommend-list m-0 list-none" aria-hidden>
      {Array.from({ length: SKELETON_ROWS }, (_, i) => (
        <li key={i} className="rp-recommend-item">
          <div className="flex items-center gap-2.5 px-4 py-2.5">
            <span className="h-4 w-5 shrink-0 animate-pulse rounded bg-[var(--border-color)]" />
            <span className="h-3.5 flex-1 animate-pulse rounded bg-[var(--border-color)]" />
            <span className="h-3 w-9 shrink-0 animate-pulse rounded bg-[var(--border-color)]" />
          </div>
        </li>
      ))}
    </ul>
  )
}

function RecommendRow({
  article,
  rank,
  compact = false,
}: {
  article: RecommendArticle
  rank: number
  compact?: boolean
}) {
  return (
    <li className={compact ? 'rp-recommend-scroll-row' : 'rp-recommend-item'}>
      <Link
        href={`/article/${article.id}`}
        title={article.title}
        className="rp-recommend-link group flex items-center gap-3 px-4 py-2.5 no-underline"
      >
        <span className="rp-recommend-rank" data-rank={rank} aria-hidden>
          {rank}
        </span>
        <span className="rp-recommend-title min-w-0 flex-1 truncate text-[var(--main-text-color)] transition-colors group-hover:text-[var(--primary-color)]">
          {article.title}
        </span>
        <span className="rp-recommend-views inline-flex shrink-0 items-center gap-1 tabular-nums">
          <EyeIcon size={12} />
          <span>{formatCompactViews(article.views)}</span>
        </span>
      </Link>
    </li>
  )
}

function RecommendInlineScroller({ articles }: { articles: RecommendArticle[] }) {
  const [offset, setOffset] = useState(0)
  const [trackY, setTrackY] = useState(0)
  const [moving, setMoving] = useState(false)
  const [paused, setPaused] = useState(false)
  const [instant, setInstant] = useState(false)
  const [reduceMotion, setReduceMotion] = useState(false)
  const resetTimerRef = useRef<number | null>(null)

  const rankById = useMemo(() => {
    const map = new Map<string, number>()
    articles.forEach((article, index) => map.set(article.id, index + 1))
    return map
  }, [articles])

  const loopArticles = useMemo(() => [...articles, ...articles], [articles])

  const windowItems = useMemo(
    () =>
      loopArticles.slice(offset, offset + INLINE_VISIBLE + 1).map((article, index) => ({
        article,
        rank: rankById.get(article.id) ?? offset + index + 1,
        key: `${article.id}-${offset + index}`,
      })),
    [loopArticles, offset, rankById]
  )

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduceMotion(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  const canScroll = articles.length > INLINE_VISIBLE && !reduceMotion

  const clearResetTimer = useCallback(() => {
    if (resetTimerRef.current !== null) {
      window.clearTimeout(resetTimerRef.current)
      resetTimerRef.current = null
    }
  }, [])

  useEffect(() => {
    setOffset(0)
    setTrackY(0)
    setMoving(false)
    setInstant(false)
  }, [articles])

  useEffect(() => {
    if (!canScroll || paused || moving) return undefined

    const timer = window.setInterval(() => {
      setMoving(true)
      setTrackY(-SCROLL_ROW_PX)
    }, SCROLL_INTERVAL_MS)

    return () => window.clearInterval(timer)
  }, [canScroll, moving, paused])

  useEffect(() => clearResetTimer, [clearResetTimer])

  const handleTrackTransitionEnd = (event: TransitionEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget || event.propertyName !== 'transform' || instant) {
      return
    }
    if (!moving) return

    setInstant(true)
    setOffset((prev) => (prev + 1) % articles.length)
    setTrackY(0)
    setMoving(false)
    resetTimerRef.current = window.setTimeout(() => {
      setInstant(false)
      resetTimerRef.current = null
    }, 24)
  }

  if (!canScroll) {
    return (
      <ul className="rp-recommend-list rp-recommend-fade-in m-0 list-none">
        {articles.map((article, index) => (
          <RecommendRow key={article.id} article={article} rank={index + 1} />
        ))}
      </ul>
    )
  }

  return (
    <div
      className={`rp-recommend-scroll rp-recommend-fade-in${paused ? 'is-paused' : ''}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false)
        }
      }}
    >
      <div className={`rp-recommend-scroll-viewport${moving ? 'is-moving' : ''}`} aria-live="off">
        <ul
          className={`rp-recommend-list rp-recommend-scroll-track m-0 list-none ${instant ? 'is-instant' : ''}${moving ? 'is-moving' : ''}`}
          style={{ transform: `translate3d(0, ${trackY}px, 0)` }}
          onTransitionEnd={handleTrackTransitionEnd}
        >
          {windowItems.map(({ article, rank, key }) => (
            <RecommendRow key={key} article={article} rank={rank} compact />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default function ArticleRecommend({
  mode = 'vertical',
  articleId = null,
  needTitle = true,
  deferFetch = false,
  asPageSection = false,
  hideWhenEmpty = false,
}: ArticleRecommendProps) {
  const { t } = useLocale()
  const requestKey = `${articleId ?? ''}:${mode}`
  const [fetchedKey, setFetchedKey] = useState<string | undefined>(undefined)
  const [articles, setArticles] = useState<RecommendArticle[]>([])

  useEffect(() => {
    if (fetchedKey === requestKey) return
    let cancelled = false

    const fetchSize = mode === 'inline' ? INLINE_FETCH_SIZE : VERTICAL_FETCH_SIZE

    const run = () => {
      loadRecommendArticles(articleId, fetchSize)
        .then((next) => {
          if (cancelled) return
          setArticles(next)
          setFetchedKey(requestKey)
        })
        .catch(() => {
          if (cancelled) return
          setArticles([])
          setFetchedKey(requestKey)
        })
    }

    if (deferFetch && typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => run(), { timeout: 2500 })
      return () => {
        cancelled = true
        window.cancelIdleCallback(id)
      }
    }

    run()
    return () => {
      cancelled = true
    }
  }, [articleId, deferFetch, fetchedKey, requestKey, mode])

  const ready = fetchedKey === requestKey
  const showSkeleton = !ready && articles.length === 0
  const showEmpty = ready && articles.length === 0

  if (mode === 'vertical') {
    if (hideWhenEmpty && showEmpty) return null

    let body: ReactNode
    if (showSkeleton) {
      body = <RecommendSkeleton />
    } else if (showEmpty) {
      body = <EmptyState />
    } else {
      body = (
        <ArticleList
          articles={articles as Parameters<typeof ArticleList>[0]['articles']}
          density="feed"
        />
      )
    }

    if (asPageSection) {
      return (
        <section className="rp-article-recommend">
          <SectionHeading>{t('recommendToReading')}</SectionHeading>
          <div className="rp-article-recommend-panel">{body}</div>
        </section>
      )
    }

    return body
  }

  return (
    <div className="rp-widget-panel rp-sidebar-widget mb-5 overflow-hidden rounded-xl bg-[var(--bg-box)] leading-snug shadow-[var(--box-shadow)] ring-1 ring-black/5 dark:ring-white/5">
      {needTitle ? (
        <div className="rp-sidebar-widget__header">
          <HeartIcon size={16} className="mr-2 inline-block text-[var(--primary-color)]" />
          <span>{t('recommendToReading')}</span>
        </div>
      ) : null}

      <div className="rp-sidebar-widget__body">
        {showSkeleton ? (
          <RecommendSkeleton />
        ) : showEmpty ? (
          <EmptyState />
        ) : (
          <RecommendInlineScroller articles={articles} />
        )}
      </div>
    </div>
  )
}
