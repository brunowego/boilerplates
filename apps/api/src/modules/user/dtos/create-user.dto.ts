import { UserDto } from './user.dto'
import { Allow, MinLength, IsOptional } from 'class-validator'
import { plainToClass } from 'class-transformer'

export class CreateUserDto extends UserDto {
  @Allow()
  isAdmin: boolean

  @MinLength(8)
  @IsOptional()
  password: string

  from(partial: Partial<CreateUserDto>) {
    return plainToClass(CreateUserDto, partial, {
      excludeExtraneousValues: true,
    })
  }
}
