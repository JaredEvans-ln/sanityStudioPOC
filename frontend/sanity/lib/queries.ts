import {defineQuery} from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": coalesce(page->slug.current, '/'),
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      },
`

const bodyFragment = /* groq */ `
  body[]{
    ...,
    _type == 'reference' => @->,
    _type == 'quote' => {
      ..., 
      attributedTo->{...}
    },
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
`
const buttonFragment = `
  button {
    ...,
    ${linkFields}
  },
`

const pageFragment = `
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields}
        ${bodyFragment}
        ${buttonFragment}
      },
      _type == "infoSection" => {
        ${bodyFragment}
      },
      _type == "announcements" => {
        announcements[] {
          ...,
          ${buttonFragment}
        }
      }
    },
`

export const getHomePageQuery = defineQuery(`
  *[_type == 'page' && _id == 'homePage'][0]{
    ${pageFragment}
  }
`)
export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    ${pageFragment}
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    ${postFields}
    ${bodyFragment}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)
