import { ARTICLE_STATUS_OPTIONS, MAX_SUMMARY_LENGTH } from '@/collections/Articles/constants'
import config from '@/payload.config'
import { faker } from '@faker-js/faker'
import { convertMarkdownToLexical, editorConfigFactory } from '@payloadcms/richtext-lexical'
import { warn } from 'console'
import { Payload } from 'payload'
import { slugify } from 'payload/shared'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'

const ARTICLES_COUNT = 5

export async function seedArticles(payload: Payload) {
  let successCount = 0

  for (let i = 0; i < ARTICLES_COUNT; i++) {
    try {
      const imageUrl = faker.image.urlPicsumPhotos()
      const image = await createMediaFromImageUrl(payload, imageUrl)
      if (!image) {
        warn("Stopped seeding article because image wasn't created")
        return
      }

      const title = faker.lorem.sentence()
      const content = faker.lorem.paragraph(3)
      const lexicalContent = convertMarkdownToLexical({
        markdown: content,
        editorConfig: await editorConfigFactory.default({ config: await config }),
      })

      const status = faker.helpers.arrayElement(Object.values(ARTICLE_STATUS_OPTIONS))

      await payload.create({
        collection: 'articles',
        data: {
          title,
          slug: slugify(title),
          content: lexicalContent,
          contentSummary: content.slice(0, MAX_SUMMARY_LENGTH - 3) + '...',
          coverImage: image.id,
          status,
          author: 2,
          ...(status === 'Published' && {
            publishedAt: faker.date.recent() as unknown as string,
          }),
        },
        draft: true,
      })
      successCount++
    } catch (error) {
      warn('Error while seeding article: ', error)
    }
  }
}
