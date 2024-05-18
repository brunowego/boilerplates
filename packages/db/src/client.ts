import postgres from 'postgres'

import { env } from './env'

export const client = postgres(env.DATABASE_URL)
