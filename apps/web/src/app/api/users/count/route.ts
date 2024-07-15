import { NextResponse } from 'next/server'

import { getUsersCountQuerySchema } from '@acme/db/schemas'
import { getUsersCount } from '@acme/db/queries'

import { getSearchParams } from '@/utils/urls'

export async function GET(req: Request): Promise<Response> {
  const searchParams = getSearchParams(req.url)
  const { search } = getUsersCountQuerySchema.parse(searchParams)

  try {
    const [count] = await getUsersCount({ search })

    return NextResponse.json(count, {
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
}
