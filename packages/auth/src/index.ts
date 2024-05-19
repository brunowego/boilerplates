import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth'

import { db, eq, usersTable } from '@acme/db'

import DrizzleAdapter from './drizzle-adapter'
import authConfig from './config'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      onboarded: boolean
    } & DefaultSession['user']
  }
}

const nextAuthConfig: NextAuthConfig = {
  callbacks: {
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.sub,
          onboarded: token.onboarded,
        },
      }
    },
    async jwt({ token }) {
      const existingUser = await db.query.usersTable.findFirst({
        columns: { id: true, onboarded: true },
        where: eq(usersTable.email, token.email as string),
      })

      return {
        ...token,
        onboarded: existingUser?.onboarded,
      }
    },
  },
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  ...authConfig,
}

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(nextAuthConfig)

export default NextAuth
