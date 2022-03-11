import { posts, tags } from '../data'
import { prisma } from '../../../src/lib/prisma'
import { randInt } from '../helpers'

async function main() {
  // eslint-disable-next-line no-console
  console.log('Start seeding ...')

  await Promise.all([
    posts.map(
      async (data) =>
        await prisma.post
          .upsert({
            where: {
              title: data.title,
            },
            update: {},
            create: data,
          })
          .catch(() => {})
    ),
    tags.map(
      async (data) =>
        await prisma.tag
          .upsert({
            where: {
              name: data.name,
            },
            update: {},
            create: data,
          })
          .catch(() => {})
    ),
  ])

  const postIds = (await prisma.post.findMany()).map((post) => post.id)
  const tagIds = (await prisma.tag.findMany()).map((tag) => tag.id)

  for (const _ in [...Array(60)].map((i) => i)) {
    await prisma.tagsOnPosts
      .create({
        data: {
          postId: postIds[randInt(0, postIds.length)],
          tagId: tagIds[randInt(0, tagIds.length)],
        },
      })
      .catch(() => {})
  }

  // eslint-disable-next-line no-console
  console.log('Seeding finished.')
}

main()
  .catch((err) => {
    console.error(err)

    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
