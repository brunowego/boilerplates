import { z } from 'zod'
import type { NextApiHandler } from 'next'
import { prisma } from '@/lib/prisma'

const QueryIdSchema = z.object({
  id: z.string(),
})

const postSchema = z.object({
  title: z.string(),
  body: z.string(),
})

const get: NextApiHandler = async ({ query }, res) => {
  const { id } = QueryIdSchema.parse(query)

  try {
    const post = await prisma.post.findUnique({ where: { id } })

    res.status(200).json(post)
  } catch (error) {
    console.error(error)

    res.status(500).json({ error })
  }
}

const put: NextApiHandler = async ({ query, body }, res) => {
  const { id } = QueryIdSchema.parse(query)
  const data = postSchema.parse(body)

  try {
    await prisma.post.update({
      where: { id },
      data,
    })

    res.status(201).json({ success: true })
  } catch (error) {
    console.error(error)

    res.status(500).json(error)
  }
}

const del: NextApiHandler = async ({ query }, res) => {
  const { id } = QueryIdSchema.parse(query)

  if (!id) {
    return res.status(404).json({ success: false })
  }

  try {
    await prisma.post.delete({
      where: { id },
    })

    return res.status(204).json({ success: true })
  } catch (error) {
    console.error(error)

    res.status(500).json({ error })
  }
}

const handler: NextApiHandler = async (req, res) => {
  switch (req.method) {
    case 'GET':
      await get(req, res)
      break
    case 'PUT':
      await put(req, res)
      break
    case 'DELETE':
      await del(req, res)
      break
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end()
      break
  }
}

export default handler
