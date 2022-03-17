const path = require('path')

require('dotenv').config({ path: path.join(__dirname, '.env') })

const graphqlRC = {
  schema: process.env.NEXT_PUBLIC_GRAPHQL_URL,
}

module.exports = graphqlRC
