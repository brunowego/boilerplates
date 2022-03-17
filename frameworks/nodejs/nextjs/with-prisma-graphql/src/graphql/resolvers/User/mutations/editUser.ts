import { EditUserInput } from '@/graphql/types.generated'
import { RESERVED_USERNAMES, IS_PRODUCTION } from 'src/constants'
import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { ReasonPhrases } from 'http-status-codes'

/**
 * Edit the user
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @param input - EditUserInput
 * @returns the edited user
 */
export const editUser = async (query: Record<string, unknown>, input: EditUserInput) => {
  if (RESERVED_USERNAMES.includes(input.username)) {
    throw new Error(`Username "${input.username}" is reserved by us.`)
  }

  try {
    return await prisma.user.update({
      ...query,
      where: { id: input?.id },
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
