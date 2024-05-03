import { db } from './db'

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
