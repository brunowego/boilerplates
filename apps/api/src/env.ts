import { z } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>

const publicEnvSchema = z.object({
  NEST_PUBLIC_API_HOST: z.string().default('localhost'),
  NEST_PUBLIC_API_PORT: z.string().default('3000'),
})

export const publicEnv = publicEnvSchema.parse({
  NEST_PUBLIC_API_HOST: process.env.NEST_PUBLIC_API_HOST,
  NEST_PUBLIC_API_PORT: process.env.NEST_PUBLIC_API_HOST,
} satisfies Record<keyof PublicEnv, string | undefined>)

export type ServerEnv = z.infer<typeof serverEnvSchema>

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
  DATABASE_URL: z.string().url().min(1),
})

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
  DATABASE_URL: process.env.DATABASE_URL,
} satisfies Record<keyof ServerEnv, string | undefined>)
