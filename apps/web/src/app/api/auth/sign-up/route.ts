import { z } from 'zod'
import { NextResponse } from 'next/server'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'

import { signUpSchema } from '@/schemas'
import { createUser, findUserByEmail } from '@acme/db/queries'
import { generateId } from '@acme/id'
import { auth } from '@acme/auth'

type SignUp = z.infer<typeof signUpSchema>

export async function POST(req: Request): Promise<Response> {
  try {
    const json: SignUp = await req.json()
    const { firstName, lastName, email, password } = signUpSchema.parse(json)

    const existingUser = await findUserByEmail(email)

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      )
    }

    const userId = generateId()
    const hashedPassword = await new Argon2id().hash(password)

    await createUser({
      id: userId,
      email,
      firstName,
      lastName,
      hashedPassword,
    })

    // @ts-ignore
    const session = await auth.createSession(userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return new Response(null, {
      headers: {
        Location: '/',
      },
      status: 302,
    })
  } catch (err) {
    console.error(err)

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
