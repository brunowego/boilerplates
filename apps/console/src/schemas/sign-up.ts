import { z } from 'zod'

export const signUpSchema = z.object({
  firstName: z.string().min(2).max(50),
  lastName: z.string().max(50).optional(),
  email: z.string().email().min(5).max(255),
  password: z.string().min(8).max(64),
})
