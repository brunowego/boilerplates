import type { NextAuthConfig } from 'next-auth'

import providers from './providers'

export default {
  providers,
  session: {
    strategy: 'jwt',
  },
} satisfies NextAuthConfig
