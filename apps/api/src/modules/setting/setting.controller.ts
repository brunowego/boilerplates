import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { IsAdminGuard } from 'src/modules/auth/guards/is-admin.guard'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { EmailService } from 'src/modules/email/email.service'
import { SettingService } from './setting.service'
import { AdminSettingDto } from './dtos/admin-setting.dto'
import { SettingDto } from './dtos/setting.dto'
import { TestEmailDto } from './dtos/test-email.dto'
import UpdateSettingDto from './dtos/update-setting.dto'
import { LogoService } from './logo.service'

@Controller('settings')
export class SettingController {
  constructor(
    private settingService: SettingService,
    private logoService: LogoService,
    private emailService: EmailService
  ) {}

  @Get()
  async list() {
    return new SettingDto().fromList(await this.settingService.list())
  }

  @Get('admin/:category')
  @UseGuards(JwtGuard, IsAdminGuard)
  async getByCategory(@Param('category') category: string) {
    return new AdminSettingDto().fromList(await this.settingService.getByCategory(category))
  }

  @Patch('admin')
  @UseGuards(JwtGuard, IsAdminGuard)
  async updateMany(@Body() data: UpdateSettingDto[]) {
    return new AdminSettingDto().fromList(await this.settingService.updateMany(data))
  }

  @Post('admin/testEmail')
  @UseGuards(JwtGuard, IsAdminGuard)
  async testEmail(@Body() { email }: TestEmailDto) {
    await this.emailService.sendTestMail(email)
  }

  @Post('admin/logo')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtGuard, IsAdminGuard)
  async uploadLogo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image/png' })],
      })
    )
    file: Express.Multer.File
  ) {
    return await this.logoService.create(file.buffer)
  }
}
