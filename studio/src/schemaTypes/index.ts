import {person} from './documents/person'
import {page} from './documents/page'
import {post} from './documents/post'
import {planTier} from './documents/planTier'
import {category} from './documents/category'
import {callToAction} from './objects/callToAction'
import {contactForm} from './objects/contactForm'
import {infoSection} from './objects/infoSection'
import {settings} from './singletons/settings'
import {link} from './objects/link'
import {blockContent} from './objects/blockContent'
import {quote} from './objects/quote'
import {button} from './objects/button'
import {announcements} from './objects/announcements'
import {announcement} from './objects/announcement'
import {blockContentTextOnly} from './objects/blockContentTextOnly'

// Export an array of all the schema types.  This is used in the Sanity Studio configuration. https://www.sanity.io/docs/schema-types

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  page,
  post,
  person,
  category,
  planTier,
  // Objects
  contactForm,
  blockContent,
  blockContentTextOnly,
  infoSection,
  callToAction,
  announcements,
  announcement,
  button,
  link,
  quote,
]
