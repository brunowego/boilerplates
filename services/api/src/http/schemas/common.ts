import { z } from '@hono/zod-openapi'

export const emailSchema = z
  .string()
  .email()
  .refine((value) => !value.includes('+'), {
    message:
      'We do not allow disposable addresses or email subaddressing (+ sign use)',
  })
  .openapi({
    example: 'john.doe@example.com',
  })

export const passwordSchema = z
  .string()
  .regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,100}$/,
    'Minimum eight you must be contains At least 1 upper case, lower case, numeric, and special character',
  )
  .openapi({
    example: '$8$3wuOsA9b8',
  })

export const usernameSchema = z
  .string()
  .regex(
    /^[a-z0-9_-]{3,16}$/,
    'Username must be in lowercase; digits, underscore, and hyphen are allowed',
  )
  .openapi({
    example: 'john-doe',
  })

export const cookieSchema = z.string().openapi({
  example:
    'auth_session=4z32pgmh91th9xigf6nlu1stptms03jdafch4khr; Expires=Wed, 06 Nov 2024 09:20:00 GMT; Path=/; Secure; HttpOnly; Domain=localhost',
  description: 'Cookie containing the session id',
})

export const errorResponseSchema = z.object({
  success: z.boolean().default(false),
  error: z.string().openapi({
    description: 'Error message localized in user language or English',
    example: 'Error',
  }),
})

export const successResponseWithDataSchema = <T extends z.ZodTypeAny>(
  schema: T,
) => z.object({ success: z.boolean(), data: schema })

export const successResponseWithoutDataSchema = z.object({
  success: z.boolean(),
})

export const paginationQuerySchema = z.object({
  q: z
    .string()
    .optional()
    .openapi({
      param: {
        description: 'Search query',
      },
    }),
  sort: z
    .enum(['id'])
    .optional()
    .default('id')
    .openapi({
      param: {
        description: 'Sort by',
      },
    }),
  order: z
    .enum(['asc', 'desc'])
    .optional()
    .default('asc')
    .openapi({
      param: {
        description: 'Sort order',
      },
    }),
  offset: z
    .string()
    .optional()
    .default('0')
    .refine((value) => {
      if (!Number.isNaN(Number(value)) && Number(value) >= 0) {
        return true
      }

      return false
    }, 'Must be a number greater than or equal to 0'),
  limit: z
    .string()
    .optional()
    .default('50')
    .refine((value) => {
      if (!Number.isNaN(Number(value)) && Number(value) > 0) {
        return true
      }

      return false
    }, 'Must be a number greater than 0'),
})

export const successResponseWithPaginationSchema = <T extends z.ZodTypeAny>(
  schema: T,
) =>
  z.object({
    success: z.boolean(),
    data: z.object({
      items: schema.array().openapi({
        description: 'The items',
      }),
      total: z.number().openapi({
        description: 'The total number of items',
        example: 1,
      }),
    }),
  })

export const slugSchema = z.string().openapi({
  examples: ['DhCQiulsFi6ebZf', 'john-doe'],
})
