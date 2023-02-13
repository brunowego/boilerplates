import { Query, Resolver } from '@nestjs/graphql'
import { User } from './user.entity'
import { UserService } from './user.service'

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [User])
  async user(): Promise<User[]> {
    return this.userService.all()
  }
}
