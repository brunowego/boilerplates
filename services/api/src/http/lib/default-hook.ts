import { Hook } from '@hono/zod-openapi'
import { ZodError } from 'zod'

import { logger } from '@acme/logger'

import { Env } from '@/http/types'

export const defaultHook: Hook<unknown, Env, '', unknown> = (result, ctx) => {
  if (!result.success && result.error instanceof ZodError) {
    logger.info(
      {
        error: result.error.issues[0].message,
        path: result.error.issues[0].path[0],
      },
      'Validation error',
    )

    return ctx.json(
      { success: false, error: result.error.issues[0].message },
      400,
    )
  }
}
