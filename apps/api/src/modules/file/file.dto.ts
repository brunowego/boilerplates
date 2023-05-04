import { Expose, plainToClass } from 'class-transformer'
import { ShareDto } from 'src/modules/share/dtos/share.dto'

export class FileDto {
  @Expose()
  id: string

  @Expose()
  name: string

  @Expose()
  size: string

  share: ShareDto

  from(partial: Partial<FileDto>) {
    return plainToClass(FileDto, partial, { excludeExtraneousValues: true })
  }
}
