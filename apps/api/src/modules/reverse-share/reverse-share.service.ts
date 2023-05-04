import { BadRequestException, Injectable } from '@nestjs/common'
import moment from 'moment'
import { SettingService } from 'src/modules/setting/setting.service'
import { FileService } from 'src/modules/file/file.service'
import { PrismaService } from 'src/common/services/prisma.service'
import { CreateReverseShareDto } from './dtos/create-reverse-share.dto'

@Injectable()
export class ReverseShareService {
  constructor(
    private settingService: SettingService,
    private prismaService: PrismaService,
    private fileService: FileService
  ) {}

  async create(data: CreateReverseShareDto, creatorId: string) {
    const expirationDate = moment()
      .add(
        data.shareExpiration.split('-')[0],
        data.shareExpiration.split('-')[1] as moment.unitOfTime.DurationConstructor
      )
      .toDate()

    const globalMaxShareSize = this.settingService.get('share.maxSize')

    if (globalMaxShareSize < data.maxShareSize)
      throw new BadRequestException(
        `Max share size can't be greater than ${globalMaxShareSize} bytes.`
      )

    const reverseShare = await this.prismaService.reverseShare.create({
      data: {
        shareExpiration: expirationDate,
        remainingUses: data.maxUseCount,
        maxShareSize: data.maxShareSize,
        sendEmailNotification: data.sendEmailNotification,
        creatorId,
      },
    })

    return reverseShare.token
  }

  async getByToken(reverseShareToken?: string) {
    if (!reverseShareToken) return null

    const reverseShare = await this.prismaService.reverseShare.findUnique({
      where: { token: reverseShareToken },
    })

    return reverseShare
  }

  async getAllByUser(userId: string) {
    const reverseShares = await this.prismaService.reverseShare.findMany({
      where: {
        creatorId: userId,
        shareExpiration: { gt: new Date() },
      },
      orderBy: {
        shareExpiration: 'desc',
      },
      include: { shares: { include: { creator: true } } },
    })

    return reverseShares
  }

  async isValid(reverseShareToken: string) {
    const reverseShare = await this.prismaService.reverseShare.findUnique({
      where: { token: reverseShareToken },
    })

    if (!reverseShare) return false

    const isExpired = new Date() > reverseShare.shareExpiration
    const remainingUsesExceeded = reverseShare.remainingUses <= 0

    return !(isExpired || remainingUsesExceeded)
  }

  async remove(id: string) {
    const shares = await this.prismaService.share.findMany({
      where: { reverseShare: { id } },
    })

    for (const share of shares) {
      await this.prismaService.share.delete({ where: { id: share.id } })
      await this.fileService.deleteAllFiles(share.id)
    }

    await this.prismaService.reverseShare.delete({ where: { id } })
  }
}
