import { kebabCase } from './utils'
import { GraphQLClient, gql } from 'graphql-request'

const root = process.cwd()

export async function getAllTags() {
  const graphQLClient = new GraphQLClient('https://biggs.stepzen.net/dev/devto/__graphql', {
    headers: {
      authorization: 'apikey ' + process.env.STEPZEN_API_KEY,
    },
  })
  const query = gql`
    {
      myArticles {
        tag_list
      }
    }
  `
  const posts = await graphQLClient.request(query)
  const allTags = posts.myArticles

  let tagCount = {}
  // Iterate through each post, putting all found tags into `tags`
  allTags.forEach((post) => {
    const tags = post.tag_list.split(', ')
    tags.forEach((tag) => {
      const formattedTag = kebabCase(tag)
      if (formattedTag in tagCount) {
        tagCount[formattedTag] += 1
      } else {
        tagCount[formattedTag] = 1
      }
    })
  })

  return tagCount
}
