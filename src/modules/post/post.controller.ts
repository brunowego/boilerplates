import { Controller, Post, Body, Get, Param, Put, Delete } from '@nestjs/common'
import { PostService } from './post.service'
import { Post as PostModel } from '@generated/prisma-client'
import { CreatePostDto } from './dto/create-post.dto'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('draft')
  async draft(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    return this.postService.create(createPostDto)
  }

  @Get('feed')
  async getPublishedPosts(): Promise<PostModel[]> {
    return this.postService.findAll({
      where: { published: true },
    })
  }

  @Get('filtered/:searchString')
  async getFilteredPosts(@Param('searchString') searchString: string): Promise<PostModel[]> {
    return this.postService.findAll({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })
  }

  @Get(':id')
  async getPostById(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.findOne({ id })
  }

  @Put('publish/:id')
  async publish(@Param('id') id: string): Promise<PostModel> {
    return this.postService.update({
      where: { id },
      data: { published: true },
    })
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<PostModel> {
    return this.postService.remove({ id })
  }
}
