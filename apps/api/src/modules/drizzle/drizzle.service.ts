import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { drizzle } from 'drizzle-orm/postgres-js'
import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

import * as schema from '@/db/schemas'

@Injectable()
export class DrizzleService {
  public db: PostgresJsDatabase<typeof schema>

  constructor(private readonly configService: ConfigService) {
    const databaseUrl = this.configService.get<string>('drizzle.databaseUrl')
    const queryClient = postgres(databaseUrl)

    this.db = drizzle(queryClient, { schema })
  }
}
