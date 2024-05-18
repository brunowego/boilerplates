import { db } from './db'
import { eq } from './orm'
import { usersTable, profilesTable } from './schema'

export async function getUsers() {
  return await db.query.usersTable.findMany({
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
  return await db.query.usersTable.findFirst({
    columns: {
      id: true,
      fullName: true,
      email: true,
      hashedPassword: true,
    },
    where: eq(usersTable.email, email),
  })
}

export async function getProfileByUserId(userId: string) {
  return await db.query.profilesTable.findFirst({
    columns: {
      firstName: true,
      lastName: true,
    },
    where: eq(profilesTable.userId, userId),
  })
}
