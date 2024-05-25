import { db } from './db'
import { eq } from './orm'
import { pagesTable } from './schema'

export async function getPages() {
  return await db.query.pagesTable.findMany({
    columns: {
      id: true,
      title: true,
      handle: true,
      createdAt: true,
    },
    limit: 15,
  })
}

export async function getPageById(id: string) {
  return await db.query.pagesTable.findFirst({
    columns: {
      id: true,
      title: true,
      handle: true,
      data: true,
      createdAt: true,
    },
    where: eq(pagesTable.id, id),
  })
}
