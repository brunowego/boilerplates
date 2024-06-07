import { z } from 'zod'
import { NextResponse } from 'next/server'

import { updateUser } from '@acme/db/queries'

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

    await updateUser(session.userId, { firstName, lastName })

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
