import { prisma } from '@/lib/prisma'

async function main() {
  await Promise.all([await prisma.app.deleteMany()])
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
