import NextAuth, { type NextAuthConfig } from 'next-auth'
import { DrizzleAdapter } from '@auth/drizzle-adapter'

import authConfig from './config'

import { db } from '@acme/db'
import {
  usersTable,
  accountsTable,
  sessionsTable,
  verificationTokensTable,
} from '@acme/db/schema'

const nextAuthConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/error',
    verifyRequest: '/verify-request',
    newUser: '/sign-up',
  },
  adapter: DrizzleAdapter(db, {
    usersTable,
    accountsTable,
    sessionsTable,
    verificationTokensTable,
  }),
  ...authConfig,
}

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(nextAuthConfig)

export default NextAuth
