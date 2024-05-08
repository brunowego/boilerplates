import { db } from './db'

export async function getUsers() {
  return await db.query.usersTable.findMany({
    columns: {
      id: true,
      firstName: true,
      lastName: true,
      createdAt: true,
    },
    limit: 15,
  })
}
