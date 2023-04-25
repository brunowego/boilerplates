import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsString } from 'class-validator'

export class SignUpDto {
  @ApiProperty()
  @IsEmail()
  readonly email!: string

  @ApiProperty()
  @IsString()
  readonly name!: string
}
