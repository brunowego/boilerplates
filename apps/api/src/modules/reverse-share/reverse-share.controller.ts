import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common'
import { User } from '@acme/db'
import { GetUser } from 'src/modules/auth/get-user.decorator'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { SettingService } from 'src/modules/setting/setting.service'
import { CreateReverseShareDto } from './dtos/create-reverse-share.dto'
import { ReverseShareDto } from './dtos/reverse-share.dto'
import { ReverseShareTokenWithShares } from './dtos/reverse-share-token-with-shares'
import { ReverseShareOwnerGuard } from './reverse-share-owner.guard'
import { ReverseShareService } from './reverse-share.service'

@Controller('reverse-shares')
export class ReverseShareController {
  constructor(
    private reverseShareService: ReverseShareService,
    private settingService: SettingService
  ) {}

  @Post()
  @UseGuards(JwtGuard)
  async create(@Body() body: CreateReverseShareDto, @GetUser() user: User) {
    const token = await this.reverseShareService.create(body, user.id)

    const link = `${this.settingService.get('general.appUrl')}/upload/${token}`

    return { token, link }
  }

  @Get(':reverseShareToken')
  async getByToken(@Param('reverseShareToken') reverseShareToken: string) {
    const isValid = await this.reverseShareService.isValid(reverseShareToken)

    if (!isValid) throw new NotFoundException('Reverse share token not found')

    return new ReverseShareDto().from(await this.reverseShareService.getByToken(reverseShareToken))
  }

  @Get()
  @UseGuards(JwtGuard)
  async getAllByUser(@GetUser() user: User) {
    return new ReverseShareTokenWithShares().fromList(
      await this.reverseShareService.getAllByUser(user.id)
    )
  }

  @Delete(':reverseShareId')
  @UseGuards(JwtGuard, ReverseShareOwnerGuard)
  async remove(@Param('reverseShareId') id: string) {
    await this.reverseShareService.remove(id)
  }
}
