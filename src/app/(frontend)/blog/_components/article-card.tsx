import { Media } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { ArticleMetadata } from './article-metadata'

type ArticleCardProps = {
  href: string
  title: string
  summary: string
  coverImage: Media
  publishedAt: Date
  readTimeMins: number
  author: {
    avatar: Media
    name: string
    role: string
  }
}

export default function ArticleCard({
  href,
  title,
  summary,
  coverImage,
  publishedAt,
  readTimeMins,
  author,
}: ArticleCardProps) {
  return (
    <Link href={href} aria-label={`Read article: ${title}`} className="block">
      <article className="rounded-md border border-gray-700 overflow-hidden">
        {/* Cover Image */}
        <Image
          src={coverImage.url ?? ''}
          alt={`Cover image for ${title}`}
          width={600}
          height={300}
          className="max-h-75 object-center object-cover"
        />

        {/* Content */}
        <div className="p-3">
          <header>
            <h2 className="text-bold text-lg">{title}</h2>
            <p className="ml-2">{summary}</p>
          </header>

          <ArticleMetadata
            intent="card"
            data={{ author, publishedAt, readTimeMins }}
            className="mt-auto"
          />
        </div>
      </article>
    </Link>
  )
}

export function ArticleCardSkeleton() {
  return <div className="rounded-md h-87.5 animate-pulse bg-gray-700" />
}
