import { db } from './db'

export async function getWorkspaces() {
  return await db.query.workspacesTable.findMany({
    columns: {
      id: true,
      name: true,
      slug: true,
      createdAt: true,
    },
    limit: 15,
  })
}
