import { Query, Resolver } from '@nestjs/graphql'
import { PostService } from './post.service'
import { Post } from './post.entity'

@Resolver(() => Post)
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Query(() => [Post])
  async post(): Promise<Post[]> {
    return this.postService.all()
  }
}
