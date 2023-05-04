import { PickType } from '@nestjs/swagger'
import { UserDto } from './user.dto'

export class PublicUserDto extends PickType(UserDto, ['username'] as const) {}
