import {Suspense} from 'react'
import {AllPosts} from '@/app/components/Posts'
import PageBuilderPage from '@/app/components/pageBuilder/PageBuilder'
import {getHomePageQuery} from '@/sanity/lib/queries'
import {GetHomePageQueryResult} from '@/sanity.types'
import {sanityFetch} from '@/sanity/lib/live'
import Head from 'next/head'

export default async function HomePage() {
  const {data: homePage} = await sanityFetch({
    query: getHomePageQuery,
  })

  if (!homePage) {
    return null
  }

  return (
    <div className="my-12 lg:my-24">
      <Head>
        <title>{homePage.heading}</title>
      </Head>
      <div className="">
        <div className="container">
          <div className="pb-6 border-b border-gray-100">
            <div className="max-w-3xl">
              <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-7xl">
                {homePage.heading}
              </h2>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-gray-600 uppercase font-light">
                {homePage.subheading}
              </p>
            </div>
          </div>
        </div>
      </div>
      <PageBuilderPage page={homePage as GetHomePageQueryResult} />
      <div className="container">
        <aside className="py-12 sm:py-20">
          <Suspense>{await AllPosts()}</Suspense>
        </aside>
      </div>
    </div>
  )
}
