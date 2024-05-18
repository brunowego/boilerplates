import NextAuth, { type NextAuthConfig } from 'next-auth'

import authConfig from './config'

import { db } from '@acme/db'

import DrizzleAdapter from './drizzle-adapter'

const nextAuthConfig: NextAuthConfig = {
  pages: {
    signIn: '/sign-in',
    signOut: '/sign-out',
    error: '/error',
    verifyRequest: '/verify-request',
    newUser: '/',
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
