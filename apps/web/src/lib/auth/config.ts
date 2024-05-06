import type { NextAuthConfig } from 'next-auth'

import { getUserById } from '@acme/db/queries'
import { UserOnboardingStatus } from '@acme/db/schema'

import {
  CredentialsProvider,
  // ResendProvider,
  GitHubProvider,
  GoogleProvider,
  LinkedInProvider,
} from './providers'

export default {
  callbacks: {
    session({ session, token }) {
      if (token.user) {
        session.user = {
          ...session.user,
          onboardingStatus: token.user.onboardingStatus,
        }
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        const result = await getUserById(user.id as string)

        token.user = {
          ...(token.user ?? {}),
          onboardingStatus:
            result?.onboardingStatus ?? UserOnboardingStatus.PENDING_USERNAME,
        }
      }

      return token
    },
  },
  providers: [
    CredentialsProvider,
    // ResendProvider,
    GitHubProvider,
    GoogleProvider,
    LinkedInProvider,
  ],
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
