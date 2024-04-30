import { LinkedIn } from '../lib/arctic'

export const linkedin = new LinkedIn(
  process.env.LINKEDIN_CLIENT_ID as string,
  process.env.LINKEDIN_CLIENT_SECRET as string,
  process.env.LINKEDIN_REDIRECT_URI as string,
)
