require('dotenv').config()

const graphqlRC = {
  schema: process.env.NEXT_PUBLIC_GRAPHCMS_URL,
  documents: './src/graphql/**/*.graphql',
}

module.exports = graphqlRC
