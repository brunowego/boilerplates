import { NextResponse } from 'next/server'

import { getFileById } from '@acme/db/queries'
import { type InsertFile, insertFileSchema } from '@acme/db/schemas'
import { db } from '@acme/db'
import { filesTable } from '@acme/db/schema'
import { eq } from '@acme/db/orm'

export async function GET(
  _: Request,
  { params }: { params: { fileId: string } },
): Promise<Response> {
  try {
    const response = await getFileById(params.fileId)

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
  { params }: { params: { fileId: string } },
): Promise<Response> {
  try {
    const file = await getFileById(params.fileId)

    if (!file) {
      return new Response(null, { status: 404 })
    }

    const json: InsertFile = await request.json()

    const result = insertFileSchema.parse({
      ...file,
      ...json,
    })

    await db
      .update(filesTable)
      .set(result)
      .where(eq(filesTable.id, params.fileId))

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
