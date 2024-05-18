import NextAuth from '@acme/auth'
import authConfig from '@acme/auth/config'

export const { auth: middleware } = NextAuth(authConfig)
