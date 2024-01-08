import { http, HttpResponse, type HttpHandler } from 'msw'

export const handlers = [
  http.get('/v1/metrics/total-revenue', () =>
    HttpResponse.json({
      amount: 4523189,
      diffFromLastMonth: 20.1,
    }),
  ),
  http.get('/v1/metrics/subscriptions', () =>
    HttpResponse.json({
      amount: 2350,
      diffFromLastMonth: 180.1,
    }),
  ),
] satisfies HttpHandler[]
