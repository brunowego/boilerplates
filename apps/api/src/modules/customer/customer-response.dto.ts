import { Exclude, Transform, Expose } from 'class-transformer'

@Exclude()
export class CustomerResponseDto {
  @Transform(({ obj }) => obj?._id?.toString())
  id?: string

  @Expose()
  email?: string

  @Expose()
  fullName?: string

  @Expose()
  age?: number
}
