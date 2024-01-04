import { http, HttpResponse } from 'msw'

import { GetDailyReceiptInPeriodResponse } from '../get-daily-receipt-in-period'

function generateRandomInteger(min: number, max: number) {
  return Math.floor(min + Math.random() * (max - min + 1))
}

const getDatesBetween = (startDate: Date, endDate: Date) => {
  let dates = [];
  let currentDate = new Date();
  endDate = endDate >= currentDate ? currentDate : endDate;

  while (startDate <= endDate) {
    dates.push(new Date(startDate));
    startDate.setDate(startDate.getDate() + 1);
  }

  return dates;
}

export const getDailyReceiptInPeriod = http.get<
  never,
  never,
  GetDailyReceiptInPeriodResponse
>('/v1/metrics/daily-receipt-in-period', async ({ request }) => {
  const { searchParams } = new URL(request.url)

  const from = searchParams.get('from') as string
  const to = searchParams.get('to') as string
  const dates = getDatesBetween(new Date(from), new Date(to))
  const response = <GetDailyReceiptInPeriodResponse>[]

  dates.map((date) => {
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);

    response.push({
      date: `${day}/${month}`,
      receipt: generateRandomInteger(1000, 10000),
    })
  })

  return HttpResponse.json(response)
})
