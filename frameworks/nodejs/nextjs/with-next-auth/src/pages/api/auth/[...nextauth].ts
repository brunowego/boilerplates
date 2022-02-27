import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import FacebookProvider from 'next-auth/providers/facebook'
import type { NextApiRequest, NextApiResponse } from 'next'

const options: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
  ],
  theme: {
    colorScheme: 'light',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token }: { token: any }) {
      token.userRole = 'admin'

      return token
    },
  },
  debug: process.env.NODE_ENV === 'production' ? false : true,
}

const Auth = (req: NextApiRequest, res: NextApiResponse): Promise<void> =>
  NextAuth(req, res, options)

export default Auth
