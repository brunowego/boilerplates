import { OmitType, PartialType } from '@nestjs/swagger'
import { UserDto } from './user.dto'

export class UpdateOwnUserDto extends PartialType(
  OmitType(UserDto, ['isAdmin', 'password'] as const)
) {}
