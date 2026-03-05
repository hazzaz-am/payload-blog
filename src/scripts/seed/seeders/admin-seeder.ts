import { env } from '@/lib/env'
import { Payload } from 'payload'
import { isDuplicateError } from '../lib/is-duplicate-error'

export async function seedAdmin(payload: Payload) {
  try {
    const response = await payload.create({
      collection: 'users',
      data: {
        email: env.CMS_SEED_ADMIN_EMAIL,
        password: env.CMS_SEED_ADMIN_PASSWORD,
      },
    })

    console.log('Admin created', response)
  } catch (error) {
    if (isDuplicateError(error, 'email')) {
      console.log('Admin already exists')
    } else {
      console.error('Error while seeding admin', JSON.stringify(error, null, 2))
    }
  }
}
