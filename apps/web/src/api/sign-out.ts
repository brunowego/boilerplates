import { api } from '@/lib/axios'

export async function signOut() {
  await api.post('/v1/sign-out')
}
