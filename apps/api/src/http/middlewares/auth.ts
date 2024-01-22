import type Elysia from 'elysia'

import { db } from '@/db'
import { user } from '@/db/schemas'
import { useCookie, useJwt } from '@/http/middlewares'

export const isAuthenticated = (app: Elysia) =>
  app
    .use(useCookie)
    .use(useJwt)

    .derive(async ({ cookie, jwt, set }) => {
      if (!cookie!.access_token) {
        set.status = 401

        return {
          success: false,
          message: 'Unauthorized',
          data: null,
        }
      }

      const { userId } = await jwt.verify(cookie.access_token)

      if (!userId) {
        set.status = 401

        return {
          success: false,
          message: 'Unauthorized',
          data: null,
        }
      }

      const result = await db.query.user.findFirst({
        where: eq(user.id, userId),
        columns: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
        },
      })

      if (!result?.id) {
        set.status = 401

        return {
          success: false,
          message: 'Unauthorized',
          data: null,
        }
      }

      return {
        user: result,
      }
    })
