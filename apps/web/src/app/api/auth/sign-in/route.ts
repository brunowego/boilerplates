import { NextResponse } from 'next/server'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'

import { type Output, parse, ValiError } from '@acme/ui/lib/valibot'
import { signInSchema } from '@acme/db/schemas'
import { db } from '@acme/db'
import { eq } from '@acme/db/orm'
import { usersTable } from '@acme/db/schema'
import { auth } from '@acme/auth'

type SignIn = Output<typeof signInSchema>

export async function POST(req: Request): Promise<Response> {
  try {
    const json: SignIn = await req.json()
    const { email, password } = parse(signInSchema, json)

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    })

    if (!existingUser) {
      return NextResponse.json(
        { message: 'Wrong password or user does not exist' },
        { status: 400 },
      )
    }

    if (!existingUser?.hashedPassword) {
      return NextResponse.json(
        { message: 'No password set. Try different login provider' },
        { status: 400 },
      )
    }

    const validPassword = await new Argon2id().verify(
      existingUser.hashedPassword,
      password,
    )

    if (!validPassword) {
      return NextResponse.json(
        { message: 'Wrong password or user does not exist' },
        { status: 400 },
      )
    }

    // @ts-ignore
    const session = await auth.createSession(existingUser.id, {})
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
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    if (err instanceof ValiError) {
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
