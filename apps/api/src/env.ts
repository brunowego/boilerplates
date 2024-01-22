import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().url().min(1),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION: z.string().default('1d'),
})

export const env = envSchema.parse(process.env)
