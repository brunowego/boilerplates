import { IsEmail, IsNotEmpty, MinLength, Matches } from 'class-validator'
import { Transform } from 'class-transformer'
import { CreateUserProfileDto } from './create-user-profile.dto'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string

  @MinLength(3)
  @Transform(({ value }) => (value as string).toLowerCase().replace(/[ ]/gi, '-'))
  @Matches(/^[a-z0-9-]+$/, {
    message: 'username can contain only lowercase characters, numbers and hyphens',
  })
  readonly username: string

  readonly profile: CreateUserProfileDto
}
