import { getSession } from '@/lib/auth/session'

export async function createContext() {
  const session = await getSession()

  return {
    session,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
