import { z } from 'zod'

export type PublicEnv = z.infer<typeof publicEnvSchema>

const publicEnvSchema = z.object({
  NEXT_PUBLIC_BASE_URL: z.string().url(),
})

export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
} satisfies Record<keyof PublicEnv, string | undefined>)

export type ServerEnv = z.infer<typeof serverEnvSchema>

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
})

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
} satisfies Record<keyof ServerEnv, string | undefined>)
