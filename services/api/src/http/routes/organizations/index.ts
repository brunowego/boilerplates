import { asc, desc, eq, AnyColumn, SQL, ilike, sql, and } from 'drizzle-orm'
import slugify from 'slugify'

import { logger } from '@acme/logger'

import { CustomHono, ErrorResponse } from '@/http/types'
import { db } from '@/db'
import { organizationsTable, membershipsTable, usersTable } from '@/db/schema'

import {
  getOrganizationsRoute,
  createOrganizationRoute,
  deleteOrganizationRoute,
  updateOrganizationRoute,
  deleteUserFromOrganizationRoute,
  acceptInvitationToOrganizationRoute,
  getOrganizationByIdOrSlugRoute,
} from './schema'
import { transformDatabaseUser } from '@/http/lib/transform-database-user'

const app = new CustomHono()

const organizationsRoutes = app
  .openapi(getOrganizationsRoute, async (ctx) => {
    const { q, sort, order, offset, limit } = ctx.req.valid('query')
    const user = ctx.get('user')

    const orderFunc = order === 'asc' ? asc : desc

    let orderColumn: AnyColumn

    switch (sort) {
      case 'name':
        orderColumn = organizationsTable.name
        break
      case 'createdAt':
        orderColumn = organizationsTable.createdAt
        break
      default:
        orderColumn = organizationsTable.id
        break
    }

    const filter: SQL | undefined = q
      ? ilike(organizationsTable.name, `%${q}%`)
      : undefined

    const organizationsQuery = db
      .select()
      .from(organizationsTable)
      .where(filter)
      .orderBy(orderFunc(orderColumn))

    const [{ total }] = await db
      .select({
        total: sql<number>`count(*)`.mapWith(Number),
      })
      .from(organizationsQuery.as('organizations'))

    if (user.role === 'ADMIN') {
      const result = await organizationsQuery.limit(+limit).offset(+offset)

      const organizations = result.map((organization) => ({
        ...organization,
        userRole: 'ADMIN' as const,
      }))

      logger.info('Organizations returned')

      return ctx.json({
        success: true,
        data: {
          items: organizations,
          total,
        },
      })
    }

    const result = await db
      .select({
        organization: organizationsTable,
        membership: membershipsTable,
      })
      .from(organizationsQuery.as('organizations'))
      .where(eq(membershipsTable.userId, user.id))
      .innerJoin(
        membershipsTable,
        eq(membershipsTable.organizationId, organizationsTable.id),
      )
      .orderBy(
        sort === 'userRole'
          ? orderFunc(membershipsTable.role)
          : asc(organizationsTable.id),
      )
      .limit(+limit)
      .offset(+offset)

    const organizations = result.map(({ organization, membership }) => ({
      ...organization,
      userRole: membership.role,
    }))

    logger.info('Organizations returned')

    return ctx.json({
      success: true,
      data: {
        items: organizations,
        total,
      },
    })
  })

  .openapi(createOrganizationRoute, async (ctx) => {
    const { name } = ctx.req.valid('json')

    const [organization] = await db
      .select()
      .from(organizationsTable)
      .where(ilike(organizationsTable.name, name))

    if (organization) {
      return ctx.json<ErrorResponse>(
        {
          success: false,
          error: 'Organization with this name already exists',
        },
        400,
      )
    }

    const [createdOrganization] = await db
      .insert(organizationsTable)
      .values({
        name,
        slug: slugify(name, {
          lower: true,
        }),
      })
      .returning()

    await db.insert(membershipsTable).values({
      organizationId: createdOrganization.id,
      userId: ctx.get('user').id,
      role: 'ADMIN',
    })

    logger.info(
      {
        organizationId: createdOrganization.id,
        organizationSlug: createdOrganization.slug,
      },
      'Organization created',
    )

    return ctx.json({
      success: true,
      data: {
        ...createdOrganization,
        userRole: 'ADMIN' as const,
      },
    })
  })

  .openapi(updateOrganizationRoute, async (ctx) => {
    const { organizationId } = ctx.req.valid('param')
    const user = ctx.get('user')

    const {
      name,
      shortName,
      country,
      timezone,
      defaultLanguage,
      languages,
      notificationEmail,
      emailDomains,
      brandColor,
      thumbnailUrl,
      logoUrl,
      bannerUrl,
      websiteUrl,
      welcomeText,
      authStrategies,
      chatSupport,
    } = ctx.req.valid('json')

    const [updatedOrganization] = await db
      .update(organizationsTable)
      .set({
        name,
        slug: name
          ? slugify(name, {
              lower: true,
            })
          : undefined,
        shortName,
        country,
        timezone,
        defaultLanguage,
        languages,
        notificationEmail,
        emailDomains,
        brandColor,
        thumbnailUrl,
        logoUrl,
        bannerUrl,
        websiteUrl,
        welcomeText,
        authStrategies,
        chatSupport,
        modifiedAt: new Date(),
        modifiedBy: user.id,
      })
      .where(eq(organizationsTable.id, organizationId))
      .returning()

    logger.info(
      {
        organizationId: updatedOrganization.id,
        organizationSlug: updatedOrganization.slug,
      },
      'Organization updated',
    )

    return ctx.json({
      success: true,
      data: {
        ...updatedOrganization,
        userRole: 'ADMIN' as const,
      },
    })
  })

  // .openapi(updateUserInOrganizationRoute, async (ctx) => {
  //   const { userId } = ctx.req.valid('param');
  //   const { role } = ctx.req.valid('json');
  //   const user = ctx.get('user');
  //   const organization = ctx.get('organization');

  //   const [targetUser] = await db.select().from(usersTable).where(eq(usersTable.id, userId));

  //   if (!targetUser) {
  //     customLogger('User not found', { userId });

  //     return ctx.json(createError(i18n, 'error.user_not_found', 'User not found'), 404);
  //   }

  //   const [membership] = await db
  //     .update(membershipsTable)
  //     .set({ role, modifiedBy: user.id, modifiedAt: new Date() })
  //     .where(and(eq(membershipsTable.organizationId, organization.id), eq(membershipsTable.userId, targetUser.id)))
  //     .returning();

  //   if (!membership) {
  //     customLogger('Membership not found', {
  //       userId: targetUser.id,
  //       userSlug: targetUser.slug,
  //       organizationId: organization.id,
  //       organizationSlug: organization.slug,
  //     });

  //     return ctx.json(createError(i18n, 'error.user_not_found', 'User not found'), 404);
  //   }

  //   customLogger('User updated in organization', {
  //     userId: targetUser.id,
  //     userSlug: targetUser.slug,
  //     organizationId: organization.id,
  //     organizationSlug: organization.slug,
  //   });

  //   return ctx.json({
  //     success: true,
  //     data: {
  //       ...transformDatabaseUser(targetUser),
  //       organizationRole: membership.role,
  //     },
  //   });
  // })

  .openapi(getOrganizationByIdOrSlugRoute, async (ctx) => {
    const user = ctx.get('user')
    const organization = ctx.get('organization')

    if (user.role === 'ADMIN') {
      logger.info(
        {
          organizationId: organization.id,
          organizationSlug: organization.slug,
        },
        'Organization returned',
      )

      return ctx.json({
        success: true,
        data: {
          ...organization,
          userRole: 'ADMIN' as const,
        },
      })
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

    logger.info(
      {
        organizationId: organization.id,
        organizationSlug: organization.slug,
      },
      'Organization returned',
    )

    return ctx.json({
      success: true,
      data: {
        ...organization,
        userRole: membership.role,
      },
    })
  })

  // .openapi(getUsersByOrganizationIdRoute, async (ctx) => {
  //   const { q, sort, order, offset, limit, role } = ctx.req.valid('query');
  //   const organization = ctx.get('organization');

  //   const orderFunc = order === 'asc' ? asc : desc;

  //   let orderColumn: AnyColumn;
  //   switch (sort) {
  //     case 'name':
  //       orderColumn = usersTable.name;
  //       break;
  //     case 'email':
  //       orderColumn = usersTable.email;
  //       break;
  //     case 'createdAt':
  //       orderColumn = usersTable.createdAt;
  //       break;
  //     case 'lastSeenAt':
  //       orderColumn = usersTable.lastSeenAt;
  //       break;
  //     default:
  //       orderColumn = usersTable.id;
  //       break;
  //   }

  //   const filter: SQL | undefined = q ? ilike(usersTable.email, `%${q}%`) : undefined;

  //   const usersQuery = db.select().from(usersTable).where(filter).as('users');

  //   const membersFilters = [eq(membershipsTable.organizationId, organization.id)];

  //   if (role) {
  //     membersFilters.push(eq(membershipsTable.role, role.toUpperCase() as MembershipModel['role']));
  //   }

  //   const membersQuery = db
  //     .select({
  //       user: usersTable,
  //       membership: membershipsTable,
  //     })
  //     .from(membershipsTable)
  //     .where(and(...membersFilters))
  //     .orderBy(sort === 'organizationRole' ? orderFunc(membershipsTable.role) : orderFunc(orderColumn))
  //     .innerJoin(usersQuery, eq(membershipsTable.userId, usersTable.id));

  //   const [{ total }] = await db
  //     .select({
  //       total: sql<number>`count(*)`.mapWith(Number),
  //     })
  //     .from(membersQuery.as('memberships'));

  //   customLogger('Members returned');

  //   const result = await membersQuery.limit(+limit).offset(+offset);

  //   const members = result.map(({ user, membership }) => ({
  //     ...transformDatabaseUser(user),
  //     organizationRole: membership.role,
  //   }));

  //   return ctx.json({
  //     success: true,
  //     data: {
  //       items: members,
  //       total,
  //     },
  //   });
  // })

  // .openapi(inviteUserToOrganizationRoute, async (ctx) => {
  //   const { emails } = ctx.req.valid('json');
  //   const user = ctx.get('user');

  //   for (const email of emails) {
  //     const [targetUser] = await db.select().from(usersTable).where(eq(usersTable.email, email.toLowerCase()));

  //     const organization = ctx.get('organization');

  //     if (targetUser) {
  //       const [existingMembership] = await db
  //         .select()
  //         .from(membershipsTable)
  //         .where(and(eq(membershipsTable.organizationId, organization.id), eq(membershipsTable.userId, targetUser.id)));

  //       if (existingMembership) {
  //         customLogger('User already member of organization', {
  //           userId: targetUser.id,
  //           userSlug: targetUser.slug,
  //           organizationId: organization.id,
  //           organizationSlug: organization.slug,
  //         });

  //         continue;
  //       }
  //     }

  //     const verificationToken = generateId(40);
  //     await db.insert(tokensTable).values({
  //       id: verificationToken,
  //       userId: targetUser?.id,
  //       email: email.toLowerCase(),
  //       organizationId: organization.id,
  //       expiresAt: createDate(new TimeSpan(7, 'd')),
  //     });

  //     const emailHtml = render(
  //       InviteUserToOrganizationEmail({
  //         orgName: organization.name || '',
  //         orgImage: organization.logoUrl || '',
  //         userImage: targetUser?.thumbnailUrl || '',
  //         username: targetUser?.name || email.toLowerCase() || '',
  //         inviteUrl: `${config.frontendUrl}/accept-invite/${verificationToken}`,
  //         i18n,
  //       }),
  //     );

  //     try {
  //       emailSender.send(
  //         env.SEND_ALL_TO_EMAIL || config.senderIsReceiver ? user.email : email.toLowerCase(),
  //         `Added to ${organization.name} on Cella`,
  //         emailHtml,
  //       );
  //     } catch (error) {
  //       customLogger(
  //         'Error sending email',
  //         {
  //           errorMessage: (error as Error).message,
  //         },
  //         'error',
  //       );
  //     }

  //     customLogger('User invited to organization', {
  //       userId: user?.id,
  //       userSlug: user?.slug,
  //       organizationId: organization.id,
  //       organizationSlug: organization.slug,
  //     });
  //   }

  //   return ctx.json({
  //     success: true,
  //     data: undefined,
  //   });
  // })

  // .openapi(checkIsEmailExistsByInviteTokenRoute, async (ctx) => {
  //   const token = ctx.req.valid('param').token;

  //   const [tokenRecord] = await db
  //     .select()
  //     .from(tokensTable)
  //     .where(and(eq(tokensTable.id, token)));

  //   if (tokenRecord?.email) {
  //     const [user] = await db.select().from(usersTable).where(eq(usersTable.email, tokenRecord.email));

  //     if (user) {
  //       return ctx.json({
  //         success: true,
  //       });
  //     }
  //   }

  //   return ctx.json({
  //     success: false,
  //   });
  // })

  // .openapi(acceptInvitationToOrganizationRoute, async (ctx) => {
  //   const { password, oauth } = ctx.req.valid('json')
  //   const verificationToken = ctx.req.valid('param').token

  //   const [token] = await db
  //     .select()
  //     .from(tokensTable)
  //     .where(and(eq(tokensTable.id, verificationToken)))

  //   if (
  //     !token ||
  //     !token.organizationId ||
  //     !token.email ||
  //     !isWithinExpirationDate(token.expiresAt)
  //   ) {
  //     return ctx.json(
  //       createError(i18n, 'error.invalid_token', 'Invalid token'),
  //       400,
  //     )
  //   }

  //   const [organization] = await db
  //     .select()
  //     .from(organizationsTable)
  //     .where(eq(organizationsTable.id, token.organizationId))

  //   if (!organization) {
  //     return ctx.json(
  //       createError(
  //         i18n,
  //         'error.organization_not_found',
  //         'Organization not found',
  //       ),
  //       404,
  //     )
  //   }

  //   let user: User

  //   if (token.userId) {
  //     ;[user] = await db
  //       .select()
  //       .from(usersTable)
  //       .where(and(eq(usersTable.id, token.userId)))

  //     if (!user || user.email !== token.email) {
  //       return ctx.json(
  //         createError(i18n, 'error.invalid_token', 'Invalid token'),
  //         400,
  //       )
  //     }
  //   } else if (password || oauth) {
  //     const hashedPassword = password
  //       ? await new Argon2id().hash(password)
  //       : undefined
  //     const userId = nanoid()
  //     ;[user] = await db
  //       .insert(usersTable)
  //       .values({
  //         id: userId,
  //         slug: userId,
  //         email: token.email,
  //         emailVerified: true,
  //         hashedPassword,
  //       })
  //       .returning()

  //     if (password) {
  //       await db
  //         .delete(tokensTable)
  //         .where(and(eq(tokensTable.id, verificationToken)))

  //       const session = await auth.createSession(userId, {})
  //       const sessionCookie = auth.createSessionCookie(session.id)

  //       ctx.header('Set-Cookie', sessionCookie.serialize())
  //     }
  //   } else {
  //     return ctx.json(
  //       createError(i18n, 'error.invalid_token', 'Invalid token'),
  //       400,
  //     )
  //   }

  //   await db
  //     .insert(membershipsTable)
  //     .values({
  //       organizationId: token.organizationId,
  //       userId: user.id,
  //       role: 'MEMBER',
  //       createdBy: user.id,
  //     })
  //     .returning()

  //   if (oauth === 'github') {
  //     const response = await fetch(
  //       `${config.backendUrl + githubSignInRoute.path}?redirect=${
  //         organization.slug
  //       }`,
  //       {
  //         method: githubSignInRoute.method,
  //         redirect: 'manual',
  //       },
  //     )

  //     const url = response.headers.get('Location')

  //     if (response.status === 302 && url) {
  //       ctx.header('Set-Cookie', response.headers.get('Set-Cookie') ?? '', {
  //         append: true,
  //       })
  //       setCookie(ctx, 'oauth_invite_token', verificationToken, {
  //         secure: config.mode === 'production', // set `Secure` flag in HTTPS
  //         path: '/',
  //         httpOnly: true,
  //         maxAge: 60 * 10, // 10 min
  //       })

  //       return ctx.json({
  //         success: true,
  //         data: url,
  //       })

  //       // return ctx.json({}, 302, {
  //       //   Location: url,
  //       // });

  //       // return ctx.redirect(url, 302);
  //     }

  //     return ctx.json(
  //       createError(i18n, 'error.invalid_token', 'Invalid token'),
  //       400,
  //     )
  //   }

  //   return ctx.json({
  //     success: true,
  //     data: `${config.frontendUrl}/${organization.slug}`,
  //   })
  // })

  .openapi(deleteUserFromOrganizationRoute, async (ctx) => {
    const { userId } = ctx.req.valid('param')

    if (ctx.get('user').id === userId) {
      logger.info({ userId }, 'User cannot delete himself')

      return ctx.json(
        {
          success: false,
          error: 'You cannot delete yourself from the organization',
        },
        403,
      )
    }

    const organization = ctx.get('organization')

    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.id, userId))

    if (!user) {
      logger.info({ userId }, 'User not found')

      return ctx.json({ success: false, error: 'User not found' }, 404)
    }

    const [membership] = await db
      .delete(membershipsTable)
      .where(
        and(
          eq(membershipsTable.organizationId, organization.id),
          eq(membershipsTable.userId, user.id),
        ),
      )
      .returning()

    logger.info(
      {
        userId: user.id,
        userName: user.username,
        organizationId: organization.id,
        organizationSlug: organization.slug,
      },
      'User deleted from organization',
    )

    return ctx.json({
      success: true,
      data: {
        ...transformDatabaseUser(user),
        organizationRole: membership.role,
      },
    })
  })

  .openapi(deleteOrganizationRoute, async (ctx) => {
    const { organizationId } = ctx.req.valid('param')

    const [{ id, slug }] = await db
      .delete(organizationsTable)
      .where(eq(organizationsTable.id, organizationId))
      .returning()

    logger.info(
      { organizationId: id, organizationSlug: slug },
      'Organization deleted',
    )

    return ctx.json({
      success: true,
      data: undefined,
    })
  })

export default organizationsRoutes
