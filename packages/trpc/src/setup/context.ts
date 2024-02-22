import type { User } from 'lucia'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from '@acme/auth'

import { type Db, db } from '../lib/db'

type CreateContextOptions = {
  db: Db
  user: User | null
  req: NextApiRequest
  res: NextApiResponse
}

export const createContext = async (opts: CreateContextOptions) => {
  const { user } = await getSession()

  return {
    db,
    user,
    req: opts.req,
    res: opts.res,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
