import { Column, Entity, Index, JoinColumn, ManyToOne } from 'typeorm'

import { ProductCollection as MedusaProductCollection } from '@medusajs/medusa'

import { Store } from './store'

@Entity()
export class ProductCollection extends MedusaProductCollection {
  @Index('CollectionStoreId')
  @Column({ nullable: true })
  store_id?: string

  @ManyToOne(() => Store, (store) => store.collections)
  @JoinColumn({ name: 'store_id', referencedColumnName: 'id' })
  store?: Store
}
