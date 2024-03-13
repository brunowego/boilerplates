import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql'
import { type SessionCookieOptions, Lucia, TimeSpan } from 'lucia'

import { client } from '@acme/db'
import { tableNames, type Session, type User } from '@acme/db/schema'

const adapter = new PostgresJsAdapter(client, {
  user: tableNames.users,
  session: tableNames.sessions,
})

const sessionCookieOptions: SessionCookieOptions = {
  expires: true,
  attributes: {
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  },
}

export const auth = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(4, 'w'), // 4 weeks
  sessionCookie: sessionCookieOptions,
  getUserAttributes: ({ id, first_name, last_name }) => {
    return {
      id,
      first_name,
      last_name,
    }
  },
})

export type Auth = typeof auth

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth
    DatabaseUserAttributes: Pick<User, 'id' | 'first_name' | 'last_name'>
    DatabaseSessionAttributes: Session
  }
}

export type { User, Session } from 'lucia'
