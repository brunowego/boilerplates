import { IsString, IsNotEmpty, IsEmail } from 'class-validator'
import { IsUniqueEmail } from '@/common/decorators/is-unique-email.decorator'

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUniqueEmail()
  email: string

  @IsString()
  @IsNotEmpty()
  fname: string

  @IsString()
  @IsNotEmpty()
  lname: string
}
