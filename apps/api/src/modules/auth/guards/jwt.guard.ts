import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { SettingService } from 'src/modules/setting/setting.service'

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
  constructor(private settingService: SettingService) {
    super()
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      return (await super.canActivate(context)) as boolean
    } catch {
      return this.settingService.get('share.allowUnauthenticatedShares')
    }
  }
}
