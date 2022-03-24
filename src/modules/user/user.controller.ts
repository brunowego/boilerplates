import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Post,
  Patch,
  Body,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { UUIDParam } from '@/decorators'
import { CreateUserDto, UpdateUserDto } from './dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async findAll() {
    return this.userService.findAll()
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  public findOneById(@UUIDParam('id') id: string) {
    return this.userService.findOneById(id)
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto)
  }

  @Patch(':id')
  public update(@UUIDParam('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto)
  }

  @Delete(':id')
  public remove(@UUIDParam('id') id: string) {
    return this.userService.remove(id)
  }
}
