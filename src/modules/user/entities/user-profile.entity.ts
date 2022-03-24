import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, JoinColumn, OneToOne } from 'typeorm'
import { Exclude } from 'class-transformer'
import { UserEntity } from './user.entity'

@Entity('user_profiles')
export class UserProfileEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'uuid', name: 'user_id' })
  @Exclude()
  userId!: string

  @Column({ length: 50 })
  fname: string

  @Column({ length: 50 })
  lname: string

  @JoinColumn({ name: 'user_id' })
  @OneToOne(() => UserEntity, (user: UserEntity) => user.profile, { onDelete: 'CASCADE' })
  user!: UserEntity
}
