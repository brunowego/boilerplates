import { Expose, plainToClass } from 'class-transformer'

export class AuthTokenDto {
  @Expose()
  accessToken: string

  @Expose()
  refreshToken: string

  from(partial: Partial<AuthTokenDto>) {
    return plainToClass(AuthTokenDto, partial, {
      excludeExtraneousValues: true,
    })
  }
}
