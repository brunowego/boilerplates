import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

import { db } from '@/db'
import { file, fileSelectSchema } from '@/db/schemas'
import { HttpException } from '@/http/exceptions'

import { isAuthenticated } from '../middlewares'

export const getFileDetails = new Elysia().use(isAuthenticated).get(
  '/:id',
  async ({ params }) => {
    const result = await db.query.file.findFirst({
      where: eq(file.id, params.id),
      columns: {
        id: true,
        name: true,
        url: true,
      },
    })

    if (!result) throw new HttpException('File not found', 404)

    return result
  },
  {
    response: t.Pick(fileSelectSchema, ['id', 'name', 'url']),
  },
)
