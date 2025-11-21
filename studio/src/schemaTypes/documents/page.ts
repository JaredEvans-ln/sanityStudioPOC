import {defineField, defineType, Slug, ValidationContext} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

/**
 * Page schema.  Define and edit the fields for the 'page' content type.
 * Learn more: https://www.sanity.io/docs/schema-types
 */

const isHomePage = (id: string) => id === 'homePage' || id === 'drafts.homePage'

export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    {
      name: 'basic',
      title: 'Basic Information',
      default: true,
    },
    {
      name: 'pageBlocks',
      title: 'Page Blocks',
    },
  ],
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      description:
        'The name of this page in the Sanity Studio/browser tabs. Used to generate the slug.',
      group: 'basic',
      hidden: ({document}) => isHomePage(document?._id || ''),
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'basic',
      options: {
        source: 'name',
        maxLength: 96,
      },
      hidden: ({document}) => isHomePage(document?._id || ''),
      validation: (Rule) =>
        Rule.custom((slug: Slug | undefined, context: ValidationContext) => {
          const documentId = context.document?._id
          const isHomePage = documentId === 'homePage' || documentId === 'drafts.homePage'

          if (isHomePage) {
            return true
          }

          if (!slug || !slug.current) {
            return 'Required'
          }

          return true
        }),
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      group: 'basic',
      description:
        'The heading of this page. Used to generate the title at the top of the page in the front end.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'string',
      group: 'basic',
    }),
    defineField({
      name: 'pageBuilder',
      title: 'Page builder',
      type: 'array',
      group: 'pageBlocks',
      of: [
        {type: 'callToAction'},
        {type: 'infoSection'},
        {type: 'contactForm'},
        {type: 'announcements'},
      ],
      options: {
        insertMenu: {
          // Configure the "Add Item" menu to display a thumbnail preview of the content type. https://www.sanity.io/docs/array-type#efb1fe03459d
          views: [
            {
              name: 'grid',
              previewImageUrl: (schemaTypeName) =>
                `/static/page-builder-thumbnails/${schemaTypeName}.webp`,
            },
          ],
        },
      },
    }),
  ],
})
