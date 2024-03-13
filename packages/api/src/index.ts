import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import { logger } from 'hono/logger'

import type { Variables } from './types'
import { authMiddleware } from './middleware'

const app = new Hono<{ Variables: Variables }>().basePath('/api/v1')

app.use(authMiddleware)

export class ErrorWithHttpCode extends Error {
  code: number
  constructor(message: string, code: number) {
    super(message)
    this.code = code
  }
}

const route = app
  .onError((err, c) => {
    process.env.NODE_ENV === 'development' && console.error(err)

    if (err instanceof HTTPException) {
      return err.getResponse()
    }

    return c.json({ ...err }, 500)
  })

  .use(logger())

  .get('/ping', (c) => c.json({ ping: 'pong' }))

  .get('/me', async (c) => {
    const user = c.get('user')

    if (!user) {
      throw new ErrorWithHttpCode('Unauthorized', 401)
    }

    return c.json({ ...user })
  })

export type AppRoute = typeof route

export default app
