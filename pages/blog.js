import { gql } from 'graphql-request'
import { graphQLClient } from '@/lib/graphql-client'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { PageSeo } from '@/components/SEO'

export async function getStaticProps() {
  const query = gql`
    {
      myArticles {
        title
        username
        organization
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
