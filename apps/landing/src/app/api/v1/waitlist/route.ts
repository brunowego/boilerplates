import { z } from 'zod'
import { NextResponse } from 'next/server'

import { db } from '@acme/db'
import { waitListTable } from '@acme/db/schema'
import { generateId } from '@acme/id'
import { sendEmail, WaitListEmail } from '@acme/email'

import { waitListSchema } from '@/schemas'
import { eq } from '@/lib/db/orm'

type WaitList = z.infer<typeof waitListSchema>

export async function POST(req: Request): Promise<Response> {
  try {
    const json: WaitList = (await req.json()) as WaitList
    const { firstName, email } = waitListSchema.parse(json)

    const existingEmail = await db.query.waitListTable.findFirst({
      where: eq(waitListTable.email, email),
    })

    if (existingEmail) {
      return NextResponse.json(
        { message: 'Email is already on the waiting list.' },
        { status: 409 },
      )
    }

    await db.insert(waitListTable).values({
      id: generateId(),
      email,
      firstName,
    })

    await sendEmail({
      to: email,
      subject: 'Thank you for joining our waitlist',
      react: WaitListEmail({
        firstName,
        fromIp: '216.238.112.233',
        fromLocation: 'São Paulo, Brazil',
      }),
    })

    return new Response(null, {
      status: 201,
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
