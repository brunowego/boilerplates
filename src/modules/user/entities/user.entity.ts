import {
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinTable,
  OneToOne,
} from 'typeorm'
import { Exclude } from 'class-transformer'
import { UserProfileEntity } from './user-profile.entity'

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

  @JoinTable()
  @OneToOne(() => UserProfileEntity, (profile: UserProfileEntity) => profile.user, {
    cascade: true,
  })
  profile: UserProfileEntity

  // @Expose()
  // get fullName(): string {
  //   return `${this.fname} ${this.lname}`.trim()
  // }
}
