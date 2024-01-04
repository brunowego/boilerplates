import { cors } from '@elysiajs/cors'
import { swagger } from '@elysiajs/swagger'
import { Elysia } from 'elysia'

// import { authentication } from './authentication'
import { v1Route } from './routes/v1'

const app = new Elysia()
  .use(swagger())
  .onError(({ code }) => {
    if (code === 'NOT_FOUND') return ''
  })
  .use(
    cors({
      credentials: true,
      allowedHeaders: ['Content-Type'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
      origin: (request: Request): boolean => {
        const origin = request.headers.get('origin')

        if (!origin) return false

        return true
      },
    }),
  )
  .get('/livez', () => {
    return { status: 'OK' }
  })
  .get('/readyz', () => {
    return { status: 'OK', uptime: process.uptime() }
  })
  // .use(authentication)
  .use(v1Route)

app.listen(3000)

console.log(
  `🔥 HTTP server running at http://${app.server?.hostname}:${app.server?.port}`,
)
