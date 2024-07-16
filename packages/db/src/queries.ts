import type { z } from 'zod'

import db from './db'
import type { getUsersQuerySchema } from './schemas'
import { users } from './schema'
import { and, ilike, sql } from './orm'

export async function getUsers({
  search,
  sortBy = 'createdAt',
  page,
}: z.infer<typeof getUsersQuerySchema>) {
  return await db.query.users.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      createdAt: true,
    },
    where: and(
      search ? ilike(users.firstName, `%${decodeURI(search)}%`) : undefined,
    ),
    orderBy: (user, { asc, desc }) => [
      ...(sortBy === 'createdAt' ? [desc(user.createdAt)] : []),
      ...(sortBy === 'firstName' ? [asc(user.firstName)] : []),
      ...(sortBy === 'lastName' ? [asc(user.lastName)] : []),
    ],
    limit: 15,
    ...(page && {
      offset: (page - 1) * 15,
    }),
  })
}

export async function getUsersCount({ search }: { search?: string }) {
  return await db
    .select({ total: sql<number>`count(*)` })
    .from(users)
    .where(
      and(
        search ? ilike(users.firstName, `%${decodeURI(search)}%`) : undefined,
      ),
    )
}
