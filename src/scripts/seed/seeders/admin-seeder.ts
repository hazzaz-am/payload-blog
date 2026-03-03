import config from '@/payload.config'
import { getPayload } from 'payload'
import { isDuplicateError } from '../lib/is-duplicate-error'
import { env } from '@/lib/env';

export async function seedAdmin() {
  const payload = await getPayload({ config })
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
