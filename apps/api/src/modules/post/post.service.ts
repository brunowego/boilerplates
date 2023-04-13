import { Injectable } from '@nestjs/common'
import { PrismaService } from '@/common/services/prisma.service'
import { Prisma, Post } from '@acme/db'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.PostCreateInput): Promise<Post> {
    return this.prisma.post.create({
      data,
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.PostWhereUniqueInput
    where?: Prisma.PostWhereInput
    orderBy?: Prisma.PostOrderByWithRelationInput
  }): Promise<Post[]> {
    const { skip, take, cursor, where, orderBy } = params

    return this.prisma.post.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    })
  }

  async findOne(postWhereUniqueInput: Prisma.PostWhereUniqueInput): Promise<Post | null> {
    return this.prisma.post.findUnique({
      where: postWhereUniqueInput,
    })
  }

  async update(params: {
    where: Prisma.PostWhereUniqueInput
    data: Prisma.PostUpdateInput
  }): Promise<Post> {
    const { data, where } = params
    return this.prisma.post.update({
      data,
      where,
    })
  }

  async remove(where: Prisma.PostWhereUniqueInput): Promise<Post> {
    return this.prisma.post.delete({
      where,
    })
  }
}
