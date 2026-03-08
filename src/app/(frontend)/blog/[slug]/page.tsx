import { getArticleBySlug } from '@/collections/Articles/articleQuery'
import { RichText } from '@/lib/payload/components/rich-text'
import { relationIsObject } from '@/lib/payload/helpers/relations-is-object'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArticleMetadata } from '../_components/article-metadata'

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  if (!relationIsObject(article.coverImage)) return null
  if (!relationIsObject(article.author) || !relationIsObject(article.author.avatar)) {
    return null
  }

  return (
    <div className="prose lg:prose-lg dark:prose-invert">
      {/* title */}
      <h1>{article.title}</h1>

      {/* metadata */}
      <ArticleMetadata
        intent="post"
        data={{
          author: {
            avatar: article.author.avatar,
            name: article.author.name,
            role: article.author.role,
          },
          publishedAt: new Date(article.publishedAt ?? new Date()),
          readTimeMins: article.readTimeInMins ?? 0,
        }}
        className="not-prose"
      />

      {/* cover image */}
      <Image
        src={article.coverImage.url ?? ''}
        alt="Cover image"
        width={600}
        height={300}
        className="w-full rounded-md object-center object-cover"
        placeholder="blur"
        blurDataURL={article.coverImage.blurDataUrl}
      />

      {/* content */}
      <RichText lexicalData={article.content} />
    </div>
  )
}
