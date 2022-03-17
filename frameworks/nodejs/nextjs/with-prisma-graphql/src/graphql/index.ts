import './resolvers'
import { builder } from './builder'
import { GraphQLSchema, printSchema, lexicographicSortSchema } from 'graphql'
import path from 'path'
import fs from 'fs'
import { IS_DEVELOPMENT } from '@/constants'

export const schema = builder.toSchema({})

function writeSchema(schema: GraphQLSchema) {
  const schemaAsString = printSchema(lexicographicSortSchema(schema))
  const schemaPath = path.join(process.cwd(), 'src/graphql/schema.graphql')

  const existingSchema = fs.existsSync(schemaPath) && fs.readFileSync(schemaPath, 'utf-8')

  if (existingSchema !== schemaAsString) {
    fs.writeFileSync(schemaPath, schemaAsString)
  }
}

if (IS_DEVELOPMENT) {
  writeSchema(schema)
}
