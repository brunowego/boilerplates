import { Expose, plainToClass } from 'class-transformer'
import { ShareDto } from './share.dto'

export class MyShareDto extends ShareDto {
  @Expose()
  views: number

  @Expose()
  createdAt: Date

  @Expose()
  recipients: string[]

  from(partial: Partial<MyShareDto>) {
    return plainToClass(MyShareDto, partial, { excludeExtraneousValues: true })
  }

  fromList(partial: Partial<MyShareDto>[]) {
    return partial.map((part) => plainToClass(MyShareDto, part, { excludeExtraneousValues: true }))
  }
}
