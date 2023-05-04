import { ExecutionContext, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { Request } from 'express'
import moment from 'moment'
import { PrismaService } from 'src/common/services/prisma.service'
import { ShareSecurityGuard } from 'src/modules/share/guard/share-security.guard'
import { ShareService } from 'src/modules/share/share.service'

@Injectable()
export class FileSecurityGuard extends ShareSecurityGuard {
  constructor(private _shareService: ShareService, private _prismaService: PrismaService) {
    super(_shareService, _prismaService)
  }

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest()

    const shareId = Object.prototype.hasOwnProperty.call(request.params, 'shareId')
      ? request.params.shareId
      : request.params.id

    const shareToken = request.cookies[`share_${shareId}_token`]

    const share = await this._prismaService.share.findUnique({
      where: { id: shareId },
      include: { security: true },
    })

    if (!shareToken) {
      if (!share || (moment().isAfter(share.expiration) && !moment(share.expiration).isSame(0))) {
        throw new NotFoundException('File not found')
      }

      if (share.security?.password) throw new ForbiddenException('This share is password protected')

      if (share.security?.maxViews && share.security.maxViews <= share.views) {
        throw new ForbiddenException('Maximum views exceeded', 'share_max_views_exceeded')
      }

      await this._shareService.increaseViewCount(share)

      return true
    } else {
      return super.canActivate(context)
    }
  }
}
