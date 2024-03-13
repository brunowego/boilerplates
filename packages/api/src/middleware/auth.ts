import { createMiddleware } from 'hono/factory'
import { getCookie } from 'hono/cookie'

import { auth } from '@acme/auth'

const authMiddleware = createMiddleware(async (c, next) => {
  const sessionId = getCookie(c, auth.sessionCookieName) ?? null

  if (!sessionId) {
    c.set('user', null)
    c.set('session', null)

    return next()
  }

  const { session, user } = await auth.validateSession(sessionId)

  if (session?.fresh) {
    c.header('Set-Cookie', auth.createSessionCookie(session.id).serialize(), {
      append: true,
    })
  }

  if (!session) {
    c.header('Set-Cookie', auth.createBlankSessionCookie().serialize(), {
      append: true,
    })
  }

  c.set('session', session)
  c.set('user', user)

  await next()
})

export default authMiddleware
