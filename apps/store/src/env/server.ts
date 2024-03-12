import { z } from 'zod'

export type ServerEnv = z.infer<typeof serverEnvSchema>

export const serverEnvSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).optional(),
})

export const serverEnv = serverEnvSchema.parse({
  NODE_ENV: process.env.NODE_ENV,
} satisfies Record<keyof ServerEnv, string | undefined>)
