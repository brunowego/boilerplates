import { Expose, plainToClass } from 'class-transformer'

export class ShareMetadataDto {
  @Expose()
  id: string

  @Expose()
  isZipReady: boolean

  from(partial: Partial<ShareMetadataDto>) {
    return plainToClass(ShareMetadataDto, partial, {
      excludeExtraneousValues: true,
    })
  }
}
