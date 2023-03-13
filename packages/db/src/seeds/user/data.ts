import { userFactory } from './factory'

type UserData = (typeof UserData)[keyof typeof UserData]

const UserData = {
  first: userFactory.build(),
} as const

export { UserData }
