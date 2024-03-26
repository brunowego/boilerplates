import { z } from 'zod'
import { NextResponse } from 'next/server'
import sharp from 'sharp'

import { updateUser } from '@acme/db/queries'

import { getCachedSession } from '@/lib/auth/session'
import { pictureSchema } from '@/schemas'
import { intentProperties } from '@/lib/image'
import { s3, PutObjectCommand /*, DeleteObjectCommand */ } from '@/lib/s3'

const intentSchema = pictureSchema.pick({ intent: true })

type Intent = z.infer<typeof intentSchema>

export async function PUT(request: Request): Promise<Response> {
  const { session } = await getCachedSession()

  if (!session) {
    return new Response(null, {
      status: 401,
    })
  }

  try {
    const formData = await request.formData()

    const { file, intent } = pictureSchema.parse(
      Object.fromEntries(formData.entries()),
    )

    if (!intent) {
      return NextResponse.json(
        { success: false, error: 'missing_intent' },
        { status: 400 },
      )
    }

    const Body = await sharp(await file?.arrayBuffer())
      .resize({
        width: intentProperties[intent].width,
        height: intentProperties[intent].height,
        fit: 'cover',
        withoutEnlargement: true,
      })
      .webp({ lossless: true })
      .toBuffer()

    const Key = `${session.userId}.webp`

    await s3
      .send(
        new PutObjectCommand({
          Body,
          Bucket: process.env.S3_BUCKET_NAME,
          Key,
        }),
      )
      .catch(() => false)

    const picture = new URL(
      `/cdn/${Key}?v=${Date.now()}`,
      process.env.NEXT_PUBLIC_BASE_URL,
    ).href

    await updateUser(session.userId, {
      picture,
    })

    return NextResponse.json({
      success: true,
      picture,
    })
  } catch (err) {
    console.error(err)

    if (err instanceof z.ZodError) {
      return NextResponse.json(
        { message: err.issues[0]?.message },
        { status: 400 },
      )
    }

    return new Response(null, {
      status: 500,
    })
  }
}

export async function DELETE(request: Request): Promise<Response> {
  const { session } = await getCachedSession()

  if (!session) {
    return new Response(null, {
      status: 401,
    })
  }

  try {
    const json: Intent = await request.json()
    const { intent } = intentSchema.parse(json)

    if (!intent) {
      return NextResponse.json(
        { success: false, error: 'missing_intent' },
        { status: 400 },
      )
    }

    await updateUser(session.userId, {
      picture: null,
    })

    // await s3
    //   .send(
    //     new DeleteObjectCommand({
    //       Bucket: process.env.S3_BUCKET_NAME,
    //       Key: `${session.userId}.webp`,
    //     }),
    //   )
    //   .catch(() => false)

    return NextResponse.json({
      success: true,
    })
  } catch (err) {
    console.error(err)

    return new Response(null, {
      status: 500,
    })
  }
}
