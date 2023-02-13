import { Controller } from '@nestjs/common'
import { UserService } from './user.service'
import { MessagePattern, Payload } from '@nestjs/microservices'

@Controller()
export class UserController {
  constructor(private userService: UserService) {}

  @MessagePattern('user.findById')
  async findById(@Payload() userId: number) {
    return await this.userService.findById(userId)
  }
}
