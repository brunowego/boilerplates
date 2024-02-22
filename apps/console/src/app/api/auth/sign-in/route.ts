import { z } from 'zod'
import { NextResponse } from 'next/server'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'

import { signInSchema } from '@/schemas'
import { db } from '@/lib/db'
import { eq } from '@/lib/db/orm'
import { usersTable } from '@/lib/db/schema'
import { auth } from '@/lib/auth'

type SignIn = z.infer<typeof signInSchema>

export async function POST(req: Request): Promise<Response> {
  try {
    const json: SignIn = (await req.json()) as SignIn
    const { email, password } = signInSchema.parse(json)

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
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message },
        { status: 400 },
      )
    }

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    )
  }
}
