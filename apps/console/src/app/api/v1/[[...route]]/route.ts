import { handle } from 'hono/vercel'

import app from '@acme/api'

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const DELETE = handle(app)
