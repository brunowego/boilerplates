import { Elysia, t } from 'elysia'
import path from 'node:path'

import { db } from '@/db'
import { file, fileSelectSchema } from '@/db/schemas'

import { isAuthenticated } from '../middlewares'

const FIFTY_MEGABYTES = 50 * 1024 * 1024 // 50MB

export const createFile = new Elysia().use(isAuthenticated).post(
  '',
  async ({ body, user }) => {
    const filename = `${crypto.randomUUID()}_${body.file.name.replaceAll(
      ' ',
      '_',
    )}`

    const filePath = path.join('static', 'files', filename)

    await Bun.write(filePath, await body.file.arrayBuffer())

    const [result] = await db
      .insert(file)
      .values({
        name: body.filename,
        url: filePath,
        userId: user?.id,
      })
      .returning({
        id: file.id,
        name: file.name,
        url: file.url,
      })

    return result
  },
  {
    body: t.Object({
      filename: t.String(),
      file: t.File({
        maxSize: FIFTY_MEGABYTES,
      }),
    }),
    response: t.Pick(fileSelectSchema, ['id', 'name', 'url']),
  },
)
