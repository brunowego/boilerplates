import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql'
import { type SessionCookieOptions, Lucia, TimeSpan } from 'lucia'

import { client } from '@/db'
import { User, tableNames } from '@/db/schema'
import { env } from '@/env'

const adapter = new PostgresJsAdapter(client, {
  user: tableNames.users,
  session: tableNames.sessions,
})

const sessionCookieOptions: SessionCookieOptions = {
  expires: true,
  attributes: {
    sameSite: 'lax',
    secure: env.NODE_ENV === 'production',
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

// interface DatabaseUserAttributes {
//   email: string
//   username: string
//   firstName: string
//   lastName: string
// }

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth
    DatabaseUserAttributes: User
  }
}
