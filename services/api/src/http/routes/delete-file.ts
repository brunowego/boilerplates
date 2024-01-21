import { eq } from 'drizzle-orm'
import { Elysia } from 'elysia'
import fs from 'node:fs/promises'

import { db } from '@/db'
import { file } from '@/db/schemas'
import { HttpException } from '@/http/exceptions'

import { isAuthenticated } from '../middlewares'

export const deleteFile = new Elysia()
  .use(isAuthenticated)
  .delete('/:id', async ({ params, user, set }) => {
    const result = await db.query.file.findFirst({
      where: eq(file.id, params.id),
    })

    if (!result) throw new HttpException('File not found', 404)

    if (result.userId !== user?.id)
      throw new HttpException('File not found', 404)

    await fs.unlink(result.url)

    await db.delete(file).where(eq(file.id, params.id))

    set.status = 204
  })
