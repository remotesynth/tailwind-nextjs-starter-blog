import { GraphQLClient } from 'graphql-request'

export const graphQLClient = new GraphQLClient(process.env.STEPZEN_API_URL, {
  headers: {
    authorization: 'apikey ' + process.env.STEPZEN_API_KEY,
  },
})
