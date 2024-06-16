import NextAuth, { type NextAuthConfig } from 'next-auth'

import { db } from '@acme/db'

import DrizzleAdapter from './drizzle-adapter'
import authConfig from './config'

const nextAuthConfig: NextAuthConfig = {
  // @ts-ignore
  adapter: DrizzleAdapter(db),
  ...authConfig,
}

export const {
  auth,
  handlers: { GET, POST },
} = NextAuth(nextAuthConfig)

export default NextAuth
