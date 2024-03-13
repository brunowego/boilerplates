import { CustomHono } from './types'
import { logger } from 'hono/logger'

import pkg from '../package.json'
import auth from './middleware/auth'
import { notFoundHandler, errorHandler } from './errors'

const app = new CustomHono().basePath('/api/v1')

app.doc31('/openapi.json', {
  openapi: '3.1.0',
  info: {
    title: pkg.name,
    version: pkg.version,
  },
  servers: [
    {
      url: 'http://localhost:3000',
    },
  ],
  tags: [
    { name: 'auth', description: 'Authentication' },
    { name: 'users', description: 'Users' },
  ],
})

app.use(logger())
app.use(auth)

app.notFound(notFoundHandler)
app.onError(errorHandler)

export default app
