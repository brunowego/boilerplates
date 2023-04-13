import { IsString, IsNotEmpty, IsOptional } from 'class-validator'

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsOptional()
  content?: string

  @IsString()
  @IsNotEmpty()
  authorId: string
}
