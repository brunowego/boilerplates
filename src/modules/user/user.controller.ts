import {
  Controller,
  UseInterceptors,
  ClassSerializerInterceptor,
  Get,
  Query,
  Post,
  Patch,
  Body,
  Delete,
} from '@nestjs/common'
import { UserService } from './user.service'
import { PaginationQueryDto } from '@/common/dto'
import { UUIDParam } from '@/decorators'
import { CreateUserDto, UpdateUserDto } from './dto'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  public async findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.userService.findAll(paginationQuery)
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
