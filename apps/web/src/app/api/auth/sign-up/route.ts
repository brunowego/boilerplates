import { NextResponse } from 'next/server'

import { signUpSchema } from '@acme/db/schemas'
import { z } from '@acme/ui/lib/zod'
import { db } from '@acme/db'
import { eq } from '@acme/db/orm'
import { usersTable, profilesTable } from '@acme/db/schema'
import { hash } from '@acme/auth/lib/bcryptjs'
import { generateId } from '@acme/id'

type SignUp = z.infer<typeof signUpSchema>

export async function POST(req: Request): Promise<Response> {
  try {
    const json: SignUp = await req.json()
    const { fullName, email, password } = signUpSchema.parse(json)

    const existingUser = await db.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
    })

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists.' },
        { status: 409 },
      )
    }

    const hashedPassword = await hash(password, 12)
    const userId = generateId()

    await db.transaction(async (tx) => {
      try {
        await tx.insert(usersTable).values({
          id: userId,
          fullName,
          email,
          hashedPassword,
        })

        await tx.insert(profilesTable).values({ userId, firstName: fullName })
      } catch (err) {
        tx.rollback()

        throw err
      }
    })

    return new Response(null, {
      status: 200,
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
