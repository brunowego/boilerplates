import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url().min(1),
})

export const env = envSchema.parse(process.env)
