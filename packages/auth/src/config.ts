import type { NextAuthConfig } from 'next-auth'

// import { generateId } from '@acme/id'

import {
  CredentialsProvider,
  GitHubProvider,
  GoogleProvider,
  LinkedInProvider,
} from './providers'

export default {
  providers: [
    CredentialsProvider,
    GitHubProvider,
    GoogleProvider,
    LinkedInProvider,
  ],
  session: {
    strategy: 'jwt',
    // maxAge: 7 * 24 * 60 * 60, // 30 days
    // updateAge: 24 * 60 * 60, // 24 hours
    // generateSessionToken: () => generateId(),
  },
  cookies: {
    sessionToken: {
      name: 'session_token',
    },
    callbackUrl: {
      name: 'callback_url',
    },
    csrfToken: {
      name: 'csrf_token',
    },
    pkceCodeVerifier: {
      name: 'pkce_code_verifier',
    },
  },
} satisfies NextAuthConfig
