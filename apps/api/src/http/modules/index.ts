import type Elysia from 'elysia'

import { initAuthRoutes, initFileRoutes } from '@/http/modules'

export const initModules = (app: Elysia) => {
  app.get('/', ({ set }) => {
    set.redirect = '/docs'
  })

  initAuthRoutes(app)
  initFileRoutes(app)
}

export * from './auth'
export * from './files'
