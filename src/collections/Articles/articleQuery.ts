import { getPayloadClient } from '@/lib/payload/client'
import { Article } from '@/payload-types'
import { unstable_cache } from 'next/cache'
import { ARTICLE_CACHE_TAG, ARTICLE_STATUS_OPTIONS } from './constants'

async function _getPublishedArticles(): Promise<Article[]> {
  const payload = await getPayloadClient()
  try {
    const { docs: articles } = await payload.find({
      depth: 2,
      collection: 'articles',
      where: {
        status: {
          equals: ARTICLE_STATUS_OPTIONS.PUBLISHED,
        },
      },
      select: {
        slug: true,
        title: true,
        contentSummary: true,
        readTimeInMins: true,
        author: true,
        coverImage: true,
        status: true,
        publishedAt: true,
      },
    })
    return (articles as Article[]) ?? []
  } catch (error) {
    console.error('Failed to fetch articles', error)
    return []
  }
}

export async function getPublishedArticles() {
  return unstable_cache(_getPublishedArticles, [], {
    tags: [ARTICLE_CACHE_TAG],
  })()
}

export async function getArticleBySlug(slug: string) {
  const payload = await getPayloadClient()
  try {
    const { docs: articles } = await payload.find({
      collection: 'articles',
      limit: 1,
      where: { slug: { equals: slug } },
    })
    const [firstArticle] = articles ?? []
    return firstArticle ?? null
  } catch (error) {
    console.error('Failed to fetch articles', error)
    return null
  }
}
