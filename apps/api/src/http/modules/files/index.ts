import { type Elysia, t } from 'elysia'
import fs from 'node:fs/promises'
import path from 'node:path'

import { cron } from '@elysiajs/cron'
import { staticPlugin } from '@elysiajs/static'

import { db } from '@/db'
import { file } from '@/db/schemas'
import { HttpException } from '@/http/exceptions/http'
import { isAuthenticated } from '@/http/middlewares/auth'

const fileSchema = t.Object({
  id: t.String(),
  name: t.String(),
  url: t.String(),
})

const FIFTY_MEGABYTES = 50 * 1024 * 1024 // 50MB

export const initFileRoutes = (app: Elysia) =>
  app
    .use(
      staticPlugin({
        prefix: '/static',
        assets: './static',
      }),
    )

    .use(
      cron({
        pattern: '0 0 * * *', // Every day at 00:00
        name: 'deleteFiles',
        async run() {
          console.log('Deleting files')

          const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24 // 24 hours

          const files = await db.query.file.findMany({
            where: lte(
              file.createdAt,
              new Date(Date.now() - TWENTY_FOUR_HOURS),
            ),
          })

          await Promise.all(files.map((file) => fs.unlink(file.url)))

          const { count } = await db
            .delete(file)
            .where(
              lte(file.createdAt, new Date(Date.now() - TWENTY_FOUR_HOURS)),
            )

          console.log(`Deleted ${count} files`)
        },
      }),
    )

    .group('/files', (app) =>
      app
        .use(isAuthenticated)

        .get(
          '/',
          async ({ user }) => {
            return await db.query.file.findMany({
              where: eq(file.userId, user!.id),
              orderBy: ({ createdAt }, { desc }) => [desc(createdAt)],
            })
          },
          {
            response: t.Array(fileSchema),
          },
        )

        .get(
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
            response: fileSchema,
          },
        )

        .post(
          '/',
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
                userId: user!.id,
              })
              .returning()

            return result
          },
          {
            body: t.Object({
              filename: t.String(),
              file: t.File({
                maxSize: FIFTY_MEGABYTES,
              }),
            }),
            response: t.Object({
              id: t.String(),
              name: t.String(),
              url: t.String(),
              userId: t.String(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
            }),
          },
        )

        .delete('/:id', async ({ params, user, set }) => {
          const result = await db.query.file.findFirst({
            where: eq(file.id, params.id),
          })

          if (!result) throw new HttpException('File not found', 404)

          if (result.userId !== user!.id)
            throw new HttpException('File not found', 404)

          await fs.unlink(result.url)

          await db.delete(file).where(eq(file.id, params.id))

          set.status = 204
        })

        .get('/count', async ({ user }) => {
          const result = await db
            .select({ total: count(file.id) })
            .from(file)
            .where(eq(file.userId, user!.id))

          return result[0]
        }),
    )
