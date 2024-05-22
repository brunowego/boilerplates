import { NextResponse } from 'next/server'

import { getFiles } from '@acme/db/queries'
import { type InsertFile, insertFileSchema } from '@acme/db/schemas'
import { db } from '@acme/db'
import { filesTable } from '@acme/db/schema'

export async function GET(): Promise<Response> {
  try {
    const response = await getFiles()

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
    const json: InsertFile = await request.json()

    const result = insertFileSchema.parse(json)

    const [response] = await db
      .insert(filesTable)
      .values(result)
      .returning({ id: filesTable.id })

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
