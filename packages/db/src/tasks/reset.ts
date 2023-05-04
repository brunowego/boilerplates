import { prisma } from '../'

async function main(): Promise<void> {
  await Promise.all([await prisma.setting.deleteMany()])
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
