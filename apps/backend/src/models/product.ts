import { Product as MedusaProduct } from '@medusajs/medusa'
import { Column, Entity } from 'typeorm'

@Entity()
export class Product extends MedusaProduct {
  @Column()
  barcode: string
}
