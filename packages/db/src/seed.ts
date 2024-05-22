import { usersTable } from './schema'
import { faker } from '@faker-js/faker'
import { db } from './db'

async function seedUsers(): Promise<void> {
  await db
    .insert(usersTable)
    .values({
      fullName: faker.person.fullName(),
      image: '/static/img/man.jpg',
    })
    .returning()
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
