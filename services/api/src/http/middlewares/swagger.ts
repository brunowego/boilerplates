import type Elysia from 'elysia'

import { swagger } from '@elysiajs/swagger'

import { name as title, version } from '../../../package.json'

export const useSwagger = (app: Elysia) =>
  app.use(
    swagger({
      documentation: {
        info: {
          title,
          version,
        },
      },
    }),
  )
