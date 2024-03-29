import { NextResponse } from 'next/server'

import { s3, GetObjectCommand, NoSuchKey } from '@/lib/s3'

type Params = {
  path: string
}

export async function GET(
  _: Request,
  { params: { path } }: { params: Params },
): Promise<Response> {
  const Key = Array.isArray(path) ? path.join('/') : path ?? ''

  try {
    const response = await s3
      .send(
        new GetObjectCommand({
          Bucket: process.env.S3_BUCKET_NAME,
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
    console.log(err)

    return new Response(null, {
      status: 500,
    })
  }
}
