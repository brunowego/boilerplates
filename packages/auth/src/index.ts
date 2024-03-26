import { PostgresJsAdapter } from '@lucia-auth/adapter-postgresql'
import { type SessionCookieOptions, Lucia, TimeSpan } from 'lucia'

import { client } from '@acme/db'
import {
  tableNames,
  type SelectSession,
  type SelectUser,
} from '@acme/db/schema'

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
  getUserAttributes: ({ ...attributes }) => {
    return {
      id: attributes.id,
      email: attributes.email,
      first_name: attributes.firstName,
      last_name: attributes.lastName,
      full_name: attributes.lastName
        ? `${attributes.firstName} ${attributes.lastName}`
        : attributes.firstName,
      picture: attributes.picture,
    }
  },
})

export type Auth = typeof auth

declare module 'lucia' {
  interface Register {
    Lucia: typeof auth
    DatabaseUserAttributes: Pick<
      SelectUser,
      'id' | 'email' | 'firstName' | 'lastName' | 'picture'
    >
    DatabaseSessionAttributes: SelectSession
  }
}

export type { User, Session } from 'lucia'
