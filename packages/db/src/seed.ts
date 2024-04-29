import { productsTable } from './schema'
import { db } from './db'

async function seedProducts(): Promise<void> {
  await db.insert(productsTable).values({
    id: 'sxQ2itlspvsb2eL',
  })
}

async function main(): Promise<void> {
  /**
   * Reset database
   */
  await db.delete(productsTable)

  console.log('✔ Database reset')

  /**
   * Create products
   */
  await seedProducts()

  console.log('✔ Created products')

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
