import { usersTable } from '../schema'
import { db } from '../db'
import { eq } from '../orm'

export const createUser = async (data: typeof usersTable.$inferInsert) =>
  await db.insert(usersTable).values(data)

export const findUserByEmail = async (email: string) =>
  await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
  })

export const findUserByGithubId = async (githubId: number) =>
  await db.query.usersTable.findFirst({
    where: eq(usersTable.githubId, githubId),
  })

export const findUserByGoogleId = async (googleId: string) =>
  await db.query.usersTable.findFirst({
    where: eq(usersTable.googleId, googleId),
  })

export const updateUser = async (
  userId: string,
  data: Omit<typeof usersTable.$inferInsert, 'id' | 'email'>,
) => {
  await db.update(usersTable).set(data).where(eq(usersTable.id, userId))
}
