import { CanActivate, ExecutionContext, Injectable, NotFoundException } from '@nestjs/common'
import { Request } from 'express'
import moment from 'moment'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class ShareTokenSecurity implements CanActivate {
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

    if (!share || (moment().isAfter(share.expiration) && !moment(share.expiration).isSame(0)))
      throw new NotFoundException('Share not found')

    return true
  }
}
