import { OpenAPIHono } from '@hono/zod-openapi'

import type { User, Session } from '@acme/auth'

export type Variables = {
  user: User
  session: Session
}

export type Env = {
  Variables: Variables
}

export class CustomHono extends OpenAPIHono<Env> {}
