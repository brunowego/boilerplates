import { Expose, plainToClass, Type } from 'class-transformer'
import { FileDto } from 'src/modules/file/file.dto'
import { PublicUserDto } from 'src/modules/user/dtos/public-user.dto'

export class ShareDto {
  @Expose()
  id: string

  @Expose()
  expiration: Date

  @Expose()
  @Type(() => FileDto)
  files: FileDto[]

  @Expose()
  @Type(() => PublicUserDto)
  creator: PublicUserDto

  @Expose()
  description: string

  @Expose()
  hasPassword: boolean

  from(partial: Partial<ShareDto>) {
    return plainToClass(ShareDto, partial, { excludeExtraneousValues: true })
  }

  fromList(partial: Partial<ShareDto>[]) {
    return partial.map((part) => plainToClass(ShareDto, part, { excludeExtraneousValues: true }))
  }
}
