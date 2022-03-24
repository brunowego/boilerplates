import { Injectable } from '@nestjs/common'
import { UserRepository } from './repositories'
import { UserEntity } from './entities'
import { UserNotFoundException, EmailTakenException, UsernameTakenException } from '@/exceptions'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  public findAll(): Promise<UserEntity[]> {
    return this.userRepository.find()
  }

  public async findOneById(id: string): Promise<UserEntity> {
    const user = await this.userRepository.findOneBy({ id })

    if (!user) {
      throw new UserNotFoundException()
    }

    return user
  }

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, username } = createUserDto

    if (await this.userRepository.getByEmail(email)) {
      throw new EmailTakenException()
    }

    if (await this.userRepository.getByUsername(username)) {
      throw new UsernameTakenException()
    }

    const user = this.userRepository.create(createUserDto)

    return this.userRepository.save<UserEntity>(user)
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    })

    if (!user) {
      throw new UserNotFoundException()
    }

    return this.userRepository.save<UserEntity>(user)
  }

  public async remove(id: string): Promise<void> {
    const user = await this.findOneById(id)

    if (!user) {
      throw new UserNotFoundException()
    }

    this.userRepository.remove(user)
  }
}
