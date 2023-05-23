import prisma, { User } from '@acme/db'
import { protect } from '@/lib/protected-route'
import type { NextApiRequest, NextApiResponse } from 'next'

type Data =
  | {
      users: User[]
    }
  | {
      error: string
    }

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const data = await protect(req, res, 'read:all', 'user', (session) => ({
    id: session.userId,
  }))

  if (!data) return res.status(500).send({ error: "Couldn't load user data" })
  if (data instanceof Error) return // protect already sent the error response

  const users = await prisma.user.findMany()

  res.json({ users })
}
