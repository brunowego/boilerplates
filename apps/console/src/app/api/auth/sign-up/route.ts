import { z } from 'zod'
import { NextResponse } from 'next/server'
import { Argon2id } from 'oslo/password'
import { cookies } from 'next/headers'
import { Redis } from '@upstash/redis'

import { db } from '@/lib/db'
import { eq } from '@/lib/db/orm'
import { usersTable } from '@/lib/db/schema'
import { generateId } from '@acme/id'
// import { redis } from '@/lib/redis'
import { auth } from '@/lib/auth'

export const signUpSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().max(50).optional(),
  email: z.string().email(),
  password: z.string().min(8),
})

type SignUp = z.infer<typeof signUpSchema>

export async function POST(req: Request): Promise<Response> {
  try {
    const json: SignUp = (await req.json()) as SignUp
    const { firstName, lastName, email, password } = signUpSchema.parse(json)

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 409 },
      )
    }

    const userId = generateId()
    const hashedPassword = await new Argon2id().hash(password)

    await db.insert(usersTable).values({
      id: userId,
      email: email,
      // username: ,
      firstName,
      lastName,
      hashedPassword,
    })

    const redis = Redis.fromEnv()
    await redis.publish(
      'users',
      JSON.stringify({
        date: new Date().toString(),
        message: 'New user signed up',
      }),
    )

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
