import { eq, or } from 'drizzle-orm'
import { type Elysia, t } from 'elysia'

import { db } from '@/db'
import { user } from '@/db/schemas'
import { useCookie, useJwt } from '@/http/middlewares'
import { isAuthenticated } from '@/http/middlewares/auth'
import { comparePassword, hashPassword, md5hash } from '@/lib/bcrypt'
import { getGravatar } from '@/lib/gravatar'

export const initAuthRoutes = (app: Elysia) =>
  app.group('/auth', (app) =>
    app
      .use(useJwt)
      .use(useCookie)

      .post(
        '/sign-up',
        async ({ body, set }) => {
          const { username, email, firstName, lastName, password } = body

          const emailExists = await db.query.user.findFirst({
            where: eq(user.email, email),
            columns: {
              id: true,
            },
          })

          if (emailExists) {
            set.status = 400

            return {
              success: false,
              data: null,
              message: 'Email address already in use.',
            }
          }

          const usernameExists = await db.query.user.findFirst({
            where: eq(user.username, username),
            columns: {
              id: true,
            },
          })

          if (usernameExists) {
            set.status = 400

            return {
              success: false,
              data: null,
              message: 'Someone already taken this username.',
            }
          }

          const { hash, salt } = await hashPassword(password)

          const newUser = await db.insert(user).values({
            username,
            email,
            firstName,
            lastName,
            avatar: getGravatar(md5hash(email)),
            hash,
            salt,
          })

          return {
            success: true,
            message: 'Account created.',
            data: {
              user: newUser,
            },
          }
        },
        {
          body: t.Object({
            username: t.String(),
            email: t.String(),
            firstName: t.String(),
            lastName: t.String(),
            password: t.String(),
          }),
        },
      )

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

          const match = await comparePassword(
            password,
            result.salt,
            result.hash,
          )

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

      .use(isAuthenticated)

      .get('/me', ({ user }) => {
        return user
      }),
  )
