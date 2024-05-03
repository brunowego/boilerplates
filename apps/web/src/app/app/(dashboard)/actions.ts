'use server'

import { getCachedSession } from '@/lib/auth/session'

export async function getSession() {
  return await getCachedSession()
}
