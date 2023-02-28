import { appSeed } from '@/db/seeds'

import { prisma } from '@/lib/prisma'

async function main() {
  console.log('Start seeding ...')

  await seedDevData()

  console.log('Seeding finished.')
}

async function seedDevData() {
  console.warn('\x1b[33m Executing development seeds: \x1b[0m')

  Promise.all([await appSeed()])
}

main()
  .catch((e) => {
    console.error(e)

    process.exit(1)
  })
  .finally(async () => await prisma.$disconnect())
