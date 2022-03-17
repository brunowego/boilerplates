import { builder } from '@/graphql/builder'
import { getUsers } from './queries/getUsers'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { createUser } from './mutations/createUser'
import { editUser } from './mutations/editUser'
import { Result } from '../ResultResolver'
import { deleteUser } from './mutations/deleteUser'

builder.prismaObject('User', {
  findUnique: (user) => ({ id: user.id }),
  fields: (t) => ({
    id: t.exposeID('id'),
    email: t.exposeString('email'),
    username: t.exposeString('username'),
  }),
})

builder.queryField('users', (t) =>
  t.prismaConnection({
    type: 'User',
    cursor: 'id',
    defaultSize: 10,
    maxSize: 100,
    resolve: async (query) => {
      return await getUsers(query)
    },
  })
)

builder.queryField('user', (t) =>
  t.prismaField({
    type: 'User',
    args: { id: t.arg.string() },
    resolve: async (query, {}, { id }) => {
      return await prisma.user.findUnique({
        ...query,
        where: { id },
        rejectOnNotFound: true,
      })
    },
  })
)

const CreateUserInput = builder.inputType('CreateUserInput', {
  fields: (t) => ({
    email: t.string({
      validate: {
        schema: z.string().email('The given email address is invalid.'),
      },
    }),
    username: t.string({
      validate: {
        schema: z
          .string()
          .min(3, 'Username must be at least 3 characters long')
          .max(20, 'Username is too long. Please use less than 20 characters'),
      },
    }),
  }),
})

builder.mutationField('createUser', (t) =>
  t.prismaField({
    type: 'User',
    args: { input: t.arg({ type: CreateUserInput }) },
    nullable: true,
    resolve: async (query, {}, { input }) => {
      return await createUser(query, input)
    },
  })
)

const EditUserInput = builder.inputType('EditUserInput', {
  fields: (t) => ({
    id: t.id({ validate: { uuid: true } }),
    email: t.string({
      validate: {
        schema: z.string().email('The given email address is invalid.'),
      },
      required: false,
    }),
    username: t.string({
      validate: {
        schema: z
          .string()
          .min(3, 'Username must be at least 3 characters long')
          .max(20, 'Username is too long. Please use less than 20 characters'),
      },
      required: false,
    }),
  }),
})

builder.mutationField('editUser', (t) =>
  t.prismaField({
    type: 'User',
    args: { input: t.arg({ type: EditUserInput }) },
    nullable: true,
    resolve: async (query, {}, { input }) => {
      return await editUser(query, input)
    },
  })
)

const DeleteUserInput = builder.inputType('DeleteUserInput', {
  fields: (t) => ({
    id: t.id({ validate: { uuid: true } }),
  }),
})

builder.mutationField('deleteUser', (t) =>
  t.field({
    type: Result,
    args: { input: t.arg({ type: DeleteUserInput }) },
    resolve: async ({}, { input }) => {
      return await deleteUser(input)
    },
  })
)
