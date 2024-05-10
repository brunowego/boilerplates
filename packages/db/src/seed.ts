import { faker } from '@faker-js/faker'

import { insertWorkspaceSchema } from './schemas'
import { z } from 'zod'
import { workspacesTable } from './schema'
import { db } from './db'

const extendedWorkspaceSchema = insertWorkspaceSchema.merge(
  z.object({
    createdAt: z.date().default(() => new Date()),
  }),
)

type InsertWorkspace = z.infer<typeof extendedWorkspaceSchema>

async function seedWorkspaces(): Promise<void> {
  const workspaces: InsertWorkspace[] = []

  for (let i = 0; i < 5; i++) {
    const name = faker.company.name()

    workspaces.push({
      name,
      slug: faker.helpers.slugify(name).toLowerCase(),
      createdAt: faker.date.between({
        from: new Date('2020-01-01'),
        to: new Date(),
      }),
    })
  }

  await db.insert(workspacesTable).values(workspaces).returning()
}

async function main(): Promise<void> {
  /**
   * Reset database
   */
  await db.delete(workspacesTable)

  console.log('✔ Database reset')

  /**
   * Create workspaces
   */
  await seedWorkspaces()

  console.log('✔ Created workspaces')

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
