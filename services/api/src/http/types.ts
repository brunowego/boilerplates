import { User } from 'lucia'
import { OpenAPIHono, z } from '@hono/zod-openapi'

import { Organization } from '@/db/schema'

import { errorResponseSchema } from './schemas/common'

export type Env = {
  Variables: {
    user: User
    organization: Organization
  }
}

export class CustomHono extends OpenAPIHono<Env> {}

export type ErrorResponse = z.infer<typeof errorResponseSchema>
