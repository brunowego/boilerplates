import type { z } from 'zod'

import type { checkUsernameAvailabilityQuerySchema } from './schemas'
import { db } from './db'
import { eq } from './orm'
import { usersTable } from './schema'

export async function checkUsernameAvailability({
  q,
}: z.infer<typeof checkUsernameAvailabilityQuerySchema>): Promise<boolean> {
  return !(await db.query.usersTable.findFirst({
    columns: {
      id: true,
    },
    where: eq(usersTable.username, q),
  }))
}
