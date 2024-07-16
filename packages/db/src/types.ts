import type { z } from 'zod'

import type { selectUserSchema, insertUserSchema } from './schemas'

export type User = z.infer<typeof selectUserSchema>
export type InsertUser = z.infer<typeof insertUserSchema>
