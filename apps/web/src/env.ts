import { z } from 'zod'

export type BundledEnv = z.infer<typeof bundledEnvSchema>

const bundledEnvSchema = z.object({
  NEXT_PUBLIC_API_MOCKING: z.literal('enabled').optional(),
})

export const bundledEnv = bundledEnvSchema.parse({
  NEXT_PUBLIC_API_MOCKING: process.env.NEXT_PUBLIC_API_MOCKING,
} satisfies Record<keyof BundledEnv, string | undefined>)
