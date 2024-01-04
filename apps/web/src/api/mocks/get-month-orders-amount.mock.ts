import { http, HttpResponse } from 'msw'

import { GetMonthOrdersAmountResponse } from '../get-month-orders-amount'

export const getMonthOrdersAmountMock = http.get<
  never,
  never,
  GetMonthOrdersAmountResponse
>('/v1/metrics/month-orders-amount', async () => {
  return HttpResponse.json({
    amount: 200,
    diffFromLastMonth: 20,
  })
})
