import { createDate, TimeSpan } from 'oslo'

import { getCachedSession } from '@/lib/auth/session'
import { generateId } from '@acme/id'
import { db } from '@acme/db'
import { tokensTable } from '@acme/db/schema'
import { and, eq } from '@/lib/db/orm'

export async function GET(): Promise<Response> {
  const { user } = await getCachedSession()

  if (!user) {
    return new Response('Unauthorized', {
      status: 401,
    })
  }

  await db
    .delete(tokensTable)
    .where(
      and(eq(tokensTable.userId, user.id), eq(tokensTable.type, 'QUICK_ADD')),
    )

  const token = generateId()

  await db.insert(tokensTable).values({
    id: token,
    type: 'QUICK_ADD',
    userId: user.id,
    email: user.email.toLowerCase(),
    expiresAt: createDate(new TimeSpan(5, 'm')),
  })

  return new Response(token, {
    status: 200,
  })
}
