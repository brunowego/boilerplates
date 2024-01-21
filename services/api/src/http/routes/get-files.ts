import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

import { db } from '@/db'
import { file, fileSelectSchema } from '@/db/schemas'

import { isAuthenticated } from '../middlewares'

export const getFiles = new Elysia().use(isAuthenticated).get(
  '',
  async ({ user }) => {
    return await db.query.file.findMany({
      where: eq(file.userId, user?.id),
      orderBy: ({ createdAt }, { desc }) => [desc(createdAt)],
      columns: {
        id: true,
        name: true,
        url: true,
      },
    })
  },
  {
    response: t.Array(t.Pick(fileSelectSchema, ['id', 'name', 'url'])),
  },
)
