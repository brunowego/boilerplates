import { z } from 'zod'
import { faker } from '@faker-js/faker'

import { insertPageSchema } from './schemas'
import { pagesTable } from './schema'
import { db } from './db'

const extendedPageSchema = insertPageSchema.merge(
  z.object({
    createdAt: z.date().default(() => new Date()),
  }),
)

type InsertPage = z.infer<typeof extendedPageSchema>

async function seedPages(): Promise<void> {
  const pages: InsertPage[] = []

  for (let i = 0; i < 20; i++) {
    pages.push({
      title: `Product ${i}`,
      handle: `product-${i}`,
      data: {
        content: [
          {
            type: 'HowItWorksBlock',
            props: {
              title: `Product ${i}`,
            },
          },
        ],
        root: {},
        zones: {},
      },
      createdAt: faker.date.between({
        from: new Date('2020-01-01'),
        to: new Date(),
      }),
    })
  }

  await db.insert(pagesTable).values(pages).returning()
}

async function main(): Promise<void> {
  /**
   * Reset database
   */
  await db.delete(pagesTable)

  console.log('✔ Database reset')

  /**
   * Create pages
   */
  await seedPages()

  console.log('✔ Created pages')

  console.log('Database seeded successfully!')
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(async () => {
    process.exit()
  })
