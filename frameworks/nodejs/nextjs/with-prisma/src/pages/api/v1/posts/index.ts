import { z } from 'zod'
import type { NextApiHandler } from 'next'
import { prisma } from '@/lib/prisma'

const postSchema = z.object({
  title: z.string(),
  body: z.string(),
})

const get: NextApiHandler = async ({ query }, res) => {
  try {
    const { page = 1, items = 5 } = query
    const take = Math.max(1, +(items as string))
    const skip = take * Math.max(0, +(page as string) - 1)

    const [total, posts] = await prisma.$transaction([
      prisma.post.count(),
      prisma.post.findMany({
        take,
        skip,
        orderBy: {
          createdAt: 'desc',
        },
        include: {
          _count: {
            select: {
              tags: true,
            },
          },
          tags: true,
        },
      }),
    ])

    res.status(200).json({
      total,
      maxPages: Math.ceil(total / take),
      posts,
    })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error })
  }
}

const post: NextApiHandler = async ({ body }, res) => {
  const data = postSchema.parse(body)

  try {
    const resp = await prisma.post.create({
      data,
    })

    res.status(201).json(resp)
  } catch (error) {
    console.error(error)

    res.status(500).json(error)
  }
}

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await get(req, res)
      break
    case 'POST':
      await post(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'POST'])
      res.status(405).end()
      break
  }
}

export default handler
