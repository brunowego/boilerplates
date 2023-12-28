import { dataSource } from '@medusajs/medusa/dist/loaders/database'
import { ProductCollectionRepository as MedusaProductCollectionRepository } from '@medusajs/medusa/dist/repositories/product-collection'

import { ProductCollection } from '../models/product-collection'

export const ProductCollectionRepository = dataSource.getRepository(ProductCollection).extend({
  ...Object.assign(MedusaProductCollectionRepository, {
    target: ProductCollection,
  }),
})

export default ProductCollectionRepository
