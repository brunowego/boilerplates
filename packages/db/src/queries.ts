import { db } from './db'
import { eq } from './orm'
import { filesTable } from './schema'

export async function getFileById(id: string) {
  return await db.query.filesTable.findFirst({
    columns: {
      id: true,
      title: true,
      filename: true,
      url: true,
      createdAt: true,
    },
    where: eq(filesTable.id, id),
  })
}

export async function getFiles() {
  return await db.query.filesTable.findMany({
    columns: {
      id: true,
      title: true,
      filename: true,
      url: true,
      createdAt: true,
    },
    limit: 15,
  })
}
