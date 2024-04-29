import { db } from './db'
import { eq } from './orm'
import { productsTable } from './schema'

export async function getProductById(id: string) {
  return await db.query.productsTable.findFirst({
    columns: {
      id: true,
      title: true,
    },
    with: {
      images: {
        columns: {
          filename: true,
          url: true,
        },
        orderBy: (images, { desc }) => [desc(images.createdAt)],
      },
    },
    where: eq(productsTable.id, id),
  })
}
