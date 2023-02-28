import { Factory } from 'fishery'
import { App } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const appFactory = Factory.define<App>(
  () => <App>{}
)
