import { z } from 'zod'
import { NextResponse } from 'next/server'

import { db } from '@acme/db'
import { usersTable } from '@acme/db/schema'

import { profileSchema } from '@/schemas'
import { getCachedSession } from '@/lib/auth/session'
import { eq } from '@acme/db/orm'

type Profile = z.infer<typeof profileSchema>

export async function PATCH(request: Request): Promise<Response> {
  const { session } = await getCachedSession()

  if (!session) {
    return new Response(null, {
      status: 401,
    })
  }

  const json: Profile = (await request.json()) as Profile
  const { firstName, lastName } = profileSchema.parse(json)

  await db
    .update(usersTable)
    .set({ firstName, lastName })
    .where(eq(usersTable.id, session.userId))

  try {
    return new Response(null, {
      status: 200,
    })
  } catch (error) {
    console.error(error)

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: error.issues[0]?.message },
        { status: 400 },
      )
    }

    return new Response(null, {
      status: 500,
    })
  }
}
