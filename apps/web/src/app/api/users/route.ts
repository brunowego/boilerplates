import { NextResponse } from 'next/server'

import { getUsersQuerySchema } from '@acme/db/schemas'
import { getUsers } from '@acme/db/queries'

import { getSearchParams } from '@/utils/urls'

export async function GET(req: Request): Promise<Response> {
  const searchParams = getSearchParams(req.url)
  const { search, sortBy, page } = getUsersQuerySchema.parse(searchParams)

  try {
    const response = await getUsers({ search, sortBy, page })

    return NextResponse.json(response, {
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
