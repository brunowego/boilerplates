import { z } from 'zod'

const SCHEMA_COMMA_SEPARATED_URLS = z.string().refine(
  (v) => {
    const urls = v.split(',')

    return urls.every((url) => z.string().min(1).url().safeParse(url).success)
  },
  {
    message: 'Must be a comma separated list of URLs',
  },
)

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  HOST: z.string().default('localhost'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string().url().min(1),
  CORS_ALLOWED_ORIGINS: SCHEMA_COMMA_SEPARATED_URLS.optional(),
})

export const env = envSchema.parse(process.env)
