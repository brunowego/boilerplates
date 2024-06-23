import type { DefaultJWT } from 'next-auth/jwt'
import NextAuth, { type NextAuthConfig } from 'next-auth'

import { db } from '@acme/db'

import DrizzleAdapter from './drizzle-adapter'
import authConfig from './config'

declare module 'next-auth' {
  interface User {
    workspaceId?: string
  }

  // interface Session extends DefaultSession {
  //   user: DefaultSession['user'] & {
  //     workspaceId?: string
  //   }
  // }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    workspaceId?: string
  }
}

// declare module '@auth/core/adapters' {
//   interface AdapterUser extends User {
//     workspaceId?: string
//   }
// }

const nextAuthConfig: NextAuthConfig = {
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          workspaceId: token.workspaceId,
        },
      }
    },
    jwt({ user, token, trigger, session }) {
      if (user) {
        token.workspaceId = user.workspaceId
      }

      if (trigger === 'update' && session?.workspaceId) {
        token.workspaceId = session.workspaceId
      }

      return token
    },
  },
  adapter: DrizzleAdapter(db),
  debug: process.env.NODE_ENV === 'development',
  ...authConfig,
}

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(nextAuthConfig)

export default NextAuth
