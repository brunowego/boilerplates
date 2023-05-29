import { Injectable, ExecutionContext } from '@nestjs/common'
import { AuthGuard as PassportAuthGaurd } from '@nestjs/passport'
import { Reflector } from '@nestjs/core'

@Injectable()
export class AuthGuard extends PassportAuthGaurd('api-key') {
  constructor(private readonly reflector: Reflector) {
    super()
  }

  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.get<boolean>('isPublic', context.getHandler())

    if (isPublic) {
      return true
    }

    return super.canActivate(context)
  }
}
