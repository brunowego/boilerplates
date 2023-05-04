import { Controller, Get, Param, Patch, Body, Post } from '@nestjs/common'
import { SettingService } from './setting.service'
import { SettingDto, CategorySettingDto, UpdateSettingDto } from './dtos'

@Controller('settings')
export class SettingController {
  constructor(private settingService: SettingService) {}

  @Get()
  async list() {
    return new SettingDto().fromList(await this.settingService.list())
  }

  @Get('category/:category')
  async getByCategory(@Param('category') category: string) {
    return new CategorySettingDto().fromList(await this.settingService.getByCategory(category))
  }

  // @Patch('category')
  // async updateMany(@Body() data: UpdateSettingDto[]) {
  //   return new CategorySettingDto().fromList(await this.settingService.updateMany(data))
  // }
}
