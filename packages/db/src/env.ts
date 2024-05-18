import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  DATABASE_URL: z.string().url().min(1),
})

export const env = envSchema.parse(process.env)
