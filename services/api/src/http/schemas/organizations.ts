import { z } from '@hono/zod-openapi'
import { createSelectSchema, createInsertSchema } from 'drizzle-zod'

import { membershipsTable, organizationsTable } from '@/db/schema'

import { apiUserSchema } from './user'
import { passwordSchema, slugSchema } from './common'

export const membershipSchema = createSelectSchema(membershipsTable)

export const apiOrganizationSchema = z.object({
  ...createSelectSchema(organizationsTable).shape,
  createdAt: z.string(),
  modifiedAt: z.string().nullable(),
  languages: z.array(z.string()).nullable(),
  emailDomains: z.array(z.string()).nullable(),
  authStrategies: z.array(z.string()).nullable(),
  userRole: membershipSchema.shape.role.openapi({
    description: 'The role of the current user in the organization',
  }),
})

export const apiOrganizationUserSchema = z.object({
  ...apiUserSchema.shape,
  organizationRole: membershipSchema.shape.role.openapi({
    description: 'The role of the user in the organization',
  }),
})

export const updateOrganizationJsonSchema = createInsertSchema(
  organizationsTable,
  {
    languages: z.array(z.string()).optional(),
    emailDomains: z.array(z.string()).optional(),
    authStrategies: z.array(z.string()).optional(),
  },
)
  .pick({
    name: true,
    shortName: true,
    country: true,
    timezone: true,
    defaultLanguage: true,
    languages: true,
    notificationEmail: true,
    emailDomains: true,
    brandColor: true,
    thumbnailUrl: true,
    logoUrl: true,
    bannerUrl: true,
    websiteUrl: true,
    welcomeText: true,
    authStrategies: true,
    chatSupport: true,
  })
  .partial()

export const createOrganizationJsonSchema = z.object({
  name: apiOrganizationSchema.shape.name
    .openapi({
      example: 'Acme Inc',
    })
    .regex(/^[a-zA-Z0-9 _-]+$/)
    .min(3),
})

export const idSchema = z.string().openapi({
  example: 'DhCQiulsFi6ebZf',
})

export const getOrganizationParamSchema = z.object({
  organizationId: slugSchema.or(idSchema),
})

export const getUsersByOrganizationIdParamSchema = z.object({
  organizationId: idSchema,
})

export const updateOrganizationParamSchema = z.object({
  organizationId: idSchema,
})

export const updateUserInOrganizationParamSchema = z.object({
  organizationId: idSchema,
  userId: idSchema,
})

export const updateUserInOrganizationJsonSchema = z.object({
  role: membershipSchema.shape.role.openapi({
    description: 'The role of the user in the organization',
  }),
})

export const inviteUserToOrganizationParamSchema = z.object({
  organizationId: idSchema,
})

export const inviteUserToOrganizationJsonSchema = z.object({
  emails: apiOrganizationUserSchema.shape.email
    .openapi({
      description: 'The email of the user to add to the organization',
    })
    .array()
    .min(1),
})

export const acceptInvitationToOrganizationJsonSchema = z.object({
  password: passwordSchema.optional(),
  oauth: z.enum(['google', 'github']).optional(),
})

export const deleteOrganizationParamSchema = z.object({
  organizationId: idSchema,
})

export const deleteUserFromOrganizationParamSchema = z.object({
  organizationId: idSchema,
  userId: idSchema,
})
