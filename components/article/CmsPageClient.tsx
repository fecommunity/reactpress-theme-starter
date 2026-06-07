'use client'

import ArticleRecommend from '@/components/article/ArticleRecommend'
import CommentSection from '@/components/comment/CommentSection'
import ReadingContent from '@/components/article/ReadingContent'
import DoubleColumnLayout from '@/components/layout/DoubleColumnLayout'
import { PageProvider } from '@/lib/providers/client'
import { getSuggestionsPageHtml } from '@/lib/reactpress/suggestionsContent'
import { useLocale } from '@fecommunity/reactpress-toolkit/ui'
import { Image, ImageViewer } from '@fecommunity/reactpress-toolkit/ui/content'
import type { IPage } from '@fecommunity/reactpress-toolkit/types'
import { useEffect } from 'react'

interface CmsPageClientProps {
  page: IPage
}

export default function CmsPageClient({ page }: CmsPageClientProps) {
  const { t, locale } = useLocale()
  const isSuggestionsPage = page.path === 'suggestions'

  useEffect(() => {
    PageProvider.updatePageViews(page.id)
  }, [page.id])

  if (isSuggestionsPage) {
    const heroSubtitle =
      locale === 'zh'
        ? '欢迎提出想法，帮助我们改进 ReactPress 与主题 Starter。'
        : 'Share your ideas to help us improve ReactPress and this theme starter.'

    const content = (
      <ImageViewer containerSelector="#js-suggestions-wrapper">
        <div className="rp-article-page">
          <article id="js-suggestions-wrapper" className="rp-article-wrap">
            <div className="rp-article-inner">
              <header className="rp-article-header">
                <h1 className="rp-article-title">{t('suggestions')}</h1>
                <p className="rp-article-lead">{heroSubtitle}</p>
              </header>
              <div className="rp-article-body">
                <ReadingContent key={locale} content={getSuggestionsPageHtml(locale, page.html)} />
              </div>
            </div>
          </article>
        </div>
      </ImageViewer>
    )

    return <DoubleColumnLayout leftNode={content} fillMinHeight />
  }

  return (
    <ImageViewer containerSelector="#js-page-wrapper">
      <div id="js-page-wrapper" className="rp-cms-page relative bg-[var(--bg-box)]">
        <div
          className="rp-cms-page-inner border-b border-[var(--border-color)] pt-5"
          style={{
            backgroundColor: 'var(--bg-second)',
          }}
        >
          {page.cover ? (
            <div className="rp-cms-cover mx-auto max-w-3xl px-2 pb-6">
              <Image
                url={page.cover}
                size="large"
                alt={t('articleCover')}
                className="w-full rounded-lg"
              />
            </div>
          ) : null}
          <div className="rp-cms-content mx-auto max-w-3xl px-2 pb-5">
            <ReadingContent content={page.html} />
          </div>
        </div>

        <div className="rp-comment-wrap mx-auto max-w-3xl px-4 py-4">
          <p className="rp-cms-section-title">{t('comment')}</p>
          <div className="rp-comment-panel">
            <CommentSection hostId={page.id} />
          </div>
        </div>
        <div className="rp-cms-recommend mx-auto max-w-3xl px-4 py-4">
          <p className="rp-cms-section-title">{t('recommendToReading')}</p>
          <div className="overflow-hidden rounded-lg shadow-[var(--box-shadow)]">
            <ArticleRecommend needTitle={false} mode="inline" />
          </div>
        </div>
      </div>
    </ImageViewer>
  )
}
