import { Controller } from '@nestjs/common'
import { PostService } from './post.service'
import { MessagePattern, Payload } from '@nestjs/microservices'
import { Post } from './post.entity'

@Controller()
export class PostController {
  constructor(private readonly postService: PostService) {}

  @MessagePattern('post.getByUserId')
  public post(@Payload() userId: number): Promise<Post[]> {
    return this.postService.findByUserId(userId)
  }
}
