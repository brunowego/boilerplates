import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common'
import { User } from '@acme/db'
import { Request, Response } from 'express'
import { GetUser } from 'src/modules/auth/get-user.decorator'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { CreateShareDto } from './dtos/create-share.dto'
import { MyShareDto } from './dtos/my-share.dto'
import { ShareDto } from './dtos/share.dto'
import { ShareMetadataDto } from './dtos/share-metadata.dto'
import { SharePasswordDto } from './dtos/share-password.dto'
import { CreateShareGuard } from './guard/create-share.guard'
import { ShareOwnerGuard } from './guard/share-owner.guard'
import { ShareSecurityGuard } from './guard/share-security.guard'
import { ShareTokenSecurity } from './guard/share-token-security.guard'
import { ShareService } from './share.service'
@Controller('shares')
export class ShareController {
  constructor(private shareService: ShareService) {}

  @Get()
  @UseGuards(JwtGuard)
  async getMyShares(@GetUser() user: User) {
    return new MyShareDto().fromList(await this.shareService.getSharesByUser(user.id))
  }

  @Get(':id')
  @UseGuards(ShareSecurityGuard)
  async get(@Param('id') id: string) {
    return new ShareDto().from(await this.shareService.get(id))
  }

  @Get(':id/metaData')
  @UseGuards(ShareSecurityGuard)
  async getMetaData(@Param('id') id: string) {
    return new ShareMetadataDto().from(await this.shareService.getMetaData(id))
  }

  @Post()
  @UseGuards(CreateShareGuard)
  async create(@Body() body: CreateShareDto, @Req() request: Request, @GetUser() user: User) {
    const { reverse_share_token } = request.cookies
    return new ShareDto().from(await this.shareService.create(body, user, reverse_share_token))
  }

  @Delete(':id')
  @UseGuards(JwtGuard, ShareOwnerGuard)
  async remove(@Param('id') id: string) {
    await this.shareService.remove(id)
  }

  @Post(':id/complete')
  @HttpCode(202)
  @UseGuards(CreateShareGuard, ShareOwnerGuard)
  async complete(@Param('id') id: string, @Req() request: Request) {
    const { reverse_share_token } = request.cookies
    return new ShareDto().from(await this.shareService.complete(id, reverse_share_token))
  }

  @Get('isShareIdAvailable/:id')
  async isShareIdAvailable(@Param('id') id: string) {
    return this.shareService.isShareIdAvailable(id)
  }

  @HttpCode(200)
  @UseGuards(ShareTokenSecurity)
  @Post(':id/token')
  async getShareToken(
    @Param('id') id: string,
    @Res({ passthrough: true }) response: Response,
    @Body() body: SharePasswordDto
  ) {
    const token = await this.shareService.getShareToken(id, body.password)
    response.cookie(`share_${id}_token`, token, {
      path: '/',
      httpOnly: true,
    })

    return { token }
  }
}
