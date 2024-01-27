import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const app = new Hono()

const route = app
  .onError((err, c) => {
    console.error(err)

    const { name, message, cause, stack } = err

    return c.json({ name, message, cause, stack })
  })
  .get(
    '/hello',
    zValidator(
      'query',
      z.object({
        name: z.string(),
      }),
    ),
    (c) => {
      const { name } = c.req.valid('query')

      return c.json({
        message: `Hello! ${name}`,
      })
    },
  )
  .get('/sales', (c) => {
    return c.json({
      data: {
        olivia: '+$1,999.00',
        jackson: '+$39.00',
        isabella: '+$299.00',
        will: '+$99.00',
        sofia: '+$39.00',
      },
    })
  })

export type AppRoute = typeof route

export default app
