import { prisma } from '@/lib/prisma'

/**
 * Entry point of the reset script that is going to be executed asynchronously.
 *
 */
async function main() {
  await Promise.all([await prisma.user.deleteMany()])
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
