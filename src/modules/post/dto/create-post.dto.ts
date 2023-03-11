import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePostDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  content?: string

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  authorId: string
}
