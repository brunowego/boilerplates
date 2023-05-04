import { ExecutionContext, Injectable } from '@nestjs/common'
import { JwtGuard } from 'src/modules/auth/guards/jwt.guard'
import { SettingService } from 'src/modules/setting/setting.service'
import { ReverseShareService } from 'src/modules/reverse-share/reverse-share.service'

@Injectable()
export class CreateShareGuard extends JwtGuard {
  constructor(settingService: SettingService, private reverseShareService: ReverseShareService) {
    super(settingService)
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (await super.canActivate(context)) return true

    const reverseShareTokenId = context.switchToHttp().getRequest().cookies.reverse_share_token

    if (!reverseShareTokenId) return false

    const isReverseShareTokenValid = await this.reverseShareService.isValid(reverseShareTokenId)

    return isReverseShareTokenValid
  }
}
