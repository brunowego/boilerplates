import { Type } from 'class-transformer'
import {
  IsEmail,
  IsOptional,
  IsString,
  Length,
  Matches,
  MaxLength,
  ValidateNested,
} from 'class-validator'
import { ShareSecurityDto } from './share-security.dto'

export class CreateShareDto {
  @IsString()
  @Matches('^[a-zA-Z0-9_-]*$', undefined, {
    message: 'ID can only contain letters, numbers, underscores and hyphens',
  })
  @Length(3, 50)
  id: string

  @IsString()
  expiration: string

  @MaxLength(512)
  @IsOptional()
  description: string

  @IsEmail({}, { each: true })
  recipients: string[]

  @ValidateNested()
  @Type(() => ShareSecurityDto)
  security: ShareSecurityDto
}
