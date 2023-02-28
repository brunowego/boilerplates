import { Controller, Post, Body } from '@nestjs/common'
import { UserService } from './user.service'
import { User as UserModel } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body() userData: { email: string; fname: string; lname: string }
  ): Promise<UserModel> {
    return this.userService.create(userData)
  }
}
