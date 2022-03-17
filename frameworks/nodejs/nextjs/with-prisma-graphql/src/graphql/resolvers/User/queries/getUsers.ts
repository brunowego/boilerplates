import { prisma } from '@/lib/prisma'

/**
 * Get list of all users
 * @param query - Contains an include object to pre-load data needed to resolve nested parts.
 * @returns list of all users
 */
export const getUsers = async (query: Record<string, unknown>) => {
  return await prisma.user.findMany({
    ...query,
    orderBy: { username: 'desc' },
  })
}
