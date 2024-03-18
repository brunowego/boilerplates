import type { User } from '@acme/auth'
import { getSession } from '@/lib/auth/session'

export type MeResponse = User

export async function GET(): Promise<Response> {
  const session = await getSession()

  if (!session.user || !session.session) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return Response.json(session.user)
}
