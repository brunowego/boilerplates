import { Entity, PrimaryColumn, Column } from 'typeorm'

import { SoftDeletableEntity } from '@/db/interfaces/entities/soft-deletable-entity'

@Entity('products')
export class Product extends SoftDeletableEntity {
  @PrimaryColumn()
  id: string

  @Column({
    length: 100,
  })
  nome: string

  @Column()
  price: number
}
