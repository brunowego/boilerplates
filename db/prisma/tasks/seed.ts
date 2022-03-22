import { users } from '../data'
import { prisma } from '../../../src/lib/prisma'

async function main() {
  // eslint-disable-next-line no-console
  console.log('Start seeding ...')

  await Promise.all([
    users.map(
      async (data) =>
        await prisma.user
          .create({
            data,
          })
          .catch(() => {})
    ),
  ])

  // eslint-disable-next-line no-console
  console.log('Seeding finished.')
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
