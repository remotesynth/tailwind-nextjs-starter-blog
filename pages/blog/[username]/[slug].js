/*global Promise */
import { gql } from 'graphql-request'
import { graphQLClient } from '@/lib/graphql-client'
import PostLayout from '@/layouts/PostLayout'
import ReactMarkdown from 'react-markdown'
import matter from 'gray-matter'
import generateRss from '@/lib/generate-rss'
import fs from 'fs'

export async function getStaticPaths() {
  const query = gql`
    {
      myArticles {
        slug
        username
        organization
      }
    }
  `
  const posts = await graphQLClient.request(query)
  const paths = posts.myArticles.map((p) => {
    let username = p.organization ? p.organization : p.username
    return {
      params: {
        username: username,
        slug: p.slug,
      },
    }
  })

  return {
    paths: paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const delay = (interval) => new Promise((resolve) => setTimeout(resolve, interval))
  const prevNextQuery = gql`
    {
      myArticles {
        title
        slug
        tag_list
        date: published_timestamp
        description
        user {
          name
          email
        }
      }
    }
  `
  const allPosts = await graphQLClient.request(prevNextQuery)
  // this is purely here because of rate limits on the DEV API that get triggered during a build
  await delay(500)
  const postQuery = gql`
    query getPosts($path: String!) {
      publishedArticleByPath(path: $path) {
        title
        slug
        published_timestamp
        readable_publish_date
        edited_at
        description
        tag_list
        body_markdown
        url
        cover_image
        user {
          name
          twitter_username
          avatar_url
        }
      }
    }
  `
  // this is purely here because of rate limits on the DEV API that get triggered during a build
  await delay(500)
  const postPathVar = {
    path: '/' + params.username + '/' + params.slug,
  }
  const postDetail = await graphQLClient.request(postQuery, postPathVar)
  const postIndex = allPosts.myArticles.findIndex((post) => post.slug === params.slug)
  const prev = allPosts.myArticles[postIndex + 1] || null
  const next = allPosts.myArticles[postIndex - 1] || null

  // rss
  const rss = generateRss(allPosts.myArticles)
  fs.writeFileSync('./public/index.xml', rss)

  return { props: { post: postDetail.publishedArticleByPath, prev, next } }
}

export default function Blog({ post, prev, next }) {
  const postMatter = matter(post.body_markdown)
  return (
    <>
      <PostLayout frontMatter={post} prev={prev} next={next}>
        <ReactMarkdown>{postMatter.content}</ReactMarkdown>
      </PostLayout>
    </>
  )
}
