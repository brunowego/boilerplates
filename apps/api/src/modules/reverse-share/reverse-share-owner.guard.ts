import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { PrismaService } from 'src/common/services/prisma.service'
import { Request } from 'express'
import { User } from '@acme/db'

@Injectable()
export class ReverseShareOwnerGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()
    const { reverseShareId } = request.params

    const reverseShare = await this.prismaService.reverseShare.findUnique({
      where: { id: reverseShareId },
    })

    if (!reverseShare) return false

    return reverseShare.creatorId == (request.user as User).id
  }
}
