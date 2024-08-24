import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'
import { bootstrap } from './main'

jest.mock('@nestjs/core', () => ({
  NestFactory: {
    create: jest.fn().mockReturnValue({
      get: () => ({
        get: () => 3000,
      }),
      listen: () => {},
    }),
  },
}))

describe('Main', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create an app', async () => {
    await bootstrap()

    expect(NestFactory.create).toHaveBeenCalledWith(AppModule)
  })
})
