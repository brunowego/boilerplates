import type { NextAuthConfig } from 'next-auth'

import {
  HttpEmailProvider,
  GitHubProvider,
  GoogleProvider,
  LinkedInProvider,
} from './providers'

export default {
  providers: [
    HttpEmailProvider,
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
