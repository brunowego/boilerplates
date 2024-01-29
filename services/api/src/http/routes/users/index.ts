import { sql, eq, ilike } from 'drizzle-orm'

import { CustomHono } from '@/http/types'
import { membershipsTable, usersTable } from '@/db/schema'
import { db } from '@/db'
// import { transformDatabaseUser } from '@/http/lib/transform-database-user'

import { meRoute, checkUsernameRoute } from './schema'

const app = new CustomHono()

export const userRoutes = app
  .openapi(meRoute, async (ctx) => {
    const user = ctx.get('user')

    const [{ total: membershipCount }] = await db
      .select({
        total: sql<number>`count(*)`.mapWith(Number),
      })
      .from(membershipsTable)
      .where(eq(membershipsTable.userId, user.id))

    return ctx.json({
      success: true,
      data: {
        // ...transformDatabaseUser(user),
        ...user,
        membershipCount,
      },
    })
  })

  .openapi(checkUsernameRoute, async (ctx) => {
    const { username } = ctx.req.valid('param')

    const [user] = await db
      .select()
      .from(usersTable)
      .where(ilike(usersTable.username, username))

    return ctx.json({
      success: true,
      data: !!user,
    })
  })
