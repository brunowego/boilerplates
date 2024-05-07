import type { DefaultSession, DefaultUser } from 'next-auth'
import type { JWT } from 'next-auth/jwt'

type UserSession = {
  id: string
  onboardingStep: string
}

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: UserSession & DefaultSession['user']
  }

  interface User extends UserSession, Omit<DefaultUser, 'id'> {}
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {} & UserSession
  }
}
