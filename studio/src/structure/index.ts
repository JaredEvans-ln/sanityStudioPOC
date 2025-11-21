import {
  CogIcon,
  ComposeIcon,
  CreditCardIcon,
  DocumentIcon,
  EarthGlobeIcon,
  HomeIcon,
} from '@sanity/icons'
import type {StructureBuilder, StructureResolver} from 'sanity/structure'
import pluralize from 'pluralize-esm'

/**
 * Structure builder is useful whenever you want to control how documents are grouped and
 * listed in the studio or for adding additional in-studio previews or content to documents.
 * Learn more: https://www.sanity.io/docs/structure-builder-introduction
 */

const DISABLED_TYPES = ['settings', 'assist.instruction.context', 'page', 'post', 'planTier']

export const structure: StructureResolver = (S: StructureBuilder) =>
  S.list()
    .title('Website Content')
    .items([
      S.listItem()
        .title('Website')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .id('website-pages')
            .items([
              S.listItem()
                .title('Home Page')
                .icon(HomeIcon)
                .child(S.document().schemaType('page').documentId('homePage')),
              S.listItem()
                .title('Page Builder')
                .icon(DocumentIcon)
                .child(
                  S.documentTypeList('page')
                    .title('Pages')
                    .filter('_type == "page" && _id != "homePage"'),
                ),
              S.listItem()
                .title('Site Settings')
                .child(S.document().schemaType('settings').documentId('siteSettings'))
                .icon(CogIcon),
            ]),
        ),
      S.listItem()
        .title('Blog')
        .icon(ComposeIcon)
        .child(S.documentTypeList('post').title('Blog Posts')),
      ...S.documentTypeListItems()
        // Remove the "assist.instruction.context" and "settings" content  from the list of content types
        .filter((listItem: any) => !DISABLED_TYPES.includes(listItem.getId()))
        // Pluralize the title of each document type.  This is not required but just an option to consider.
        .map((listItem) => {
          return listItem.title(pluralize(listItem.getTitle() as string))
        }),
      S.listItem()
        .title('Plan Tiers')
        .icon(CreditCardIcon)
        .child(S.documentTypeList('planTier').title('Plan Tiers')),
      // Settings Singleton in order to view/edit the one particular document for Settings.  Learn more about Singletons: https://www.sanity.io/docs/create-a-link-to-a-single-edit-page-in-your-main-document-type-list
    ])
