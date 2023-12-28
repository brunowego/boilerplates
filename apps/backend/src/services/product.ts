import { Lifetime } from 'awilix'
import { Store } from 'src/models/store'

import { ProductService as MedusaProductService, Product } from '@medusajs/medusa'
import {
  FindProductConfig,
  CreateProductInput as MedusaCreateProductInput,
  ProductSelector as MedusaProductSelector,
} from '@medusajs/medusa/dist/types/product'

type ProductSelector = {
  store_id?: string
} & MedusaProductSelector

type CreateProductInput = {
  store_id?: string
} & MedusaCreateProductInput

class ProductService extends MedusaProductService {
  static LIFE_TIME = Lifetime.SCOPED
  protected readonly _store: Store | null

  constructor(container, options) {
    // @ts-expect-error prefer-rest-params
    super(...arguments)

    try {
      this._store = container.store
    } catch (e) {
      // avoid errors when backend first runs
    }
  }

  async list(selector: ProductSelector, config?: FindProductConfig): Promise<Product[]> {
    if (!selector.store_id && this._store?.id) {
      selector.store_id = this._store?.id
    }

    config.select?.push('store_id')

    config.relations?.push('store')

    return await super.list(selector, config)
  }

  async listAndCount(
    selector: ProductSelector,
    config?: FindProductConfig,
  ): Promise<[Product[], number]> {
    if (!selector.store_id && this._store?.id) {
      selector.store_id = this._store?.id
    }

    config.select?.push('store_id')

    config.relations?.push('store')

    return await super.listAndCount(selector, config)
  }

  async retrieve(productId: string, config?: FindProductConfig): Promise<Product> {
    config.relations = [...(config.relations || []), 'store']

    const product = await super.retrieve(productId, config)

    if (product.store?.id && this._store?.id && product.store.id !== this._store?.id) {
      // Throw error if you don't want a product to be accessible to other stores
      throw new Error('Product does not exist in store.')
    }

    return product
  }

  async create(productObject: CreateProductInput): Promise<Product> {
    if (!productObject.store_id && this._store?.id) {
      productObject.store_id = this._store?.id
    }

    return await super.create(productObject)
  }
}

export default ProductService
