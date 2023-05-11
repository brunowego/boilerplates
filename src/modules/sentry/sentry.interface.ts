import { NodeOptions } from '@sentry/node'
import { ModuleMetadata } from '@nestjs/common'

export type SentryConfigOptions = Partial<NodeOptions>

export interface SentryModuleAsyncOptions extends Pick<ModuleMetadata, 'imports' | 'providers'> {
  useFactory: (...args: any[]) => SentryConfigOptions | Promise<SentryConfigOptions>
  inject?: any[]
}
