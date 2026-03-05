import { getPayloadClient } from '@/lib/payload/client'
import { seedAdmin } from './seeders/admin-seeder'
import { seedArticleAuthor } from './seeders/article-author-seeder'
import { seedArticles } from './seeders/article-seeder'

async function main() {
  const payload = await getPayloadClient()
  try {
    await seedAdmin(payload)
    await seedArticleAuthor(payload)
    await seedArticles(payload)
    process.exit(0)
  } catch (error) {
    console.error('Error while seeding operation', error)
  }
}

void main()
