import { EntityRepository, Repository } from 'typeorm'
import { UserEntity } from '../entities/user.entity'
import { FindOneOptions } from 'typeorm'
import { SelectUserDto } from '../dto'

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async findOneBy(
    conditions: SelectUserDto,
    findOneOptions?: FindOneOptions<UserEntity>
  ): Promise<UserEntity> {
    return await this.findOne({
      where: { ...conditions },
      ...findOneOptions,
    })
  }

  public async getByEmail(email: string) {
    return await this.findOne({ where: { email } })
  }

  public async getByUsername(username: string) {
    return await this.findOne({ where: { username } })
  }
}
