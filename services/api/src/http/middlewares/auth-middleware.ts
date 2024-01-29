import { eq } from 'drizzle-orm'
import { MiddlewareHandler } from 'hono'
import { User } from 'lucia'

import { logger } from '@acme/logger'

import { db } from '@/db'
import { auth } from '@/lib/auth'
import { usersTable } from '@/db/schema'

import { ErrorResponse } from '../types'

const authMiddleware =
  (accessibleFor?: User['role'][]): MiddlewareHandler =>
  async (ctx, next) => {
    const cookieHeader = ctx.req.raw.headers.get('Cookie')
    const sessionId = auth.readSessionCookie(cookieHeader ?? '')

    if (!sessionId) {
      logger.warn('User not authenticated')

      const sessionCookie = auth.createBlankSessionCookie()
      ctx.header('Set-Cookie', sessionCookie.serialize())

      return ctx.json<ErrorResponse>(
        { success: false, error: 'Unauthorized' },
        401,
      )
    }

    const { session, user } = await auth.validateSession(sessionId)

    if (!session) {
      logger.warn('User not authenticated')

      const sessionCookie = auth.createBlankSessionCookie()
      ctx.header('Set-Cookie', sessionCookie.serialize())

      return ctx.json<ErrorResponse>(
        { success: false, error: 'Unauthorized' },
        401,
      )
    }

    if (accessibleFor && !accessibleFor.includes(user.role)) {
      logger.error(
        {
          userId: user.id,
          userName: user.username,
        },
        'User forbidden',
      )

      return ctx.json<ErrorResponse>(
        { success: false, error: 'Forbidden' },
        403,
      )
    }

    if (session?.fresh) {
      const sessionCookie = auth.createSessionCookie(session.id)
      ctx.header('Set-Cookie', sessionCookie.serialize())
    }

    // const method = ctx.req.method.toLowerCase()
    // const path = ctx.req.path

    // await db
    //   .update(usersTable)
    //   .set({
    //     lastSeenAt: new Date(),
    //     lastPostAt:
    //       method === 'post' || method === 'put' ? new Date() : undefined,
    //     lastVisitAt:
    //       method === 'get' && path === '/me' ? new Date() : undefined,
    //   })
    //   .where(eq(usersTable.id, user.id))

    ctx.set('user', user)

    logger.info(
      {
        userId: user.id,
        userName: user.username,
      },
      'User authenticated',
    )

    await next()
  }

export default authMiddleware
