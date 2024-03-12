import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql'
import { type SessionCookieOptions, Lucia, TimeSpan } from 'lucia'

import { client } from '@/lib/db'
import { tableNames, type Session, type User } from '@/lib/db/schema'
import { serverEnv as senv } from '@/env/server'

const adapter = new PostgresJsAdapter(client, {
  user: tableNames.users,
  session: tableNames.sessions,
})

const sessionCookieOptions: SessionCookieOptions = {
  expires: true,
  attributes: {
    sameSite: 'lax',
    secure: senv.NODE_ENV === 'production',
  },
}

export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(4, 'w'), // 4 weeks
  sessionCookie: sessionCookieOptions,
  getUserAttributes: ({ ...attributes }) => {
    return attributes
  },
})

export type Auth = typeof auth

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth
    DatabaseUserAttributes: User
    DatabaseSessionAttributes: Session
  }
}
