import { Expose, plainToClass } from 'class-transformer'
import { Matches, Length, IsEmail, MinLength, IsEnum, IsOptional } from 'class-validator'
import type { MfaMethod } from '@acme/db'

export class UserDto {
  @Expose()
  id: string

  @Expose()
  @Matches('^[a-zA-Z0-9_.]*$', undefined, {
    message: 'Username can only contain letters, numbers, dots and underscores',
  })
  @Length(3, 32)
  username: string

  @Expose()
  @IsEmail()
  email: string

  @MinLength(8)
  password: string

  @Expose()
  isAdmin: boolean

  @Expose()
  @IsEnum(['NONE', 'TOTP', 'SMS', 'EMAIL'])
  mfaMethod: MfaMethod

  @Expose()
  // @MinLength(13)
  @IsOptional()
  mfaPhone: string

  @Expose()
  mfaVerified: boolean

  from(partial: Partial<UserDto>) {
    return plainToClass(UserDto, partial, { excludeExtraneousValues: true })
  }

  fromList(partial: Partial<UserDto>[]) {
    return partial.map((part) => plainToClass(UserDto, part, { excludeExtraneousValues: true }))
  }
}
