import { ARTICLE_AUTHOR_ROLES_OPTIONS } from '@/collections/ArticleAuthors/constants'
import { faker } from '@faker-js/faker'
import { warn } from 'console'
import { Payload } from 'payload'
import { createMediaFromImageUrl } from '../lib/create-media-from-image-url'

export async function seedArticleAuthor(payload: Payload) {
  try {
    const imageUrl = faker.image.personPortrait({ sex: 'male', size: 256 })
    const image = await createMediaFromImageUrl(payload, imageUrl)

    if (!image) {
      warn("Stopped seeding article author because image wasn't created")
      return
    }

    await payload.create({
      collection: 'article-authors',
      data: {
        name: faker.person.fullName(),
        role: ARTICLE_AUTHOR_ROLES_OPTIONS.STAFF_WRITER,
        avatar: image.id,
      },
    })
  } catch (error) {
    warn('Error while seeding article author: ', error)
  }
}
