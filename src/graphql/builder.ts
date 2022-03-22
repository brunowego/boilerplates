import { IncomingMessage, OutgoingMessage } from 'http'
import SchemaBuilder from '@giraphql/core'
import PrismaTypes from '@/db/prisma/giraphql-types'
import { prisma } from '@/lib/prisma'
import PrismaPlugin from '@giraphql/plugin-prisma'
import RelayPlugin from '@giraphql/plugin-relay'
import ValidationPlugin from '@giraphql/plugin-validation'

export interface Context {
  req: IncomingMessage
  res: OutgoingMessage
}

export function createGraphQLContext(req: IncomingMessage, res: OutgoingMessage): Context {
  return {
    req,
    res,
  }
}

export const builder = new SchemaBuilder<{
  DefaultInputFieldRequiredness: true
  Context: Context
  PrismaTypes: PrismaTypes
  Scalars: {
    ID: { Input: string; Output: string | number }
    DateTime: { Input: Date; Output: Date }
  }
}>({
  defaultInputFieldRequiredness: true,
  prisma: {
    client: prisma,
  },
  relayOptions: {
    clientMutationId: 'omit',
    cursorType: 'String',
  },
  plugins: [PrismaPlugin, RelayPlugin, ValidationPlugin],
})

builder.queryType({})

builder.mutationType({})

builder.scalarType('DateTime', {
  serialize: (date: any) => date.toISOString(),
  parseValue: (date: any) => {
    return new Date(date)
  },
})
