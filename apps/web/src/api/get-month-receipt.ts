import { api } from '@/lib/axios'

export interface GetMonthReceiptResponse {
  receipt: number
  diffFromLastMonth: number
}

export async function getMonthReceipt() {
  const response = await api.get<GetMonthReceiptResponse>(
    '/v1/metrics/month-receipt',
  )

  return response.data
}
