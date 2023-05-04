import { Expose, plainToClass } from 'class-transformer'

export class ReverseShareDto {
  @Expose()
  id: string

  @Expose()
  maxShareSize: string

  @Expose()
  shareExpiration: Date

  from(partial: Partial<ReverseShareDto>) {
    return plainToClass(ReverseShareDto, partial, {
      excludeExtraneousValues: true,
    })
  }
}
