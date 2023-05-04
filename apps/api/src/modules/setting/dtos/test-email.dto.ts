import { IsEmail, IsNotEmpty } from 'class-validator'

export class TestEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string
}
