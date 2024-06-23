import db from './db'
import { eq } from './orm'
import { users } from './schema'

export async function getWorkpaces() {
  return await db.query.workspaces.findMany({
    columns: {
      id: true,
      name: true,
      current: true,
    },
  })
}

export async function getUserByEmail(email: string) {
  return await db.query.users.findFirst({
    where: eq(users.email, email),
  })
}
