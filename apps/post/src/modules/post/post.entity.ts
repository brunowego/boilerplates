import { ObjectType, Field, ID, Directive, Int } from '@nestjs/graphql'

@ObjectType()
export class PostUser {
  @Field(() => ID)
  id: number

  @Field()
  name: string
}

@ObjectType()
@Directive('@key(fields: "id")')
export class Post {
  @Field(() => ID)
  id: number

  @Field()
  title: string

  @Field(() => Int)
  authorId: number

  @Field(() => PostUser)
  user?: PostUser
}
