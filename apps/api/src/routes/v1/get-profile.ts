import Elysia from 'elysia'

import { db } from '@/lib/db'

import { authentication } from '../../authentication'

export const getProfile = new Elysia()
  .use(authentication)
  .get('/me', async ({ getCurrentUser }) => {
    const { sub: userId } = await getCurrentUser()

    const user = await db.query.users.findFirst({
      where(fields, { eq }) {
        return eq(fields.id, userId)
      },
    })

    if (!user) throw new Error('User not found.')

    return user
  })
