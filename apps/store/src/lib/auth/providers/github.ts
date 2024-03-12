import { GitHub } from 'arctic'

import { serverEnv as senv } from '@/env/server'

export const github = new GitHub(
  senv.GITHUB_CLIENT_ID,
  senv.GITHUB_CLIENT_SECRET,
)
