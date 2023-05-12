import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common'

import * as crypto from 'crypto'
import * as fs from 'fs'
import * as mime from 'mime-types'
import { SettingService } from 'src/modules/setting/setting.service'
import { PrismaService } from 'src/common/services/prisma.service'

@Injectable()
export class FileService {
  constructor(private prismaService: PrismaService, private settingService: SettingService) {}

  async create(
    data: string,
    chunk: { index: number; total: number },
    file: { id?: string; name: string },
    shareId: string
  ) {
    if (!file.id) file.id = crypto.randomUUID()

    const share = await this.prismaService.share.findUnique({
      where: { id: shareId },
      include: { files: true, reverseShare: true },
    })

    if (share.uploadLocked) throw new BadRequestException('Share is already completed')

    let diskFileSize: number

    try {
      diskFileSize = fs.statSync(`./data/uploads/shares/${shareId}/${file.id}.tmp-chunk`).size
    } catch {
      diskFileSize = 0
    }

    const chunkSize = 10 * 1024 * 1024 // 10MB
    const expectedChunkIndex = Math.ceil(diskFileSize / chunkSize)

    if (expectedChunkIndex != chunk.index)
      throw new BadRequestException({
        message: 'Unexpected chunk received',
        error: 'unexpected_chunk_index',
        expectedChunkIndex,
      })

    const buffer = Buffer.from(data, 'base64')

    const fileSizeSum = share.files.reduce((n, { size }) => n + parseInt(size), 0)

    const shareSizeSum = fileSizeSum + diskFileSize + buffer.byteLength

    if (
      shareSizeSum > this.settingService.get('share.maxSize') ||
      (share.reverseShare?.maxShareSize && shareSizeSum > parseInt(share.reverseShare.maxShareSize))
    ) {
      throw new HttpException('Max share size exceeded', HttpStatus.PAYLOAD_TOO_LARGE)
    }

    fs.appendFileSync(`./data/uploads/shares/${shareId}/${file.id}.tmp-chunk`, buffer)

    const isLastChunk = chunk.index == chunk.total - 1

    if (isLastChunk) {
      fs.renameSync(
        `./data/uploads/shares/${shareId}/${file.id}.tmp-chunk`,
        `./data/uploads/shares/${shareId}/${file.id}`
      )

      const fileSize = fs.statSync(`./data/uploads/shares/${shareId}/${file.id}`).size

      await this.prismaService.file.create({
        data: {
          id: file.id,
          name: file.name,
          size: fileSize.toString(),
          share: { connect: { id: shareId } },
        },
      })
    }

    return file
  }

  async get(shareId: string, fileId: string) {
    const fileMetaData = await this.prismaService.file.findUnique({
      where: { id: fileId },
    })

    if (!fileMetaData) throw new NotFoundException('File not found')

    const file = fs.createReadStream(`./data/uploads/shares/${shareId}/${fileId}`)

    return {
      metaData: {
        mimeType: mime.contentType(fileMetaData.name.split('.').pop()),
        ...fileMetaData,
        size: fileMetaData.size,
      },
      file,
    }
  }

  async deleteAllFiles(shareId: string) {
    await fs.promises.rm(`./data/uploads/shares/${shareId}`, {
      recursive: true,
      force: true,
    })
  }

  getZip(shareId: string) {
    return fs.createReadStream(`./data/uploads/shares/${shareId}/archive.zip`)
  }
}
