import { type Serve } from 'bun'

import { CustomHono } from './types'
import { middlewares } from './middlewares'
import { defaultHook } from './lib/default-hook'
// import { errorHandler } from './lib/error-handler'
import { guard } from './middlewares/guard'
import { docs } from './middlewares/docs'
import { env } from '@/env'
import { authRoutes } from './routes/auth'
import { userRoutes } from './routes/users'
import organizationsRoutes from './routes/organizations'

const app = new CustomHono({ defaultHook })

app.route('', middlewares)

docs(app)

// app.onError(errorHandler)

guard(app)

const route = app
  .route('/', authRoutes)
  .route('/', userRoutes)
  .route('/', organizationsRoutes)

export type AppRoute = typeof route

export default {
  hostname: env.HOST,
  port: env.PORT,
  fetch: app.fetch,
} satisfies Serve
