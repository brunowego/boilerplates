import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'

import { signInSchema } from '@acme/db/schemas'
import { getUserByEmail } from '@acme/db/queries'

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

    const validPassword = await bcrypt.compare(
      password,
      existingUser.hashedPassword,
    )

    if (!validPassword) {
      return null
    }

    return { name: existingUser.name }
  },
})
