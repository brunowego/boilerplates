import { Injectable } from '@nestjs/common'
import NodeClam from 'clamscan'
import * as fs from 'fs'
import { FileService } from 'src/modules/file/file.service'
import { PrismaService } from 'src/common/services/prisma.service'

const clamscanConfig = {
  clamdscan: {
    host: process.env.NODE_ENV == 'docker' ? 'clamav' : '127.0.0.1',
    port: 3310,
    localFallback: false,
  },
  preference: 'clamdscan',
}

@Injectable()
export class ClamScanService {
  constructor(private fileService: FileService, private prismaService: PrismaService) {}

  private ClamScan: Promise<NodeClam | null> = new NodeClam()
    .init(clamscanConfig)
    .then((res) => {
      console.log('ClamAV is active')

      return res
    })
    .catch(() => {
      console.log('ClamAV is not active')

      return null
    })

  async check(shareId: string) {
    const clamScan = await this.ClamScan

    if (!clamScan) return []

    const infectedFiles = []

    const files = fs
      .readdirSync(`./data/uploads/shares/${shareId}`)
      .filter((file) => file != 'archive.zip')

    for (const fileId of files) {
      const { isInfected } = await clamScan
        .isInfected(`./data/uploads/shares/${shareId}/${fileId}`)
        .catch(() => {
          console.log('ClamAV is not active')

          return { isInfected: false }
        })

      const fileName = (await this.prismaService.file.findUnique({ where: { id: fileId } })).name

      if (isInfected) {
        infectedFiles.push({ id: fileId, name: fileName })
      }
    }

    return infectedFiles
  }

  async checkAndRemove(shareId: string) {
    const infectedFiles = await this.check(shareId)

    if (infectedFiles.length > 0) {
      await this.fileService.deleteAllFiles(shareId)
      await this.prismaService.file.deleteMany({ where: { shareId } })

      const fileNames = infectedFiles.map((file) => file.name).join(', ')

      await this.prismaService.share.update({
        where: { id: shareId },
        data: {
          removedReason: `Your share got removed because the file(s) ${fileNames} are malicious.`,
        },
      })

      console.log(
        `Share ${shareId} deleted because it contained ${infectedFiles.length} malicious file(s)`
      )
    }
  }
}
