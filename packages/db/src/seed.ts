import { z } from 'zod'
import { faker } from '@faker-js/faker'

import { insertUserSchema } from './schemas'
import db from './db'
import { users } from './schema'

const extendedUserSchema = insertUserSchema.merge(
  z.object({
    createdAt: z.date().default(() => new Date()),
  }),
)

type InsertUser = z.infer<typeof extendedUserSchema>

async function seedUsers(): Promise<void> {
  const values: InsertUser[] = []

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    values.push({
      firstName,
      lastName,
      username: faker.internet.userName({ firstName, lastName }).toLowerCase(),
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      createdAt: faker.date.between({
        from: new Date('2020-01-01'),
        to: new Date(),
      }),
    })
  }

  await db.insert(users).values(values).returning()
}

async function main(): Promise<void> {
  /**
   * Reset database
   */
  await db.delete(users)

  console.log('✔ Database reset')

  /**
   * Create users
   */
  await seedUsers()

  console.log('✔ Created users')

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
