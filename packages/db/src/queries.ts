import { db } from './db'

export async function getFirstUser() {
  return await db.query.usersTable.findFirst({
    columns: {
      fullName: true,
      image: true,
    },
  })
}
