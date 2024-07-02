import { http, HttpResponse, type HttpHandler } from 'msw'

import type { Product } from '@acme/db/types'

const products: Product[] = [
  {
    id: '01J1T0A9MBQFCZP0MBJZJJBJB3',
    category: 'T-Shirts',
    name: 'Unisex Long Sleeve Tee',
    image: '/_static/img/product/unisex-long-sleeve-tee.webp',
    price: 19.99,
  },
]

export const handlers = [
  http.get('/api/products', () => HttpResponse.json(products)),
  http.get('/api/products/:id', ({ params }) =>
    HttpResponse.json(products.find(({ id }) => id === params.id)),
  ),
] satisfies HttpHandler[]
