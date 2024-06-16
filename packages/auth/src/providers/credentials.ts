import CredentialsProvider from 'next-auth/providers/credentials'

import { signInSchema, getUserByEmail } from '@acme/db'

import { compare } from '../lib/bcryptjs'

export default CredentialsProvider({
  credentials: {
    email: {},
    password: {},
  },
  async authorize(credentials) {
    const { email, password } = await signInSchema.parseAsync(credentials)

    const existingUser = await getUserByEmail(email)

    if (!existingUser?.hashedPassword) {
      return null
    }

    const validPassword = await compare(password, existingUser.hashedPassword)

    if (!validPassword) {
      return null
    }

    return { name: existingUser.fullName }
  },
})
