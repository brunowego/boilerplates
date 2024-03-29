import { z } from 'zod'

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(64),
  recaptcha: z.string().min(1),
})
