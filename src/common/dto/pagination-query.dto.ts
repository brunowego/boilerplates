import { IsOptional, IsPositive } from 'class-validator'

export class PaginationQueryDto {
  @IsOptional()
  @IsPositive()
  limit: Number = 10

  @IsOptional()
  @IsPositive()
  offset: Number
}
