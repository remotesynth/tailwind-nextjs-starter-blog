import siteMetadata from '@/data/siteMetadata'
import { gql } from 'graphql-request'
import { graphQLClient } from '@/lib/graphql-client'
import SocialIcon from '@/components/social-icons'
import { PageSeo } from '@/components/SEO'
import tinytime from 'tinytime'
import Link from '@/components/Link'

const postDateTemplate = tinytime('{MMMM} {DD}, {YYYY}')

export async function getStaticProps() {
  const query = gql`
    {
      user {
        name
        email
        avatar_url
        bio
        location
        company
        twitter: twitter_username
        github: login
        repos {
          name
          description
          html_url
          created_at
          updated_at
          stargazers_count
        }
      }
    }
  `
  const author = await graphQLClient.request(query)
  return { props: { author: author.user } }
}

export default function About({ author }) {
  return (
    <>
      <PageSeo
        title={`About - ${author.name}`}
        description={`About me - ${author.description}`}
        url={`${siteMetadata.siteUrl}/about`}
      />
      <div className="divide-y">
        <div className="pt-6 pb-8 space-y-2 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center pt-8 space-x-2">
            <img src={author.avatar_url} alt="avatar" className="w-48 h-48 rounded-full" />
            <h3 className="pt-4 pb-2 text-2xl font-bold leading-8 tracking-tight">{author.name}</h3>
            <div className="text-gray-500 dark:text-gray-400">{author.company}</div>
            <div className="text-gray-500 dark:text-gray-400">{author.location}</div>
            <div className="flex pt-6 space-x-3">
              <SocialIcon kind="mail" href={`mailto:${author.email}`} />
              <SocialIcon kind="github" href={'https://github.com/' + author.github} />
              <SocialIcon kind="twitter" href={'https://twitter.com/' + author.twitter} />
            </div>
          </div>
          <div className="pt-8 pb-8 max-w-none xl:col-span-2">
            <div className="prose dark:prose-dark">{author.bio}</div>
            {author.repos.length && (
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                <div className="pt-6 pb-8 space-y-2 md:space-y-5">
                  <h2 className="text-xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-2xl sm:leading-10 md:text-3xl md:leading-14">
                    My Latest Repositories
                  </h2>
                </div>
                <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                  {author.repos.map((repo, index) => (
                    <li key={index} className="py-6">
                      <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                        <dl>
                          <dt className="sr-only">Published on</dt>
                          <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                            <time dateTime={repo.created_at}>
                              {postDateTemplate.render(new Date(repo.created_at))}
                            </time>
                          </dd>
                        </dl>
                        <div className="space-y-5 xl:col-span-3">
                          <div className="space-y-6">
                            <div>
                              <h2 className="text-2xl font-bold leading-8 tracking-tight">
                                <Link
                                  href={`/blog/${repo.name}`}
                                  className="text-gray-900 dark:text-gray-100"
                                >
                                  {repo.name}
                                </Link>
                              </h2>
                            </div>
                            <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                              {repo.description}
                            </div>
                          </div>
                          <div className="text-base font-medium leading-6">
                            <Link
                              href={repo.html_url}
                              className="text-blue-500 hover:text-blue-600 dark:hover:text-blue-400"
                              aria-label={`Go to "${repo.title}"`}
                            >
                              Go &rarr;
                            </Link>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
