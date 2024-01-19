import { Elysia } from 'elysia'

import { initExceptions } from './exceptions'
import { initMiddleware } from './middlewares'
import { initModules } from './modules'

const app = new Elysia()

initExceptions(app)
initMiddleware(app)
initModules(app)

app.listen(
  {
    port: 3000,
    hostname: 'localhost',
  },
  (server) => {
    console.log(
      `Server is listening on http://${server.hostname}:${server.port}`,
    )
  },
)
