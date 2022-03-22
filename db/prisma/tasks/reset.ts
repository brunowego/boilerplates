import { prisma } from '../../../src/lib/prisma'

async function main() {
  await Promise.all([await prisma.user.deleteMany()])
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
