import { Controller, Get, Param } from '@nestjs/common'
import { TransformPlainToInstance } from 'class-transformer'

import { UserService } from './user.service'
import { UserResponseDto } from './user-response.dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  @TransformPlainToInstance(UserResponseDto)
  async getUserById(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.userService.findById(id)
  }
}
