import type Elysia from 'elysia'

import { useCors, useHelmet, useSwagger } from '@/http/middlewares'

export const initMiddleware = (app: Elysia) => {
  useCors(app)
  useHelmet(app)
  useSwagger(app)
}

export * from './cookie'
export * from './cors'
export * from './helmet'
export * from './jwt'
export * from './swagger'
