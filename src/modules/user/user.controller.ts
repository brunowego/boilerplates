import { Controller, Post, Body, Get, Param } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { User as UserModel } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<UserModel> {
    return this.userService.create(createUserDto)
  }

  @Get(':id')
  async getById(@Param('id') id: string): Promise<UserModel | null> {
    return this.userService.findOne({ id })
  }
}
