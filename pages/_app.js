import '@/css/tailwind.css'

import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'

import { GraphQLClient, gql } from 'graphql-request'

export default function App({ Component, pageProps, author }) {
  const seo = SEO(author)
  return (
    <ThemeProvider attribute="class">
      <MDXProvider components={MDXComponents}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
        </Head>
        <DefaultSeo {...seo} />
        <LayoutWrapper author={author}>
          <Component {...pageProps} />
        </LayoutWrapper>
      </MDXProvider>
    </ThemeProvider>
  )
}

App.getInitialProps = async () => {
  const graphQLClient = new GraphQLClient('https://biggs.stepzen.net/dev/devto/__graphql', {
    headers: {
      authorization: 'apikey ' + process.env.STEPZEN_API_KEY,
    },
  })
  const query = gql`
    {
      user {
        name
        email
        twitter: twitter_username
        github: login
      }
    }
  `
  const author = await graphQLClient.request(query)
  return { author: author.user }
}
