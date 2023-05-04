import { PickType } from '@nestjs/swagger'
import { UserDto } from 'src/modules/user/dtos/user.dto'
import { IsString } from 'class-validator'

export class AuthVerifyMfaDto extends PickType(UserDto, ['password'] as const) {
  @IsString()
  code: string
}
