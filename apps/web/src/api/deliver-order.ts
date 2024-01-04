import { api } from '@/lib/axios'

export interface DeliverOrderParams {
  orderId: string
}

export async function deliverOrder({ orderId }: DeliverOrderParams) {
  await api.patch(`/v1/orders/${orderId}/deliver`)
}
