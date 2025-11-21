import {defineField, defineType} from 'sanity'
import {snakeCaseToTitleCase} from '@/shared/utils/text'

export const planTier = defineType({
  name: 'planTier',
  title: 'Plan Tier',
  type: 'document',
  fields: [
    defineField({
      name: 'tier',
      title: 'Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Pro', value: 'pro'},
          {title: 'Enterprise', value: 'enterprise'},
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: 'tier',
    },
    prepare(selection) {
      return {
        title: snakeCaseToTitleCase(selection.title),
      }
    },
  },
})
