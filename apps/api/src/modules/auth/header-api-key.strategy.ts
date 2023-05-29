import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ConfigService } from '@nestjs/config'
import Strategy from 'passport-headerapikey'

@Injectable()
export class HeaderApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly configService: ConfigService) {
    super(
      { header: 'X-API-KEY', prefix: '' },
      true,
      async (apiKey: string, done: (error: Error | null, data: any) => Record<string, unknown>) => {
        return this.validate(apiKey, done)
      }
    )
  }

  public validate = (
    apiKey: string,
    done: (error: Error | null, data: any) => Record<string, unknown>
  ) => {
    if (this.configService.get<string>('app.key') === apiKey) {
      done(null, true)
    }

    done(new UnauthorizedException(), null)
  }
}
