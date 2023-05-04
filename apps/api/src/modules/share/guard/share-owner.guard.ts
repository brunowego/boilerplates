import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common'
import { User } from '@acme/db'
import { Request } from 'express'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class ShareOwnerGuard implements CanActivate {
  constructor(private prismaService: PrismaService) {}

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()

    const shareId = Object.prototype.hasOwnProperty.call(request.params, 'shareId')
      ? request.params.shareId
      : request.params.id

    const share = await this.prismaService.share.findUnique({
      where: { id: shareId },
      include: { security: true },
    })

    if (!share) throw new NotFoundException('Share not found')

    if (!share.creatorId) return true

    return share.creatorId == (request.user as User).id
  }
}
