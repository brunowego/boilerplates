import { PickType } from '@nestjs/swagger'
import { UserDto } from 'src/modules/user/dtos/user.dto'
import { IsString } from 'class-validator'

export class AuthResetPasswordDto extends PickType(UserDto, ['password']) {
  @IsString()
  token: string
}
