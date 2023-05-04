import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main(): Promise<void> {
  await Promise.all([await prisma.setting.deleteMany(), await prisma.user.deleteMany()])
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
