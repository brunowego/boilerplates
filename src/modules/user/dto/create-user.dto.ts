import { IsEmail, IsNotEmpty, MinLength, Matches, IsString } from 'class-validator'
import { Transform } from 'class-transformer'

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

  // @IsString()
  // @IsNotEmpty()
  // readonly fname: string

  // @IsString()
  // @IsNotEmpty()
  // readonly lname: string
}
