import { Column, Entity, OneToMany } from 'typeorm'

import { Store as MedusaStore } from '@medusajs/medusa'

import { Product } from './product'
import { ProductCollection } from './product-collection'
import { User } from './user'

@Entity()
export class Store extends MedusaStore {
  @Column({ nullable: true })
  origin?: string

  @OneToMany(() => User, (user) => user?.store)
  members?: User[]

  @OneToMany(() => Product, (product) => product?.store)
  products?: Product[]

  @OneToMany(() => ProductCollection, (product) => product?.store)
  collections?: ProductCollection[]
}
