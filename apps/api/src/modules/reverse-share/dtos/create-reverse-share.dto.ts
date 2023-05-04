import { IsBoolean, IsString, Max, Min } from 'class-validator'

export class CreateReverseShareDto {
  @IsBoolean()
  sendEmailNotification: boolean

  @IsString()
  maxShareSize: string

  @IsString()
  shareExpiration: string

  @Min(1)
  @Max(1000)
  maxUseCount: number
}
