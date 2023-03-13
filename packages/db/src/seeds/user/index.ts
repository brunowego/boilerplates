import { PrismaClient } from '@prisma/client'
import { UserData } from './data'

const prisma = new PrismaClient()

export async function userSeed(): Promise<void> {
  console.log('User seed')

  const insertUser = await prisma.user.createMany({
    data: Object.values(UserData),
    skipDuplicates: false,
  })

  console.log({ insertUser })
}
