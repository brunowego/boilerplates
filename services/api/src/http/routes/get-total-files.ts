import { eq, count } from 'drizzle-orm'
import { Elysia } from 'elysia'

import { db } from '@/db'
import { file } from '@/db/schemas'

import { isAuthenticated } from '../middlewares'

export const getTotalFiles = new Elysia()
  .use(isAuthenticated)
  .get('/count', async ({ user }) => {
    const result = await db
      .select({ total: count(file.id) })
      .from(file)
      .where(eq(file.userId, user?.id))

    return result[0]
  })
