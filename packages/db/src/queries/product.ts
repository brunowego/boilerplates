import type Stripe from 'stripe'

import { type Product, productsTable } from '../schema'
import { db } from '../db'
import { eq } from '../orm'

export const upsertProduct = async (product: Stripe.Product): Promise<void> => {
  const data: Product = {
    id: product.id,
    active: product.active,
    name: product.name,
    description: product.description ?? null,
    image: product.images?.[0] ?? null,
    metadata: product.metadata,
  }

  try {
    await db.insert(productsTable).values(data).onConflictDoUpdate({
      target: productsTable.id,
      set: data,
    })
  } catch (err) {
    console.error(err)

    throw err
  }
}

export const deleteProduct = async (product: Stripe.Product) =>
  await db.delete(productsTable).where(eq(productsTable.id, product.id))
