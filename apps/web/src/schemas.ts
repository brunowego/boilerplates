import z from '@acme/ui/lib/zod'

export const updateSubscriberPreferenceSchema = z.object({
  templateId: z.string(),
  teamId: z.string(),
  revalidatePath: z.string(),
  subscriberId: z.string(),
  type: z.string(),
  enabled: z.boolean(),
})
