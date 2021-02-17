import { GraphQLClient, gql } from 'graphql-request'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'

export async function getStaticProps() {
  const graphQLClient = new GraphQLClient('https://biggs.stepzen.net/dev/devto/__graphql', {
    headers: {
      authorization: 'apikey ' + process.env.STEPZEN_API_KEY,
    },
  })
  const query = gql`
    {
      myArticles {
        title
        slug
        date: published_timestamp
        tag_list
        description
        user {
          name
        }
      }
    }
  `
  const posts = await graphQLClient.request(query)

  return { props: { posts: posts.myArticles } }
}

export default function Blog({ posts }) {
  return (
    <>
      <PageSeo
        title={`Blog - ${posts[0].user.name}`}
        description={siteMetadata.description}
        url={`${siteMetadata.siteUrl}/blog`}
      />
      <ListLayout posts={posts} title="All Posts" />
    </>
  )
}
