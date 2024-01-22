import { Elysia } from 'elysia'

import { env } from '@/env'

import { initExceptions } from './exceptions'
import { initMiddleware } from './middlewares'
import { initModules } from './modules'

const app = new Elysia()

initExceptions(app)
initMiddleware(app)
initModules(app)

app.listen(
  {
    port: env.PORT,
    hostname: '0.0.0.0',
  },
  (server) => {
    console.log(
      `Server is listening on http://${server.hostname}:${server.port}`,
    )
  },
)
