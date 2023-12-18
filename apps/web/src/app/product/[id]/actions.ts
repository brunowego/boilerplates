'use server'

import medusa from '@/lib/medusa'

export const findProduct = async ({ id }: { id: string }): Promise<any | undefined> => {
  return medusa.admin.products.retrieve(id).then(({ product }) => product)
}
