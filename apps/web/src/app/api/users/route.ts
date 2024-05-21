import { type NextRequest, NextResponse } from 'next/server'

import { getUsers } from '@acme/db/queries'
import type { UserRole, UserStatus } from '@acme/db/types'

export async function GET(req: NextRequest): Promise<Response> {
  const searchParams = req.nextUrl.searchParams
  const query = searchParams.get('q') as string
  const roles = searchParams.get('role') as UserRole
  const statuses = searchParams.getAll('status') as UserStatus[]

  try {
    const response = await getUsers(query, roles, statuses)

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
