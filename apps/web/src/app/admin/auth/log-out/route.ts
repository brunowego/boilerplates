import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { auth } from '@acme/auth'

import { getCachedSession } from '@/lib/auth/session'

export async function POST(): Promise<Response> {
  const { session } = await getCachedSession()

  if (!session) {
    return new NextResponse(null, {
      status: 401,
    })
  }

  await auth.invalidateSession(session.id)

  const sessionCookie = auth.createBlankSessionCookie()

  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes,
  )

  return new Response(null, {
    status: 200,
  })
}
