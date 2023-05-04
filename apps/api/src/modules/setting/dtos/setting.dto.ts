import { Expose, plainToClass } from 'class-transformer'

export class SettingDto {
  @Expose()
  key: string

  @Expose()
  value: string

  @Expose()
  type: string

  fromList(partial: Partial<SettingDto>[]) {
    return partial.map((part) => plainToClass(SettingDto, part, { excludeExtraneousValues: true }))
  }
}
