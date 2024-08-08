import { z } from 'zod'
import { faker } from '@faker-js/faker'

import { insertUserSchema, usersTable } from './schema'
import { db } from './db'

const extendedUserSchema = insertUserSchema.merge(
  z.object({
    createdAt: z.date().default(() => new Date()),
  }),
)

type InsertUser = z.infer<typeof extendedUserSchema>

async function seedUsers(): Promise<void> {
  const users: InsertUser[] = []

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    users.push({
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

  await db.insert(usersTable).values(users).returning()
}

async function main(): Promise<void> {
  /**
   * Reset database
   */
  await db.delete(usersTable)

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
