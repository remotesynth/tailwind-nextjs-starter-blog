import '@/css/tailwind.css'

import { MDXProvider } from '@mdx-js/react'
import { ThemeProvider } from 'next-themes'
import { DefaultSeo } from 'next-seo'
import Head from 'next/head'

import { SEO } from '@/components/SEO'
import LayoutWrapper from '@/components/LayoutWrapper'
import MDXComponents from '@/components/MDXComponents'

import { gql } from 'graphql-request'
import { graphQLClient } from '@/lib/graphql-client'

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
