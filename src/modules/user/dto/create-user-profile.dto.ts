import { IsNotEmpty, IsString } from 'class-validator'

export class CreateUserProfileDto {
  @IsString()
  @IsNotEmpty()
  readonly fname: string

  @IsString()
  @IsNotEmpty()
  readonly lname: string
}
