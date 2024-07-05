import type { z } from 'zod'

import type { PostgresJsDatabase } from './orm'
import type * as schema from './schema'
import type { selectUserSchema, insertUserSchema } from './schemas'

export type Db = PostgresJsDatabase<typeof schema>

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>
