import { createRoute, z } from '@hono/zod-openapi'

import { apiUserSchema, checkUsernameParamsSchema } from '@/http/schemas'
import { errorResponses } from '@/http/responses'

export const successResponseWithDataSchema = <T extends z.ZodTypeAny>(
  schema: T,
) => z.object({ success: z.boolean(), data: schema })

export const meRoute = createRoute({
  method: 'get',
  path: '/me',
  tags: ['users'],
  summary: 'Get the current user',
  responses: {
    200: {
      description: 'User',
      content: {
        'application/json': {
          schema: successResponseWithDataSchema(apiUserSchema),
        },
      },
    },
    ...errorResponses,
  },
})

export const checkUsernameRoute = createRoute({
  method: 'get',
  path: '/users/check-username/{username}',
  tags: ['users'],
  summary: 'Check if a username is already in use',
  request: {
    params: checkUsernameParamsSchema,
  },
  responses: {
    200: {
      description: 'User',
      content: {
        'application/json': {
          schema: successResponseWithDataSchema(z.boolean()),
        },
      },
    },
    ...errorResponses,
  },
})
