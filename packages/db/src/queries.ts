import db from './db'
import { eq } from './orm'
import { users } from './schema'

export async function getUsers() {
  return await db.query.users.findMany({
    columns: {
      id: true,
      fullName: true,
      email: true,
      createdAt: true,
    },
    limit: 15,
  })
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  })
}
