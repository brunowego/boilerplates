import { DeleteDateColumn } from 'typeorm'

import { BaseEntity } from './base-entity'

export abstract class SoftDeletableEntity extends BaseEntity {
  @DeleteDateColumn()
  deleted_at: Date | null
}
