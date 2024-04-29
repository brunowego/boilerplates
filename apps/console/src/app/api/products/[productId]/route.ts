import { NextResponse } from 'next/server'

import { db } from '@acme/db'
import { and, eq } from '@acme/db/orm'
import { productsTable, productImagesTable } from '@acme/db/schema'
import { type InsertProduct, insertProductSchema } from '@acme/db/schemas'
import { getProductById } from '@acme/db/queries'

export async function GET(
  _: Request,
  { params }: { params: { productId: string } },
): Promise<Response> {
  try {
    const product = await getProductById(params.productId)

    if (!product) {
      return new Response(null, { status: 404 })
    }

    return NextResponse.json(product, {
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
  { params }: { params: { productId: string } },
): Promise<Response> {
  try {
    const product = await getProductById(params.productId)

    if (!product) {
      return new Response(null, { status: 404 })
    }

    const json: InsertProduct = await request.json()

    const result = insertProductSchema.parse({
      ...product,
      ...json,
    })

    await db.transaction(async (tx) => {
      await tx
        .delete(productImagesTable)
        .where(eq(productImagesTable.productId, params.productId))

      for (const { url, filename } of json.images) {
        await tx.insert(productImagesTable).values({
          productId: params.productId,
          filename,
          url,
        })
      }

      await tx
        .update(productsTable)
        .set(result)
        .where(eq(productsTable.id, params.productId))
    })

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
