import type { Session } from 'lucia'
import type { NextApiRequest, NextApiResponse } from 'next'

import { getSession } from '@acme/auth'

import { type Db, db } from '../lib/db'

type CreateContextOptions = {
  db: Db
  session: Session | null
  req: NextApiRequest
  res: NextApiResponse
}

export const createContext = async (opts: CreateContextOptions) => {
  return {
    db,
    session: await getSession(),
    req: opts.req,
    res: opts.res,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
