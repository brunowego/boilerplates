import { eq } from 'drizzle-orm'
import { Elysia, t } from 'elysia'

import { db } from '@/db'
import { user } from '@/db/schemas'
import { hashPassword, md5hash } from '@/lib/bcrypt'
import { getGravatar } from '@/lib/gravatar'

export const signUp = new Elysia().post(
  '/sign-up',
  async ({ body, set }) => {
    const { username, email, firstName, lastName, password } = body

    const emailExists = await db.query.user.findFirst({
      where: eq(user.email, email),
      columns: {
        id: true,
      },
    })

    if (emailExists) {
      set.status = 400

      return {
        success: false,
        data: null,
        message: 'Email address already in use.',
      }
    }

    const usernameExists = await db.query.user.findFirst({
      where: eq(user.username, username),
      columns: {
        id: true,
      },
    })

    if (usernameExists) {
      set.status = 400

      return {
        success: false,
        data: null,
        message: 'Someone already taken this username.',
      }
    }

    const { hash, salt } = await hashPassword(password)

    const [result] = await db
      .insert(user)
      .values({
        username,
        email,
        firstName,
        lastName,
        avatar: getGravatar(md5hash(email)),
        hash,
        salt,
      })
      .returning({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        avatar: user.avatar,
      })

    return {
      success: true,
      message: 'Account created.',
      data: {
        ...result,
      },
    }
  },
  {
    body: t.Object({
      username: t.String(),
      email: t.String(),
      firstName: t.String(),
      lastName: t.String(),
      password: t.String(),
    }),
  },
)
