import { ErrorHandler } from 'hono'

import { logger } from '@acme/logger'

export const errorHandler: ErrorHandler = (err, c) => {
  logger.error({ errorMessage: `${err}` }, 'Error')

  return c.json(
    {
      success: false,
      error: 'Something went wrong. Please try again later',
    },
    500,
  )
}
