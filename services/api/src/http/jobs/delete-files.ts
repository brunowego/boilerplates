import { lte } from 'drizzle-orm'
import { Elysia } from 'elysia'
import fs from 'node:fs/promises'

import { cron } from '@elysiajs/cron'

import { db } from '@/db'
import { file } from '@/db/schemas'

export const deleteFilesJob = new Elysia()
  .decorate('getDate', () => Date())

  .use(
    cron({
      pattern: '0 0 * * *', // Every day at 00:00
      name: 'deleteFiles',
      async run() {
        console.log('Deleting files')

        const TWENTY_FOUR_HOURS = 1000 * 60 * 60 * 24 // 24 hours

        const files = await db.query.file.findMany({
          where: lte(file.createdAt, new Date(Date.now() - TWENTY_FOUR_HOURS)),
        })

        await Promise.all(files.map((file) => fs.unlink(file.url)))

        const { count } = await db
          .delete(file)
          .where(lte(file.createdAt, new Date(Date.now() - TWENTY_FOUR_HOURS)))

        console.log(`Deleted ${count} files.`)
      },
    }),
  )

  .get(
    '/stop',
    ({
      getDate,
      store: {
        cron: { deleteFiles },
      },
    }) => {
      deleteFiles.stop()

      const stopDate = getDate().toString()
      console.log(`Deleting files stopped at ${stopDate}.`)

      return 'Stop deleting files.'
    },
  )
