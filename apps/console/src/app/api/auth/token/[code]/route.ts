import { z } from 'zod'
import { isWithinExpirationDate } from 'oslo'
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

import { db } from '@acme/db'
import { eq } from '@/lib/db/orm'
import { tokensTable } from '@/lib/db/schema'
import { auth } from '@/lib/auth'
import { publicEnv as env } from '@/env/client'

const tokenSchema = z.object({
  code: z.string().length(15),
})

type Token = z.infer<typeof tokenSchema>

type Context = { params: { code: string } }

export async function GET(_: Request, { params }: Context): Promise<Response> {
  try {
    const { code }: Token = tokenSchema.parse(params)

    const existingToken = await db.query.tokensTable.findFirst({
      where: eq(tokensTable.id, code),
    })

    if (!existingToken || !isWithinExpirationDate(existingToken.expiresAt)) {
      return NextResponse.json(
        { message: 'Wrong token or token no longer exists' },
        { status: 400 },
      )
    }

    const redirectUrl: string =
      existingToken.type === 'MAGIC_LINK' ? '/magic-page' : '/'

    await db.delete(tokensTable).where(eq(tokensTable.id, existingToken.id))

    // @ts-ignore
    const session = await auth.createSession(existingToken.userId, {})
    const sessionCookie = auth.createSessionCookie(session.id)

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    )

    return new Response(null, {
      headers: {
        Location: (env.NEXT_PUBLIC_BASE_URL + redirectUrl) as string,
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
