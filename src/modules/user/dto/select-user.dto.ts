import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { IsUUID, IsNotEmpty } from 'class-validator'

export class SelectUserDto extends PartialType(CreateUserDto) {
  @IsUUID('4')
  @IsNotEmpty()
  readonly id: string
}
