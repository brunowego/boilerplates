export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: string
}

export type CreateUserInput = {
  email: Scalars['String']
  username: Scalars['String']
}

export type DeleteUserInput = {
  id: Scalars['ID']
}

export type EditUserInput = {
  email: Scalars['String']
  id: Scalars['ID']
  username: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  createUser?: Maybe<User>
  deleteUser: Result
  editUser?: Maybe<User>
}

export type MutationCreateUserArgs = {
  input: CreateUserInput
}

export type MutationDeleteUserArgs = {
  input: DeleteUserInput
}

export type MutationEditUserArgs = {
  input: EditUserInput
}

export type PageInfo = {
  __typename?: 'PageInfo'
  endCursor?: Maybe<Scalars['String']>
  hasNextPage: Scalars['Boolean']
  hasPreviousPage: Scalars['Boolean']
  startCursor?: Maybe<Scalars['String']>
}

export type Query = {
  __typename?: 'Query'
  user: User
  users: QueryUsersConnection
}

export type QueryUserArgs = {
  username: Scalars['String']
}

export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>
  before?: InputMaybe<Scalars['String']>
  first?: InputMaybe<Scalars['Int']>
  last?: InputMaybe<Scalars['Int']>
}

export type QueryUsersConnection = {
  __typename?: 'QueryUsersConnection'
  edges: Array<Maybe<QueryUsersConnectionEdge>>
  pageInfo: PageInfo
}

export type QueryUsersConnectionEdge = {
  __typename?: 'QueryUsersConnectionEdge'
  cursor: Scalars['String']
  node: User
}

export enum Result {
  Success = 'SUCCESS',
}

export type User = {
  __typename?: 'User'
  email: Scalars['String']
  id: Scalars['ID']
  username: Scalars['String']
}
