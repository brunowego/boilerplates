import { db } from './db'
import { eq } from './orm'
import { productsTable } from './schema'

export async function getProductById(id: string) {
  return await db.query.productsTable.findFirst({
    columns: {
      id: true,
    },
    with: {
      images: {
        columns: {
          url: true,
        },
        orderBy: (images, { desc }) => [desc(images.createdAt)],
      },
    },
    where: eq(productsTable.id, id),
  })
}
