import { OmitType } from '@nestjs/swagger'
import { Expose, plainToClass, Type } from 'class-transformer'
import { MyShareDto } from 'src/modules/share/dtos/my-share.dto'
import { ReverseShareDto } from './reverse-share.dto'

export class ReverseShareTokenWithShares extends OmitType(ReverseShareDto, [
  'shareExpiration',
] as const) {
  @Expose()
  shareExpiration: Date

  @Expose()
  @Type(() => OmitType(MyShareDto, ['recipients', 'hasPassword'] as const))
  shares: Omit<MyShareDto, 'recipients' | 'files' | 'from' | 'fromList' | 'hasPassword'>[]

  @Expose()
  remainingUses: number

  fromList(partial: Partial<ReverseShareTokenWithShares>[]) {
    return partial.map((part) =>
      plainToClass(ReverseShareTokenWithShares, part, {
        excludeExtraneousValues: true,
      })
    )
  }
}
