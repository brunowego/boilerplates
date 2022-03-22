import { Tag } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const tags: Pick<Tag, 'name' | 'colorCode'>[] = [...Array(10)].map((_) => ({
  name: faker.commerce.product(),
  colorCode: faker.internet.color().replace('#', ''),
}))
