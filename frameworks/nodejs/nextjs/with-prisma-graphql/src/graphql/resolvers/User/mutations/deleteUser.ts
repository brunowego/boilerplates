import { DeleteUserInput } from '@/graphql/types.generated'
import { prisma } from '@/lib/prisma'
import { Result } from '@/graphql/resolvers/ResultResolver'

/**
 * Delete the user
 * @param input - DeleteUserInput
 * @returns the result
 */
export const deleteUser = async (input: DeleteUserInput) => {
  const user = await prisma.user.findUnique({
    where: { id: input.id },
  })

  await prisma.user.delete({
    where: { id: user?.id },
  })

  return Result.SUCCESS
}
