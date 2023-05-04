import { SettingDto } from './setting.dto'
import { Expose, plainToClass } from 'class-transformer'

export class CategorySettingDto extends SettingDto {
  @Expose()
  name: string

  @Expose()
  secret: boolean

  @Expose()
  default_value: string

  @Expose()
  updated_at: Date

  @Expose()
  description: string

  @Expose()
  obscured: boolean

  from(partial: Partial<CategorySettingDto>) {
    return plainToClass(CategorySettingDto, partial, {
      excludeExtraneousValues: true,
    })
  }

  fromList(partial: Partial<CategorySettingDto>[]) {
    return partial.map((part) =>
      plainToClass(CategorySettingDto, part, { excludeExtraneousValues: true })
    )
  }
}
