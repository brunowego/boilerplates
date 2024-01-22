import type Elysia from 'elysia'

import { jwt } from '@elysiajs/jwt'

import { env } from '@/env'

export const useJwt = (app: Elysia) =>
  app.use(
    jwt({
      secret: env.JWT_SECRET,
      exp: env.JWT_EXPIRATION,
    }),
  )
