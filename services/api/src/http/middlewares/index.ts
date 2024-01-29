// import { secureHeaders } from 'hono/secure-headers'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
// import { compress } from 'hono/compress'
// import { csrf } from 'hono/csrf'
// import { getCookie } from 'hono/cookie'

import { config } from '@acme/config'
// import { env } from '@/env'

import { CustomHono } from '../types'
import { customLogger } from '../lib/custom-logger'

const app = new CustomHono()

// app.use('*', secureHeaders())

app.use('*', logger(customLogger))

app.use(
  '*',
  cors({
    origin: config.frontendUrl,
    allowMethods: ['GET', 'HEAD', 'PUT', 'POST', 'DELETE'],
    // allowHeaders: [],
    credentials: true,
  }),
)

app.get('/ping', (c) => c.text('pong'))

// app.use('*', compress())

// app.use(
//   '*',
//   csrf({
//     origin: config.frontendUrl,
//   }),
// )

export { app as middlewares }
