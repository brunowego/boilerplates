import { createSelectSchema } from 'drizzle-zod'
import { z } from '@hono/zod-openapi'

import { usersTable } from '@/db/schema'

import { emailSchema, passwordSchema, usernameSchema } from './common'

export const apiUserSchema = createSelectSchema(usersTable, {
  email: emailSchema,
  lastSignInAt: z.string().nullable(),
  createdAt: z.string(),
  modifiedAt: z.string().nullable(),
}).omit({
  hashedPassword: true,
})

export const signUpJsonSchema = z.object({
  email: apiUserSchema.shape.email,
  password: passwordSchema,
})

export const checkUsernameParamsSchema = z.object({
  username: usernameSchema,
})

export const checkEmailJsonSchema = z.object({
  email: apiUserSchema.shape.email,
})

export const emailExistsJsonSchema = z.object({
  exists: z.boolean(),
})

export const resetPasswordJsonSchema = z.object({
  password: passwordSchema,
})

export const signInJsonSchema = z.object({
  email: apiUserSchema.shape.email,
  password: passwordSchema,
})

export type ApiUser = z.infer<typeof apiUserSchema>
