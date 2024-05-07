import type { NextAuthConfig } from 'next-auth'

import { getUserById } from '@acme/db/queries'
import { UserOnboardingStep } from '@acme/db/schema'

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
          onboardingStep: token.user.onboardingStep,
        }
      }

      return session
    },
    async jwt({ token, user }) {
      if (user) {
        const result = await getUserById(user.id as string)

        token.user = {
          ...(token.user ?? {}),
          onboardingStep:
            result?.onboardingStep ?? UserOnboardingStep.PENDING_USERNAME,
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
