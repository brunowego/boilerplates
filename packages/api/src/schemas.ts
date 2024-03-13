import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({
    id: z.string().length(15).openapi({
      example: 'S6jSRLHINZnVuYw',
    }),
    first_name: z.string().min(1).openapi({
      example: 'John',
    }),
    last_name: z.string().openapi({
      example: 'Doe',
    }),
  })
  .openapi('User')
