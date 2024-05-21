import type { UserRole, UserStatus } from './types'
import { db } from './db'
import { usersTable } from './schema'
import { and, ilike, eq, inArray } from './orm'

export async function getUsers(
  query: string,
  role: UserRole,
  statuses: UserStatus[],
) {
  return await db
    .select({
      id: usersTable.id,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
      createdAt: usersTable.createdAt,
    })
    .from(usersTable)
    .where(
      and(
        query
          ? ilike(usersTable.firstName, `%${decodeURI(query)}%`)
          : undefined,
        role ? eq(usersTable.role, role) : undefined,
        statuses.length > 0 ? inArray(usersTable.status, statuses) : undefined,
      ),
    )
    .limit(24)
}
