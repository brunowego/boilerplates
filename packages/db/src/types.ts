import type { z } from 'zod'

import type { USER_ROLES, USER_STATUS } from './constants'
import type { selectUserSchema, insertUserSchema } from './schemas'

export type User = z.infer<typeof selectUserSchema>
export type UserRole = (typeof USER_ROLES)[number]
export type UserStatus = (typeof USER_STATUS)[number]
export type InsertUser = z.infer<typeof insertUserSchema>
