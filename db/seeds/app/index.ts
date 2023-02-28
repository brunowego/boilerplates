import { PrismaClient } from '@prisma/client'
import { appData as data } from './data'

const prisma = new PrismaClient()

export async function appSeed() {
  console.log('App seed')

  const insertApp = await prisma.app.createMany({
    data,
    skipDuplicates: false,
  })

  console.log({ insertApp })
}
