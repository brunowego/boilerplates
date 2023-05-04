import { IsNotEmpty, IsString } from 'class-validator'

class UpdateSettingDto {
  @IsString()
  key: string

  @IsNotEmpty()
  value: string | number | boolean
}

export default UpdateSettingDto
