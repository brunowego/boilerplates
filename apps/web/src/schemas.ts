import z from '@acme/ui/lib/zod'

export const insertWorkspaceSchema = z.object({
  logo: z.string(),
  name: z.string().min(1).max(50),
  handle: z.string().min(1).max(50),
  teamSize: z.number().int().min(1).max(1000),
  companyIndustry: z.number().int().min(1).max(1000),
})
