import { cache } from 'react'
import type { User, Session } from 'lucia'
import { cookies } from 'next/headers'

import { auth } from '@/lib/auth'

export interface SessionObject {
  user: User | null
  session: Session | null
}

export const getSession = async (): Promise<SessionObject> => {
  const sessionId = cookies().get(auth.sessionCookieName)?.value ?? null

  if (!sessionId) {
    return {
      user: null,
      session: null,
    }
  }

  const result = await auth.validateSession(sessionId)

  try {
    if (result.session?.fresh) {
      const sessionCookie = auth.createSessionCookie(result.session.id)

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
    }

    if (!result.session) {
      const sessionCookie = auth.createBlankSessionCookie()

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      )
    }
  } catch {
    // empty
  }

  return result
}

export const getCachedSession = cache(getSession)
