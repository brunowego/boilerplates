import { NextResponse } from 'next/server'

import { s3Client, GetObjectCommand, NoSuchKey } from '@acme/storage'

type Params = {
  path: string
}

export async function GET(
  _: Request,
  { params: { path } }: { params: Params },
): Promise<Response> {
  const Key = Array.isArray(path) ? path.join('/') : path ?? ''

  try {
    const response = await s3Client
      .send(
        new GetObjectCommand({
          Bucket: process.env.STORAGE_BUCKET_NAME,
          Key,
        }),
      )
      .catch((err) => {
        if (err instanceof NoSuchKey) {
          return null
        }

        throw err
      })

    if (response?.Body) {
      return new NextResponse(await response.Body.transformToByteArray(), {
        headers: {
          'Cache-Control': 'immutable',
          'Content-Type': 'image/webp',
        },
      })
    }

    return Response.json(
      {
        success: false,
        error: 'not_found',
      },
      { status: 404 },
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
