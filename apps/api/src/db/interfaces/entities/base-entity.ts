import { PrimaryColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm'

export abstract class BaseEntity {
  @PrimaryColumn()
  id: string

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date
}
