import { createRoute } from '@hono/zod-openapi'

import { UserSchema } from './schemas'
import { CustomHono } from './types'

export const meRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['users'],
  summary: 'Current user',
  responses: {
    200: {
      description: 'TBD',
      content: {
        'application/json': {
          schema: UserSchema,
        },
      },
    },
  },
})

const app = new CustomHono()

export const userRoutes = app.openapi(meRoute, (c) => {
  const user = c.get('user')

  // if (!user) {
  //   throw new ErrorWithHttpCode('Unauthorized', 401)
  // }

  return c.json({
    ...user,
  })
})
