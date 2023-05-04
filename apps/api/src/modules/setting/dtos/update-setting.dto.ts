import { IsString, IsNotEmpty } from 'class-validator'

export class UpdateSettingDto {
  @IsString()
  key: string

  @IsNotEmpty()
  value: string | number | boolean
}
