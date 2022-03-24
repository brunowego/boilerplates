import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm'
import { Exclude } from 'class-transformer'

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ length: 255, unique: true })
  email: string

  @Column({ length: 20, unique: true })
  username: string

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date
}
