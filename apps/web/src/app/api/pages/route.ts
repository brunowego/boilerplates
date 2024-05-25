import { NextResponse } from 'next/server'

import {
  getPages,
  type InsertPage,
  insertPageSchema,
  db,
  pagesTable,
} from '@acme/db'

export async function GET(): Promise<Response> {
  try {
    const response = await getPages()

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
    const json: InsertPage = await request.json()

    const result = insertPageSchema.parse(json)

    const [response] = await db
      .insert(pagesTable)
      .values(result)
      .returning({ id: pagesTable.id })

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
