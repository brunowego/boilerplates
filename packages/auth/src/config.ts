import type { NextAuthConfig } from 'next-auth'

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
