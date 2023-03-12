import { Module } from '@nestjs/common'
import { PostController } from './post.controller'
import { PrismaService } from '@/common/services/prisma.service'
import { PostService } from './post.service'

@Module({
  controllers: [PostController],
  providers: [PrismaService, PostService],
})
export class PostModule {}
