import { z } from 'zod'
import { faker } from '@faker-js/faker'

import { insertDomainSchema } from './schemas'
import { domainsTable } from './schema'
import { db } from './db'

const extendedDomainSchema = insertDomainSchema.merge(
  z.object({
    createdAt: z.date().default(() => new Date()),
  }),
)

type InsertDomain = z.infer<typeof extendedDomainSchema>

async function seedDomains(): Promise<void> {
  const domains: InsertDomain[] = []

  for (let i = 0; i < 3; i++) {
    domains.push({
      domain: faker.internet.domainName(),
      createdAt: faker.date.between({
        from: new Date('2020-01-01'),
        to: new Date(),
      }),
    })
  }

  await db.insert(domainsTable).values(domains).returning()
}

async function main(): Promise<void> {
  /**
   * Reset database
   */
  await db.delete(domainsTable)

  console.log('✔ Database reset')

  /**
   * Create domains
   */
  await seedDomains()

  console.log('✔ Created domains')

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
