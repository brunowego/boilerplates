import { Factory } from 'fishery'
import { User } from '@prisma/client'
import { faker } from '@faker-js/faker'

export const userFactory = Factory.define<User>(
  () =>
    <User>{
      id: faker.datatype.uuid(),
      email: faker.internet.email(),
      fname: faker.name.firstName(),
      lname: faker.name.lastName(),
      age: faker.datatype.number({ min: 18, max: 100 }),
    }
)
