import { Body, Controller, Delete, Get, Param, Patch, Post, Res, UseGuards } from '@nestjs/common'
import { User } from '@acme/db'
import { Response } from 'express'
import { GetUser } from 'src/modules/auth/get-user.decorator'
import { IsAdminGuard } from 'src/modules/auth/guards/is-admin.guard'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { CreateUserDto } from './dtos/create-user.dto'
import { UpdateOwnUserDto } from './dtos/update-own-user.dto'
import { UpdateUserDto } from './dtos/update-user.dto'
import { UserDto } from './dtos/user.dto'
import { UserSevice } from './user.service'

@Controller('users')
export class UserController {
  constructor(private userService: UserSevice) {}

  @Get('me')
  @UseGuards(JwtGuard)
  async getCurrentUser(@GetUser() user: User) {
    return new UserDto().from(user)
  }

  @Patch('me')
  @UseGuards(JwtGuard)
  async updateCurrentUser(@GetUser() user: User, @Body() data: UpdateOwnUserDto) {
    return new UserDto().from(await this.userService.update(user.id, data))
  }

  @Delete('me')
  @UseGuards(JwtGuard)
  async deleteCurrentUser(@GetUser() user: User, @Res({ passthrough: true }) response: Response) {
    response.cookie('access_token', 'accessToken', { maxAge: -1 })
    response.cookie('refresh_token', '', {
      path: '/api/auth/token',
      httpOnly: true,
      maxAge: -1,
    })

    return new UserDto().from(await this.userService.delete(user.id))
  }

  @Get()
  @UseGuards(JwtGuard, IsAdminGuard)
  async list() {
    return new UserDto().fromList(await this.userService.list())
  }

  @Post()
  @UseGuards(JwtGuard, IsAdminGuard)
  async create(@Body() user: CreateUserDto) {
    return new UserDto().from(await this.userService.create(user))
  }

  @Patch(':id')
  @UseGuards(JwtGuard, IsAdminGuard)
  async update(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return new UserDto().from(await this.userService.update(id, user))
  }

  @Delete(':id')
  @UseGuards(JwtGuard, IsAdminGuard)
  async delete(@Param('id') id: string) {
    return new UserDto().from(await this.userService.delete(id))
  }
}
