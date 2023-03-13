import { faker } from '@faker-js/faker'
import { userSeed } from '@/seeds'
import { prisma } from '@/lib/prisma'

/**
 * The entry point of the data seed script that is going to be executed asynchronously.
 *
 */
async function main() {
  console.log('Start seeding ...')

  faker.seed(1)

  await seedDevData()

  console.log('Seeding finished.')
}

/**
 * Asynchronously function that does the data seed for development
 *
 */
async function seedDevData(): Promise<void> {
  console.warn('\x1b[33m Executing development seeds: \x1b[0m')

  await userSeed()
}

/**
 * Executing  the data seed script asynchronously and handling eventual errors
 *
 * @function
 * @name main
 * @returns {Promise<void>}
 */
main()
  .catch((e) => {
    console.error(e)

    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
