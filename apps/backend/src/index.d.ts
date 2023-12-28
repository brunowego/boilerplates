export declare module '@medusajs/medusa/dist/models/store' {
  declare interface Store {
    members?: User[]
    products?: Product[]
    collections?: ProductCollection[]
  }
}

export declare module '@medusajs/medusa/dist/models/user' {
  declare interface User {
    store_id?: string
    store?: Store
  }
}

export declare module '@medusajs/medusa/dist/models/product' {
  declare interface Product {
    store_id?: string
    store?: Store
  }
}

export declare module '@medusajs/medusa/dist/models/product-collection' {
  declare interface ProductCollection {
    store_id?: string
    store?: Store
  }
}
