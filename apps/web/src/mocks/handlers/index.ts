import type { HttpHandler } from 'msw'

import { handlers as productsHandlers } from './api/products'

export const handlers = [...productsHandlers] satisfies HttpHandler[]
