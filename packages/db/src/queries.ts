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
    .leftJoin(memberships, eq(users.id, memberships.userId))
    .leftJoin(
      workspaces,
      and(
        eq(memberships.workspaceId, workspaces.id),
        eq(workspaces.current, true),
      ),
    )
    .where(eq(users.email, email))
    .then((res) => {
      const user = res[0]?.user

      if (!user) {
        return null
      }

      return {
        id: user.id as string,
        fullName: user.fullName as string,
        email: user.email as string,
        emailVerified: user.emailVerified as Date,
        hashedPassword: user.hashedPassword as string,
        image: user.image as string,
        workspaceId: res[0]?.workspace?.id,
      }
    })
}
