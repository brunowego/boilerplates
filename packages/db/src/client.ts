import { Pool } from 'pg'

import { env } from './env'

export const client = new Pool({ connectionString: env.DATABASE_URL })
