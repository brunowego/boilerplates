import z from '@acme/ui/lib/zod'

const insetSkillSchema = z.object({
  name: z.string().min(1).max(20),
  level: z.number().int().min(1).max(5),
  enabled: z.boolean(),
})

export const insertPersonalSchema = z.object({
  firstName: z.string().min(1).max(20),
  lastName: z.string().min(1).max(20),
  skills: z.array(insetSkillSchema),
})
