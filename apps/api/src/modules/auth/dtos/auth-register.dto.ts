import { PickType } from '@nestjs/swagger'
import { UserDto } from 'src/modules/user/dtos/user.dto'

export class AuthRegisterDto extends PickType(UserDto, [
  'email',
  'username',
  'password',
] as const) {}
