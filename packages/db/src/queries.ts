import { db } from './db'

export async function getPaymentMethods() {
  return await db.query.paymentMethods.findMany({
    columns: {
      id: true,
      type: true,
      identifier: true,
      identifierType: true,
      params: true,
      enabled: true,
    },
  })
}
