import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsEmail } from 'class-validator'
import { IsUniqueEmail } from '@/common/decorators/is-unique-email.decorator'

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUniqueEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fname: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  lname: string
}
