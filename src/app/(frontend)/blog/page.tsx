import { getPublishedArticles } from '@/collections/Articles/articleQuery'
import { relationIsObject } from '@/lib/payload/helpers/relations-is-object'
import { warn } from 'console'
import ArticleCard from './_components/article-card'

export default async function BlogIndexPage() {
  const articles = await getPublishedArticles()
  console.log(articles[0])
  if (!articles.length) {
    return <p>No Articles FOund</p>
  }
  return (
    <div className="grid grid-cols-3 gap-4 w-full">
      {articles.map(
        ({ id, title, slug, contentSummary, coverImage, publishedAt, readTimeInMins, author }) => {
          if (!relationIsObject(coverImage)) {
            warn('Cover image is not an object')
            return null
          }
          if (!relationIsObject(author) || !relationIsObject(author.avatar)) {
            warn('Author is not an object')
            return null
          }
          return (
            <ArticleCard
              key={id}
              href={`/blog/${slug}`}
              title={title}
              summary={contentSummary}
              readTimeMins={readTimeInMins ?? 0}
              coverImage={coverImage}
              publishedAt={new Date(publishedAt ?? new Date())}
              author={{
                avatar: author.avatar,
                name: author.name ?? '',
                role: author.role ?? '',
              }}
            />
          )
        },
      )}
    </div>
  )
}
