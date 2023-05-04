import { AuthSigninDto } from './auth-signin.dto'
import { IsString } from 'class-validator'

export class AuthSigninMfaDto extends AuthSigninDto {
  @IsString()
  code: string

  @IsString()
  loginToken: string
}
