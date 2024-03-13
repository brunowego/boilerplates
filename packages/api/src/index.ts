import { userRoutes } from './routes'
import app from './app'

const route = app
  .route('', userRoutes)
  .get('/ping', (c) => c.json({ ping: 'pong' }))

export type AppRoute = typeof route

export default app
