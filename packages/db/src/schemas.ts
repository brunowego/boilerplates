import { createSelectSchema, createInsertSchema } from 'drizzle-valibot'
import {
  string,
  minLength,
  maxLength,
  email,
  merge,
  pick,
  object,
} from 'valibot'

import { usersTable } from './schema'

export const selectUserSchema = createSelectSchema(usersTable)
export const insertUserSchema = createInsertSchema(usersTable, {
  firstName: string([minLength(2), maxLength(20)]),
  lastName: string([minLength(2), maxLength(20)]),
  email: string([email()]),
})

export const signUpSchema = merge([
  pick(selectUserSchema, ['firstName', 'lastName', 'email']),
  object({
    password: string([minLength(8), maxLength(64)]),
  }),
])

export const signInSchema = merge([
  pick(selectUserSchema, ['email']),
  object({
    password: string([minLength(8), maxLength(64)]),
  }),
])
