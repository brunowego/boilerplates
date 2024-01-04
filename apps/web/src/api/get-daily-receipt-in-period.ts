import { api } from '@/lib/axios'

export interface GetDailyReceiptInPeriodQuery {
  from?: Date
  to?: Date
}

export type GetDailyReceiptInPeriodResponse = Array<{
  date: string
  receipt: number
}>

export async function getDailyReceiptInPeriod({
  from,
  to,
}: GetDailyReceiptInPeriodQuery) {
  const response = await api.get<GetDailyReceiptInPeriodResponse>(
    '/v1/metrics/daily-receipt-in-period',
    {
      params: {
        from,
        to,
      },
    },
  )

  return response.data
}
