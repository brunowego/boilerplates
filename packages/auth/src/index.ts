import NextAuth, { type NextAuthConfig } from 'next-auth'

import { db } from '@acme/db'

import authConfig from './config'
import DrizzleAdapter from './drizzle-adapter'

const nextAuthConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/error',
    verifyRequest: '/verify-request',
    newUser: '/sign-up',
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
