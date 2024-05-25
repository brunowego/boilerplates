import { NextResponse } from 'next/server'

import {
  getPageById,
  type InsertPage,
  insertPageSchema,
  db,
  pagesTable,
  eq,
} from '@acme/db'

export async function GET(
  _: Request,
  { params }: { params: { pageId: string } },
): Promise<Response> {
  try {
    const response = await getPageById(params.pageId)

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

export async function PATCH(
  request: Request,
  { params }: { params: { pageId: string } },
): Promise<Response> {
  try {
    const page = await getPageById(params.pageId)

    if (!page) {
      return new Response(null, { status: 404 })
    }

    const json: InsertPage = await request.json()

    const result = insertPageSchema.parse({
      ...page,
      ...json,
    })

    await db
      .update(pagesTable)
      .set(result)
      .where(eq(pagesTable.id, params.pageId))

    return new Response(null, {
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
