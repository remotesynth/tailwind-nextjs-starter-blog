import siteMetadata from '@/data/siteMetadata'

const generateRssItem = (post) => `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug}</guid>
    <title>${post.title}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug}</link>
    <description>${post.description}</description>
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${post.user.email} (${post.user.name})</author>
    ${post.tag_list
      .split(', ')
      .map((t) => `<category>${t}</category>`)
      .join('')}
  </item>
`

const generateRss = (posts, page = 'index.xml') => `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${siteMetadata.title}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${siteMetadata.description}</description>
      <language>${siteMetadata.language}</language>
      <managingEditor>${posts[0].user.email} (${posts[0].user.name})</managingEditor>
      <webMaster>${posts[0].user.email} (${posts[0].user.name})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map(generateRssItem).join('')}
    </channel>
  </rss>
`
export default generateRss
