import { Injectable } from '@nestjs/common'
import { Cron } from '@nestjs/schedule'
import * as fs from 'fs'
import moment from 'moment'
import { FileService } from 'src/modules/file/file.service'
import { PrismaService } from 'src/common/services/prisma.service'
import { ReverseShareService } from 'src/modules/reverse-share/reverse-share.service'

@Injectable()
export class JobsService {
  constructor(
    private prismaService: PrismaService,
    private reverseShareService: ReverseShareService,
    private fileService: FileService
  ) {}

  @Cron('0 * * * *')
  async deleteExpiredShares() {
    const expiredShares = await this.prismaService.share.findMany({
      where: {
        AND: [{ expiration: { lt: new Date() } }, { expiration: { not: moment(0).toDate() } }],
      },
    })

    for (const expiredShare of expiredShares) {
      await this.prismaService.share.delete({
        where: { id: expiredShare.id },
      })

      await this.fileService.deleteAllFiles(expiredShare.id)
    }

    if (expiredShares.length > 0) console.log(`job: deleted ${expiredShares.length} expired shares`)
  }

  @Cron('0 * * * *')
  async deleteExpiredReverseShares() {
    const expiredReverseShares = await this.prismaService.reverseShare.findMany({
      where: {
        shareExpiration: { lt: new Date() },
      },
    })

    for (const expiredReverseShare of expiredReverseShares) {
      await this.reverseShareService.remove(expiredReverseShare.id)
    }

    if (expiredReverseShares.length > 0)
      console.log(`job: deleted ${expiredReverseShares.length} expired reverse shares`)
  }

  @Cron('0 0 * * *')
  deleteTemporaryFiles() {
    let filesDeleted = 0

    const shareDirectories = fs
      .readdirSync('./data/uploads/shares', { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .map((dirent) => dirent.name)

    for (const shareDirectory of shareDirectories) {
      const temporaryFiles = fs
        .readdirSync(`./data/uploads/shares/${shareDirectory}`)
        .filter((file) => file.endsWith('.tmp-chunk'))

      for (const file of temporaryFiles) {
        const stats = fs.statSync(`./data/uploads/shares/${shareDirectory}/${file}`)
        const isOlderThanOneDay = moment(stats.mtime).add(1, 'day').isBefore(moment())

        if (isOlderThanOneDay) {
          fs.rmSync(`./data/uploads/shares/${shareDirectory}/${file}`)
          filesDeleted++
        }
      }
    }

    console.log(`job: deleted ${filesDeleted} temporary files`)
  }

  @Cron('0 * * * *')
  async deleteExpiredTokens() {
    const { count: refreshTokenCount } = await this.prismaService.refreshToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    })

    const { count: loginTokenCount } = await this.prismaService.loginToken.deleteMany({
      where: { expiresAt: { lt: new Date() } },
    })

    const { count: resetPasswordTokenCount } =
      await this.prismaService.resetPasswordToken.deleteMany({
        where: { expiresAt: { lt: new Date() } },
      })

    const deletedTokensCount = refreshTokenCount + loginTokenCount + resetPasswordTokenCount

    if (deletedTokensCount > 0)
      console.log(`job: deleted ${deletedTokensCount} expired refresh tokens`)
  }
}
