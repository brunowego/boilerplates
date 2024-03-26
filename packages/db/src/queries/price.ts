import type Stripe from 'stripe'

import { type PriceInsert, pricesTable } from '../schema'
import { db } from '../db'
import { eq } from '../orm'

const TRIAL_PERIOD_DAYS = 0

export const upsertPrice = async (price: Stripe.Price) => {
  const data: PriceInsert = {
    id: price.id,
    productId: typeof price.product === 'string' ? price.product : '',
    active: price.active,
    currency: price.currency,
    type: price.type,
    unitAmount: price.unit_amount ?? null,
    interval: price.recurring?.interval ?? null,
    intervalCount: price.recurring?.interval_count ?? null,
    trialPeriodDays: price.recurring?.trial_period_days ?? TRIAL_PERIOD_DAYS,
  }

  try {
    await db.insert(pricesTable).values(data).onConflictDoUpdate({
      target: pricesTable.id,
      set: data,
    })
  } catch (err) {
    console.error(err)

    throw err
  }
}

export const deletePrice = async (price: Stripe.Price) =>
  await db.delete(pricesTable).where(eq(pricesTable.id, price.id))
