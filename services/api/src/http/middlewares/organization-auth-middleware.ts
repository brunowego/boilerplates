import { and, eq, or } from 'drizzle-orm'
import { MiddlewareHandler } from 'hono'

import { db } from '@/db'
import { logger } from '@acme/logger'

import { Membership, membershipsTable, organizationsTable } from '@/db/schema'
import { Env, ErrorResponse } from '../types'

const organizationAuthMiddleware =
  (
    accessibleFor?: Membership['role'][],
  ): MiddlewareHandler<Env, ':organizationId'> =>
  async (ctx, next) => {
    const organizationIdentifier = ctx.req.param('organizationId')
    const user = ctx.get('user')

    const [organization] = await db
      .select()
      .from(organizationsTable)
      .where(
        or(
          eq(organizationsTable.id, organizationIdentifier),
          eq(organizationsTable.slug, organizationIdentifier),
        ),
      )

    if (!organization) {
      logger.info({ organizationIdentifier }, 'Organization not found')

      return ctx.json<ErrorResponse>(
        {
          success: false,
          error: 'Organization not found',
        },
        404,
      )
    }

    const [membership] = await db
      .select()
      .from(membershipsTable)
      .where(
        and(
          eq(membershipsTable.userId, user.id),
          eq(membershipsTable.organizationId, organization.id),
        ),
      )

    if (
      (!membership ||
        (accessibleFor && !accessibleFor.includes(membership.role))) &&
      user.role !== 'ADMIN'
    ) {
      logger.info(
        {
          userId: user.id,
          organizationId: organization.id,
        },
        'User forbidden in organization',
      )

      return ctx.json<ErrorResponse>(
        { success: false, error: 'Forbidden' },
        403,
      )
    }

    ctx.set('organization', organization)

    logger.info(
      {
        userId: user.id,
        organizationId: organization.id,
      },
      'User authenticated in organization',
    )

    await next()
  }

export default organizationAuthMiddleware
