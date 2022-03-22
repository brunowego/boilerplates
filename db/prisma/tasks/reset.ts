import { prisma } from '../../../src/lib/prisma'

async function main() {
  await Promise.all([
    await prisma.tagsOnPosts.deleteMany(),
    await prisma.post.deleteMany(),
    await prisma.tag.deleteMany(),
  ])
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
