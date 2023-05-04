import { PickType } from '@nestjs/swagger'
import { UserDto } from 'src/modules/user/dtos/user.dto'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class AuthSigninDto extends PickType(UserDto, ['password'] as const) {
  @IsEmail()
  @IsOptional()
  email: string

  @IsString()
  @IsOptional()
  username: string
}
