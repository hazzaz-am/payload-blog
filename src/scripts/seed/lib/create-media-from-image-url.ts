import { faker } from '@faker-js/faker'
import { warn } from 'console'
import { Payload } from 'payload'

export async function createMediaFromImageUrl(payload: Payload, imageUrl: string) {
  try {
    const res = await fetch(imageUrl)
    const arrBuffer = await res.arrayBuffer()
    const buffer = Buffer.from(arrBuffer)

    const mimetype = res.headers.get('Content-type') || 'image/jpeg'
    const filesize = buffer.length
    const filename = res.url.split('/').pop()?.split('?')[0]

    if (!filename) throw new Error('Filename not found')

    return await payload.create({
      collection: 'media',
      draft: true,
      data: {
        alt: faker.lorem.words(3),
      },
      file: {
        data: buffer,
        mimetype,
        name: filename,
        size: filesize,
      },
    })
  } catch (error) {
    warn('Error while creating media from image url: ', error)
  }
}
