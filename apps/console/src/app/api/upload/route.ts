import z from '@acme/ui/lib/zod'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextResponse } from 'next/server'

import { generateId } from '@acme/id'

import { s3Client, PutObjectCommand } from '@/lib/s3'

export const fileSchema = z.object({
  filename: z.string().min(1),
})

type File = z.infer<typeof fileSchema>

export async function POST(req: Request): Promise<Response> {
  const json: File = await req.json()
  const body = fileSchema.safeParse(json)

  if (!body.success) {
    return new Response(null, {
      status: 400,
    })
  }

  const fileExtension = body.data.filename.split('.').pop()
  const key = `${generateId()}.${fileExtension}`

  try {
    const url = await getSignedUrl(
      s3Client,
      new PutObjectCommand({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: 60 },
    )

    return NextResponse.json({
      url,
      key,
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
