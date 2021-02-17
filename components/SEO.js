import { NextSeo, ArticleJsonLd } from 'next-seo'
import siteMetadata from '@/data/siteMetadata'

export const SEO = ({ name, twitter }) => {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    openGraph: {
      type: 'website',
      locale: siteMetadata.language,
      url: siteMetadata.siteUrl,
      title: siteMetadata.title,
      description: siteMetadata.description,
      images: [
        {
          url: `${siteMetadata.siteUrl}${siteMetadata.socialBanner}`,
          alt: siteMetadata.title,
          width: 1200,
          height: 600,
        },
      ],
    },
    twitter: {
      handle: twitter,
      site: twitter,
      cardType: 'summary_large_image',
    },
    additionalMetaTags: [
      {
        name: 'author',
        content: name,
      },
    ],
  }
}

export const PageSeo = ({ title, description, url }) => {
  return (
    <NextSeo
      title={`${title} – ${siteMetadata.title}`}
      description={description}
      canonical={url}
      openGraph={{
        url,
        title,
        description,
      }}
    />
  )
}

export const BlogSeo = ({
  title,
  description,
  published_timestamp,
  edited_at,
  url,
  tags,
  user,
  images = [],
}) => {
  const publishedAt = new Date(published_timestamp).toISOString()
  const modifiedAt = new Date(edited_at || published_timestamp).toISOString()
  let imagesArr =
    images.length === 0
      ? [siteMetadata.socialBanner]
      : typeof images === 'string'
      ? [images]
      : images

  const featuredImages = imagesArr.map((img) => {
    return {
      url: `${siteMetadata.siteUrl}${img}`,
      alt: title,
    }
  })

  return (
    <>
      <NextSeo
        title={`${title} – ${siteMetadata.title}`}
        description={description}
        canonical={url}
        openGraph={{
          type: 'article',
          article: {
            publishedTime: publishedAt,
            modifiedTime: modifiedAt,
            authors: [`${siteMetadata.siteUrl}/about`],
            tags,
          },
          url,
          title,
          description: description,
          images: featuredImages,
        }}
        additionalMetaTags={[
          {
            name: 'twitter:image',
            content: featuredImages[0].url,
          },
        ]}
      />
      <ArticleJsonLd
        authorName={user.name}
        dateModified={publishedAt}
        datePublished={modifiedAt}
        description={description}
        images={featuredImages}
        publisherName={user.name}
        title={title}
        url={url}
      />
    </>
  )
}
