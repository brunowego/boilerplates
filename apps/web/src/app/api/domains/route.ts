import { NextResponse } from 'next/server'
// import { waitUntil } from '@vercel/functions'

import {
  getDomains,
  type InsertDomain,
  insertDomainSchema,
  db,
  domainsTable,
} from '@acme/db'

import {
  validateDomain,
  addDomainToVercel,
  // setRootDomain,
} from '@/lib/api/domains'

export async function GET(): Promise<Response> {
  try {
    const response = await getDomains()

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

export async function POST(request: Request): Promise<Response> {
  try {
    const json: InsertDomain = await request.json()

    const result = insertDomainSchema.parse(json)

    const validDomain = await validateDomain(result.domain)

    if (validDomain !== true) {
      return new Response(validDomain, { status: 422 })
    }

    const vercelResponse = await addDomainToVercel(result.domain)

    if (
      vercelResponse.error &&
      vercelResponse.error.code !== 'domain_already_in_use'
    ) {
      return new Response(vercelResponse.error.message, { status: 422 })
    }

    const [response] = await db
      .insert(domainsTable)
      .values(result)
      .returning({ id: domainsTable.id, createdAt: domainsTable.createdAt })

    // waitUntil(
    //   setRootDomain({
    //     id: response.id,
    //     domain: result.domain,
    //     domainCreatedAt: response.createdAt,
    //     projectId: workspace.id,
    //     rewrite: type === 'rewrite',
    //   }),
    // )

    return NextResponse.json(response, {
      status: 201,
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
