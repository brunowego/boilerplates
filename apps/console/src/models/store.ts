import { Entity, Property } from '@mikro-orm/core'
import { Store as MedusaStore } from '@medusajs/store'

@Entity({ tableName: 'store' })
export default class Store extends MedusaStore {
  @Property({ columnType: 'text', nullable: true })
  color?: string
}
