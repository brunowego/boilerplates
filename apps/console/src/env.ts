import { z } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>

const publicEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url().min(1),
  NEXT_PUBLIC_MEDUSA_BACKEND_URL: z.string().url().min(1),
  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY: z.string().min(1),
})

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  NEXT_PUBLIC_MEDUSA_BACKEND_URL: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL,
  NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY:
    process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_API_KEY,
} satisfies Record<keyof PublicEnv, string | undefined>)

export type ServerEnv = z.infer<typeof serverEnvSchema>

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  // DATABASE_URL: z.string().url().min(1),
})

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  // DATABASE_URL: process.env.DATABASE_URL,
} satisfies Record<keyof ServerEnv, string | undefined>)
