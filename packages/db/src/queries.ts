import db from './db'
import { workspaces, users, memberships } from './schema'
import { eq, and } from './orm'

export async function getWorkpacesByUserId(userId: string) {
  return await db
    .select({
      workspaces: {
        id: workspaces.id,
        name: workspaces.name,
        current: workspaces.current,
      },
    })
    .from(workspaces)
    .innerJoin(memberships, eq(workspaces.id, memberships.workspaceId))
    .where(eq(memberships.userId, userId))
    .then((res) => res.map((r) => r.workspaces))
}

export async function getUserByEmail(email: string) {
  return await db
    .select({
      user: {
        id: users.id,
        fullName: users.fullName,
        email: users.email,
        emailVerified: users.emailVerified,
        hashedPassword: users.hashedPassword,
        image: users.image,
      },
      workspace: {
        id: workspaces.id,
      },
    })
    .from(users)
    .innerJoin(memberships, eq(users.id, memberships.userId))
    .innerJoin(
      workspaces,
      and(
        eq(memberships.workspaceId, workspaces.id),
        eq(workspaces.current, true),
      ),
    )
    .where(eq(users.email, email))
    .then((res) => {
      const result = res[0]

      return {
        id: result?.user.id as string,
        fullName: result?.user.fullName as string,
        email: result?.user.email as string,
        emailVerified: result?.user.emailVerified as Date,
        hashedPassword: result?.user.hashedPassword as string,
        image: result?.user.image as string,
        workspaceId: result?.workspace.id,
      }
    })
}
