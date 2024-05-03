import CredentialsProvider from 'next-auth/providers/credentials'

export default CredentialsProvider({
  credentials: {
    email: {},
    password: {},
  },
})

// https://github.com/shpsyte/next-auth-v5/blob/main/auth.config.ts
