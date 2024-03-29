import { z } from 'zod'
import { NextResponse } from 'next/server'

import { db } from '@acme/db'
import { usersTable } from '@acme/db/schema'
import { eq } from '@acme/db/orm'

import { profileSchema } from '@/schemas'
import { getCachedSession } from '@/lib/auth/session'

type Profile = z.infer<typeof profileSchema>

export async function PATCH(request: Request): Promise<Response> {
  const { session } = await getCachedSession()

  if (!session) {
    return new Response(null, {
      status: 401,
    })
  }

  try {
    const json: Profile = await request.json()
    const { firstName, lastName } = profileSchema.parse(json)

    await db
      .update(usersTable)
      .set({ firstName, lastName })
      .where(eq(usersTable.id, session.userId))

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

    return new Response(null, {
      status: 500,
    })
  }
}
