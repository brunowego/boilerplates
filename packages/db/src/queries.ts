import type { z } from 'zod'

import { db } from './db'
import type { getUsersQuerySchema } from './schemas'
import { usersTable } from './schema'
import { and, ilike, sql } from './orm'

export async function getUsers({
  search,
  sort = 'createdAt',
  page,
}: z.infer<typeof getUsersQuerySchema>) {
  return await db.query.usersTable.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      username: true,
      createdAt: true,
    },
    where: and(
      search
        ? ilike(usersTable.firstName, `%${decodeURI(search)}%`)
        : undefined,
    ),
    orderBy: (user, { asc, desc }) => [
      ...(sort === 'createdAt' ? [desc(user.createdAt)] : []),
      ...(sort === 'firstName' ? [asc(user.firstName)] : []),
      ...(sort === 'lastName' ? [asc(user.lastName)] : []),
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
    .from(usersTable)
    .where(
      and(
        search
          ? ilike(usersTable.firstName, `%${decodeURI(search)}%`)
          : undefined,
      ),
    )
}
