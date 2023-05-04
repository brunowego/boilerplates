import { Expose, plainToClass } from 'class-transformer'
import { SettingDto } from './setting.dto'

export class AdminSettingDto extends SettingDto {
  @Expose()
  name: string

  @Expose()
  secret: boolean

  @Expose()
  defaultValue: string

  @Expose()
  updatedAt: Date

  @Expose()
  description: string

  @Expose()
  obscured: boolean

  from(partial: Partial<AdminSettingDto>) {
    return plainToClass(AdminSettingDto, partial, {
      excludeExtraneousValues: true,
    })
  }

  fromList(partial: Partial<AdminSettingDto>[]) {
    return partial.map((part) =>
      plainToClass(AdminSettingDto, part, { excludeExtraneousValues: true })
    )
  }
}
