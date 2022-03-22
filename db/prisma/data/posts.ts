import { Post } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const posts: Pick<Post, 'title' | 'body'>[] = [...Array(10)].map((_) => ({
  title: faker.company.companyName(),
  body: faker.lorem.paragraphs(2),
}))
