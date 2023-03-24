import NextAuth, { NextAuthOptions } from 'next-auth'

// FIXME: This is a workaround for URL mismatch in development
if (process.env.NODE_ENV === 'development') {
  process.env.NEXTAUTH_URL = 'http://127.0.0.1:3000'
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'dex',
      name: 'Dex',
      type: 'oauth',
      wellKnown: 'http://127.0.0.1:5556/.well-known/openid-configuration',
      authorization: {
        params: { scope: 'openid email profile offline_access groups' },
      },
      idToken: true,
      checks: ['pkce', 'state'],
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
        }
      },
      clientId: 'acme',
      clientSecret: 'ZXhhbXBsZS1hcHAtc2VjcmV0',
    },
  ],
}

export default NextAuth(authOptions)
