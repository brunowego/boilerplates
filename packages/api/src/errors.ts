import type { NotFoundHandler, ErrorHandler } from 'hono'
import { HTTPException } from 'hono/http-exception'

export class NotFoundError extends Error {}

export const notFoundHandler: NotFoundHandler = (ctx) =>
  errorHandler(new NotFoundError(), ctx)

export const errorHandler: ErrorHandler = (err, c) => {
  process.env.NODE_ENV === 'development' && console.error(err)

  if (err instanceof HTTPException) {
    return err.getResponse()
  }

  return c.json({ ...err }, 500)
}
