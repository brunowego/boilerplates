import 'reflect-metadata'
import { DataSource } from 'typeorm'

import { Product } from './src/db/entities/product'

export const AppDataSource = new DataSource({
  type: 'mongodb',
  database: 'test',
  synchronize: true,
  logging: false,
  entities: [Product],
  migrations: [],
  subscribers: [],
})
