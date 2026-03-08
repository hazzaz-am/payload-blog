import { getPayloadClient } from '@/lib/payload/client'
import { Article } from '@/payload-types'
import { ARTICLE_STATUS_OPTIONS } from './constants'

export async function getArticles(): Promise<Article[]> {
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
