import { Argon2id } from 'oslo/password'
import { config } from '@acme/config'
import postgres from 'postgres'
import { eq } from 'drizzle-orm'
import { createDate, TimeSpan, isWithinExpirationDate } from 'oslo'
import {
  EmailVerificationEmail,
  ResetPasswordEmail,
  sendEmail,
} from '@acme/email'

import { CustomHono, ErrorResponse } from '@/http/types'
import { generateId } from '@acme/id'
import { logger } from '@acme/logger'

import {
  signUpRoute,
  sendVerificationEmailRoute,
  signInRoute,
  verifyEmailRoute,
  signOutRoute,
  checkEmailRoute,
  resetPasswordRoute,
  resetPasswordCallbackRoute,
} from './schema'
import { checkUsernameRoute } from '../users/schema'
import { usersTable, tokensTable } from '@/db/schema'
import { db } from '@/db'
import { transformDatabaseUser } from '@/http/lib/transform-database-user'
import { auth } from '@/lib/auth'

const app = new CustomHono()

export const authRoutes = app
  .openapi(signUpRoute, async (ctx) => {
    const { email, password } = ctx.req.valid('json')

    const hashedPassword = await new Argon2id().hash(password)
    const userId = generateId()

    const username = email.split('@')[0].toLowerCase()

    const response = await fetch(
      `${
        config.backendUrl +
        checkUsernameRoute.path.replace('{username}', username)
      }`,
      {
        method: checkUsernameRoute.method,
      },
    )

    const { data: usernameExists } = (await response.json()) as {
      data: boolean
    }

    try {
      const [user] = await db
        .insert(usersTable)
        .values({
          id: userId,
          email: email.toLowerCase(),
          username: usernameExists ? `${username}-${userId}` : username,
          firstName: username,
          hashedPassword,
        })
        .returning()

      await fetch(config.backendUrl + sendVerificationEmailRoute.path, {
        method: sendVerificationEmailRoute.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      return ctx.json({
        success: true,
        data: transformDatabaseUser(user),
      })
    } catch (error) {
      if (
        error instanceof postgres.PostgresError &&
        error.message.startsWith('duplicate key')
      ) {
        logger.error((error as Error).message)

        return ctx.json(
          {
            success: false,
            error: 'Email already exists',
          },
          400,
        )
      }

      throw error
    }
  })

  .openapi(verifyEmailRoute, async (ctx) => {
    const { resend } = ctx.req.valid('query')
    const verificationToken = ctx.req.valid('param').token

    const [token] = await db
      .select()
      .from(tokensTable)
      .where(eq(tokensTable.id, verificationToken))

    if (!token || !token.userId || !isWithinExpirationDate(token.expiresAt)) {
      if (resend === 'true' && token && token.email) {
        fetch(config.backendUrl + sendVerificationEmailRoute.path, {
          method: sendVerificationEmailRoute.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: token.email,
          }),
        })

        await db
          .delete(tokensTable)
          .where(eq(tokensTable.id, verificationToken))

        return ctx.json({
          success: true,
        })
      }

      return ctx.json(
        {
          success: false,
          error: 'Invalid token or expired',
        },
        400,
      )
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, token.userId))

    if (!user || user.email !== token.email) {
      if (resend === 'true' && token && token.email) {
        fetch(config.backendUrl + sendVerificationEmailRoute.path, {
          method: sendVerificationEmailRoute.method,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: token.email,
          }),
        })

        await db
          .delete(tokensTable)
          .where(eq(tokensTable.id, verificationToken))

        return ctx.json({
          success: true,
        })
      }

      return ctx.json(
        {
          success: false,
          error: 'Invalid token or expired',
        },
        400,
      )
    }

    await db
      .update(usersTable)
      .set({
        emailVerified: true,
      })
      .where(eq(usersTable.id, user.id))

    await db.delete(tokensTable).where(eq(tokensTable.id, verificationToken))

    const session = await auth.createSession(user.id, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    ctx.header('Set-Cookie', sessionCookie.serialize())

    logger.info('Email verified and user signed in')

    return ctx.json({
      success: true,
    })
  })

  .openapi(sendVerificationEmailRoute, async (ctx) => {
    const { email } = ctx.req.valid('json')

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))

    if (!user) {
      return ctx.json(
        {
          success: false,
          error: 'No email found',
        },
        400,
      )
    }

    await db.delete(tokensTable).where(eq(tokensTable.userId, user.id))

    const verificationToken = generateId()

    await db.insert(tokensTable).values({
      id: verificationToken,
      userId: user.id,
      email,
      expiresAt: createDate(new TimeSpan(2, 'h')),
    })

    await sendEmail({
      to: email,
      subject: 'Verify your email on Acme',
      react: EmailVerificationEmail({
        firstName: user.firstName,
        verificationLink: `${config.backendUrl}/verify-email/${verificationToken}`,
      }),
    })

    logger.info('Verification email sent')

    return ctx.json({
      success: true,
    })
  })

  .openapi(checkEmailRoute, async (ctx) => {
    const { email } = ctx.req.valid('json')

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))

    return ctx.json({
      success: true,
      data: {
        exists: !!user,
      },
    })
  })

  .openapi(resetPasswordRoute, async (ctx) => {
    const { email } = ctx.req.valid('json')

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))

    if (!user || !user.emailVerified) {
      return ctx.json(
        {
          success: false,
          error: 'Invalid email',
        },
        400,
      )
    }

    await db.delete(tokensTable).where(eq(tokensTable.userId, user.id))

    const verificationToken = generateId()

    await db.insert(tokensTable).values({
      id: verificationToken,
      userId: user.id,
      email,
      expiresAt: createDate(new TimeSpan(2, 'h')),
    })

    await sendEmail({
      to: email,
      subject: 'Reset Acme password',
      react: ResetPasswordEmail({
        firstName: user.firstName,
        resetPasswordLink: `${config.backendUrl}/reset-password/${verificationToken}`,
      }),
    })

    logger.info(
      {
        userId: user.id,
        userName: user.username,
      },
      'Reset pasword link sent',
    )

    return ctx.json({
      success: true,
      data: undefined,
    })
  })

  .openapi(resetPasswordCallbackRoute, async (ctx) => {
    const { password } = ctx.req.valid('json')
    const verificationToken = ctx.req.valid('param').token

    const [token] = await db
      .select()
      .from(tokensTable)
      .where(eq(tokensTable.id, verificationToken))
    await db.delete(tokensTable).where(eq(tokensTable.id, verificationToken))

    if (!token || !token.userId || !isWithinExpirationDate(token.expiresAt)) {
      return ctx.json(
        {
          success: false,
          error: 'Invalid token',
        },
        400,
      )
    }

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, token.userId))

    if (!user || user.email !== token.email) {
      return ctx.json(
        {
          success: false,
          error: 'Invalid token',
        },
        400,
      )
    }

    await auth.invalidateUserSessions(user.id)
    const hashedPassword = await new Argon2id().hash(password)

    await db
      .update(usersTable)
      .set({
        hashedPassword,
      })
      .where(eq(usersTable.id, user.id))

    const session = await auth.createSession(user.id, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    ctx.header('Set-Cookie', sessionCookie.serialize())

    logger.info(
      {
        userId: user.id,
        userName: user.username,
      },
      'Password reset and user signed in',
    )

    return ctx.json({
      success: true,
      data: undefined,
    })
  })

  .openapi(signInRoute, async (ctx) => {
    const { email, password } = ctx.req.valid('json')

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email.toLowerCase()))

    if (!user || !user.hashedPassword) {
      return ctx.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        400,
      )
    }

    const validPassword = await new Argon2id().verify(
      user.hashedPassword,
      password,
    )

    if (!validPassword) {
      return ctx.json(
        {
          success: false,
          error: 'Invalid email or password',
        },
        400,
      )
    }

    if (!user.emailVerified) {
      fetch(config.backendUrl + sendVerificationEmailRoute.path, {
        method: sendVerificationEmailRoute.method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
        }),
      })

      return ctx.redirect(`${config.backendUrl}/verify-email`)
    }

    const session = await auth.createSession(user.id, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    await db
      .update(usersTable)
      .set({
        lastSignInAt: new Date(),
      })
      .where(eq(usersTable.id, user.id))

    ctx.header('Set-Cookie', sessionCookie.serialize())

    logger.info('User signed in')

    return ctx.json({
      success: true,
      data: transformDatabaseUser(user),
    })
  })

  .openapi(signOutRoute, async (ctx) => {
    const cookieHeader = ctx.req.raw.headers.get('Cookie')
    const sessionId = auth.readSessionCookie(cookieHeader ?? '')

    if (!sessionId) {
      logger.info('User not authenticated')

      const sessionCookie = auth.createBlankSessionCookie()
      ctx.header('Set-Cookie', sessionCookie.serialize())

      return ctx.json<ErrorResponse>(
        { success: false, error: 'Unauthorized' },
        401,
      )
    }

    const { session } = await auth.validateSession(sessionId)

    if (!session) {
      logger.info('User not authenticated')

      const sessionCookie = auth.createBlankSessionCookie()

      ctx.header('Set-Cookie', sessionCookie.serialize())

      return ctx.json({ success: false, error: 'Unauthorized' }, 401)
    }

    await auth.invalidateSession(session.id)

    ctx.header('Set-Cookie', auth.createBlankSessionCookie().serialize())

    logger.info('User signed out')

    return ctx.json({ success: true, data: undefined })
  })
