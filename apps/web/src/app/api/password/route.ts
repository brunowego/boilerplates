import { NextResponse } from 'next/server'

import type z from '@acme/ui/lib/zod'
import { auth } from '@acme/auth'
import { userPasswordSchema, db, usersTable, eq } from '@acme/db'
import { hash } from '@acme/auth/lib/bcryptjs'

type UserPassword = z.infer<typeof userPasswordSchema>

export const POST = auth(async function POST(req) {
  if (!req.auth) {
    return new NextResponse(null, {
      status: 401,
    })
  }

  const userId = req.auth.user.id

  if (!userId) {
    return new NextResponse(null, {
      status: 404,
    })
  }

  try {
    const json: UserPassword = await req.json()

    const { password } = userPasswordSchema.parse(json)

    const hashedPassword = await hash(password, 12)

    await db
      .update(usersTable)
      .set({ hashedPassword, onboarded: true })
      .where(eq(usersTable.id, userId))

    return new Response(null, {
      status: 200,
    })
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
})
