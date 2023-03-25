import NextAuth, { NextAuthOptions } from 'next-auth'
import { DEX } from '@/constants/env'

// FIXME: This is a workaround for URL mismatch in development
if (process.env.NODE_ENV === 'development') {
  process.env.NEXTAUTH_URL = 'http://127.0.0.1:3001'
}

export const authOptions: NextAuthOptions = {
  providers: [
    {
      id: 'dex',
      name: 'Dex',
      type: 'oauth',
      wellKnown: `${DEX.ISSUER}/.well-known/openid-configuration`,
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
      clientId: DEX.CLIENT_ID,
      clientSecret: DEX.CLIENT_SECRET,
    },
  ],
}

export default NextAuth(authOptions)
