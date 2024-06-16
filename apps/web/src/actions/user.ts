'use server'

// import z from '@acme/ui/lib/zod'
// import type { User } from '@acme/db/schemas'
import { db, eq, usersTable } from '@acme/db'

// export const emailSchema = z
//   .string({
//     required_error: 'Email is required',
//     invalid_type_error: 'Email must be a string',
//   })
//   .min(5, {
//     message: 'Email must be made of at least 5 characters',
//   })
//   .max(64, {
//     message: 'Email must be made of at most 64 characters',
//   })
//   .email({
//     message: 'Please enter a valid email address',
//   })

// export const getUserByEmailSchema = z.object({
//   email: emailSchema,
// })

// export type GetUserByEmailInput = z.infer<typeof getUserByEmailSchema>

// export async function getUserByEmail(
//   rawInput: GetUserByEmailInput,
// ): Promise<User | null> {
//   try {
//     const validatedInput = getUserByEmailSchema.safeParse(rawInput)

//     if (!validatedInput.success) {
//       return null
//     }

//     return await db.query.usersTable.findFirst({
//       where: eq(usersTable.email, validatedInput.data.email),
//     })
//   } catch (err) {
//     console.error(err)

//     throw new Error('Error getting user by email')
//   }
// }

export async function getUserByEmail(email: string) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  })
}
