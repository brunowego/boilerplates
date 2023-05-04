import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import { JwtService } from '@nestjs/jwt'
import { Share, User } from '@acme/db'
import archiver from 'archiver'
import * as argon from 'argon2'
import * as fs from 'fs'
import moment from 'moment'
import { ClamScanService } from 'src/modules/clamscan/clamscan.service'
import { SettingService } from 'src/modules/setting/setting.service'
import { ConfigService } from '@nestjs/config'
import { EmailService } from 'src/modules/email/email.service'
import { FileService } from 'src/modules/file/file.service'
import { PrismaService } from 'src/common/services/prisma.service'
import { ReverseShareService } from 'src/modules/reverse-share/reverse-share.service'
import { CreateShareDto } from './dtos/create-share.dto'

@Injectable()
export class ShareService {
  constructor(
    private prismaService: PrismaService,
    private fileService: FileService,
    private emailService: EmailService,
    private settingService: SettingService,
    private configService: ConfigService,
    private jwtService: JwtService,
    private reverseShareService: ReverseShareService,
    private clamScanService: ClamScanService
  ) {}

  async create(share: CreateShareDto, user?: User, reverseShareToken?: string) {
    if (!(await this.isShareIdAvailable(share.id)).isAvailable)
      throw new BadRequestException('Share id already in use')

    if (!share.security || Object.keys(share.security).length == 0) share.security = undefined

    if (share.security?.password) {
      share.security.password = await argon.hash(share.security.password)
    }

    let expirationDate: Date

    const reverseShare = await this.reverseShareService.getByToken(reverseShareToken)

    if (reverseShare) {
      expirationDate = reverseShare.shareExpiration
    } else {
      if (share.expiration !== 'never') {
        expirationDate = moment()
          .add(
            share.expiration.split('-')[0],
            share.expiration.split('-')[1] as moment.unitOfTime.DurationConstructor
          )
          .toDate()
      } else {
        expirationDate = moment(0).toDate()
      }
    }

    fs.mkdirSync(`./data/uploads/shares/${share.id}`, {
      recursive: true,
    })

    const shareTuple = await this.prismaService.share.create({
      data: {
        ...share,
        expiration: expirationDate,
        creator: { connect: user ? { id: user.id } : undefined },
        security: { create: share.security },
        recipients: {
          create: share.recipients ? share.recipients.map((email) => ({ email })) : [],
        },
      },
    })

    if (reverseShare) {
      await this.prismaService.reverseShare.update({
        where: { token: reverseShareToken },
        data: {
          shares: {
            connect: { id: shareTuple.id },
          },
        },
      })
    }

    return shareTuple
  }

  async createZip(shareId: string) {
    const path = `./data/uploads/shares/${shareId}`
    const files = await this.prismaService.file.findMany({ where: { shareId } })

    const archive = archiver('zip', {
      zlib: { level: 9 },
    })

    const writeStream = fs.createWriteStream(`${path}/archive.zip`)

    for (const file of files) {
      archive.append(fs.createReadStream(`${path}/${file.id}`), {
        name: file.name,
      })
    }

    archive.pipe(writeStream)

    await archive.finalize()
  }

  async complete(id: string, reverseShareToken?: string) {
    const share = await this.prismaService.share.findUnique({
      where: { id },
      include: {
        files: true,
        recipients: true,
        creator: true,
        reverseShare: { include: { creator: true } },
      },
    })

    if (await this.isShareCompleted(id)) throw new BadRequestException('Share already completed')

    if (share.files.length == 0)
      throw new BadRequestException('You need at least on file in your share to complete it.')

    if (share.files.length > 1)
      this.createZip(id).then(() =>
        this.prismaService.share.update({ where: { id }, data: { isZipReady: true } })
      )

    for (const recipient of share.recipients) {
      await this.emailService.sendMailToShareRecipients(
        recipient.email,
        share.id,
        share.creator,
        share.description,
        share.expiration
      )
    }

    if (
      share.reverseShare &&
      this.settingService.get('smtp.enabled') &&
      share.reverseShare.sendEmailNotification
    ) {
      await this.emailService.sendMailToReverseShareCreator(
        share.reverseShare.creator.email,
        share.id
      )
    }

    // Check if any file is malicious with ClamAV
    void this.clamScanService.checkAndRemove(share.id)

    if (share.reverseShare) {
      await this.prismaService.reverseShare.update({
        where: { token: reverseShareToken },
        data: { remainingUses: { decrement: 1 } },
      })
    }

    return this.prismaService.share.update({
      where: { id },
      data: { uploadLocked: true },
    })
  }

  async getSharesByUser(userId: string) {
    const shares = await this.prismaService.share.findMany({
      where: {
        creator: { id: userId },
        uploadLocked: true,
        OR: [{ expiration: { gt: new Date() } }, { expiration: { equals: moment(0).toDate() } }],
      },
      orderBy: {
        expiration: 'desc',
      },
      include: { recipients: true },
    })

    return shares.map((share) => {
      return {
        ...share,
        recipients: share.recipients.map((recipients) => recipients.email),
      }
    })
  }

  async get(id: string): Promise<any> {
    const share = await this.prismaService.share.findUnique({
      where: { id },
      include: {
        files: true,
        creator: true,
        security: true,
      },
    })

    if (share.removedReason) throw new NotFoundException(share.removedReason, 'share_removed')

    if (!share || !share.uploadLocked) throw new NotFoundException('Share not found')

    return {
      ...share,
      hasPassword: !!share.security?.password,
    }
  }

  async getMetaData(id: string) {
    const share = await this.prismaService.share.findUnique({
      where: { id },
    })

    if (!share || !share.uploadLocked) throw new NotFoundException('Share not found')

    return share
  }

  async remove(shareId: string) {
    const share = await this.prismaService.share.findUnique({
      where: { id: shareId },
    })

    if (!share) throw new NotFoundException('Share not found')

    if (!share.creatorId) throw new ForbiddenException("Anonymous shares can't be deleted")

    await this.fileService.deleteAllFiles(shareId)
    await this.prismaService.share.delete({ where: { id: shareId } })
  }

  async isShareCompleted(id: string) {
    return (await this.prismaService.share.findUnique({ where: { id } })).uploadLocked
  }

  async isShareIdAvailable(id: string) {
    const share = await this.prismaService.share.findUnique({ where: { id } })

    return { isAvailable: !share }
  }

  async increaseViewCount(share: Share) {
    await this.prismaService.share.update({
      where: { id: share.id },
      data: { views: share.views + 1 },
    })
  }

  async getShareToken(shareId: string, password: string) {
    const share = await this.prismaService.share.findFirst({
      where: { id: shareId },
      include: {
        security: true,
      },
    })

    if (share?.security?.password && !(await argon.verify(share.security.password, password))) {
      throw new ForbiddenException('Wrong password', 'wrong_password')
    }

    if (share.security?.maxViews && share.security.maxViews <= share.views) {
      throw new ForbiddenException('Maximum views exceeded', 'share_max_views_exceeded')
    }

    const token = await this.generateShareToken(shareId)

    await this.increaseViewCount(share)

    return token
  }

  async generateShareToken(shareId: string) {
    const { expiration } = await this.prismaService.share.findUnique({
      where: { id: shareId },
    })

    return this.jwtService.sign(
      {
        shareId,
      },
      {
        expiresIn: moment(expiration).diff(new Date(), 'seconds') + 's',
        secret: this.configService.get('auth.jwtSecret'),
      }
    )
  }

  async verifyShareToken(shareId: string, token: string) {
    const { expiration } = await this.prismaService.share.findUnique({
      where: { id: shareId },
    })

    try {
      const claims = this.jwtService.verify(token, {
        secret: this.configService.get('auth.jwtSecret'),
        ignoreExpiration: moment(expiration).isSame(0),
      })

      return claims.shareId == shareId
    } catch {
      return false
    }
  }
}
