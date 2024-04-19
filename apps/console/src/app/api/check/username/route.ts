import { NextResponse } from 'next/server'

import { checkUsernameAvailabilityQuerySchema } from '@acme/db/schemas'
import { checkUsernameAvailability } from '@acme/db/queries'

import { getSearchParams } from '@/utils/urls'

export async function GET(req: Request): Promise<Response> {
  const searchParams = getSearchParams(req.url)
  const body = checkUsernameAvailabilityQuerySchema.safeParse(searchParams)

  if (!body.success) {
    return NextResponse.json(JSON.parse(body.error.message), { status: 400 })
  }

  try {
    const available = await checkUsernameAvailability(body.data)

    return NextResponse.json(
      { available },
      {
        status: 200,
      },
    )
  } catch (err) {
    if (process.env.NODE_ENV === 'development') {
      console.error(err)
    }

    return new Response(null, {
      status: 500,
    })
  }
}
