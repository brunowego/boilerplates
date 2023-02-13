import { ObjectType, Field, ID, Directive } from '@nestjs/graphql'

@ObjectType()
export class UserPost {
  @Field(() => ID)
  id: number

  @Field()
  title: string
}

@ObjectType()
@Directive('@key(fields: "id")')
export class User {
  @Field(() => ID)
  id: number

  @Field()
  name: string

  @Field(() => [UserPost])
  posts?: UserPost[]
}
