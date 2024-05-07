import type { NextAuthConfig } from 'next-auth'

import {
  CredentialsProvider,
  // ResendProvider,
  GitHubProvider,
  GoogleProvider,
  LinkedInProvider,
} from './providers'

export default {
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
