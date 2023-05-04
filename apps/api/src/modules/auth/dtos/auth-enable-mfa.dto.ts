import { PickType } from '@nestjs/swagger'
import { UserDto } from 'src/modules/user/dtos/user.dto'

export class AuthEnableMfaDto extends PickType(UserDto, [
  'password',
  'mfaMethod',
  'mfaPhone',
] as const) {}
