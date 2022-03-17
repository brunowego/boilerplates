import { CreateUserInput } from '@/graphql/types.generated'
import { RESERVED_USERNAMES, IS_PRODUCTION } from '@/constants'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ReasonPhrases } from 'http-status-codes'

/**
 * Creates a new user
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - CreateUserInput
 * @returns a new user
 */
export const createUser = async (query: Record<string, unknown>, input: CreateUserInput) => {
  if (RESERVED_USERNAMES.includes(input.slug)) {
    throw new Error(`Username "${input.slug}" is reserved by us.`)
  }

  try {
    return await prisma.user.create({
      ...query,
      data: {
        email: input.email,
        username: input.username,
      },
    })
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        throw new Error('Username is already taken!')
      }

      throw new Error(IS_PRODUCTION ? ReasonPhrases.INTERNAL_SERVER_ERROR : error.message)
    }
  }
}
