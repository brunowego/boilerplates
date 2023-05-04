import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { User } from '@acme/db'

@Injectable()
export class IsAdminGuard implements CanActivate {
  canActivate(context: ExecutionContext) {
    const { user }: { user: User } = context.switchToHttp().getRequest()

    if (!user) return false

    return user.isAdmin
  }
}
