import type Elysia from 'elysia'

import { initProductRoutes } from '@/http/modules'

export const initModules = (app: Elysia) => {
  app.get('/', ({ set }) => {
    set.redirect = '/docs'
  })

  initProductRoutes(app)
}

export * from './products'
