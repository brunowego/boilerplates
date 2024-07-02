import { z } from 'zod'
import { insertUserSchema } from './schemas'
import { users } from './schema'
import { faker } from '@faker-js/faker'
import db from './db'

const extendedUserSchema = insertUserSchema.merge(
  z.object({
    createdAt: z.date().default(() => new Date()),
  }),
)

type InsertUser = z.infer<typeof extendedUserSchema>

async function seedUsers(): Promise<void> {
  const users: InsertUser[] = []

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.fullName()
    const lastName = faker.person.lastName()

    users.push({
      fullName: `${firstName} ${lastName}`,
      email: faker.internet.email({ firstName, lastName }).toLowerCase(),
      createdAt: faker.date.between({
        from: new Date('2020-01-01'),
        to: new Date(),
      }),
    })
  }

  await db.insert(users).values(users).returning()
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
