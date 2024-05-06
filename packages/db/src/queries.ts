// import 'server-only'

import { db } from './db'
import { eq } from './orm'
import { usersTable } from './schema'

export async function getUsers() {
  return await db.query.usersTable.findMany({
    columns: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
    },
    limit: 15,
  })
}

export async function getUserByEmail(email: string) {
  return await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  })
}
