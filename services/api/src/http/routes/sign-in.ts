import { eq, or } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

import { db } from '@/db'
import { user } from '@/db/schemas'
import { useCookie, useJwt } from '@/http/middlewares'
import { comparePassword } from '@/lib/bcrypt'

export const signIn = new Elysia()
  .use(useJwt)
  .use(useCookie)
  .post(
    '/sign-in',
    async ({ body, set, jwt, setCookie }) => {
      const { username, password } = body

      const result = await db.query.user.findFirst({
        where: or(eq(user.email, username), eq(user.username, username)),
        columns: {
          id: true,
          hash: true,
          salt: true,
        },
      })

      if (!result) {
        set.status = 400

        return {
          success: false,
          data: null,
          message: 'Invalid credentials',
        }
      }

      const match = await comparePassword(password, result.salt, result.hash)

      if (!match) {
        set.status = 400

        return {
          success: false,
          data: null,
          message: 'Invalid credentials',
        }
      }

      const accessToken = await jwt.sign({
        userId: result.id,
      })

      const refreshToken = await jwt.sign({
        userId: result.id,
      })

      setCookie('access_token', accessToken, {
        httpOnly: true,
        maxAge: 15 * 60, // 15 minutes
        path: '/',
      })

      setCookie('refresh_token', refreshToken, {
        httpOnly: true,
        maxAge: 86400 * 7, // 7 days
        path: '/',
      })

      return {
        success: true,
        data: null,
        message: 'Account login successfully.',
      }
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    },
  )
