import {defineField, defineType} from 'sanity'

export const quote = defineType({
  name: 'quote',
  title: 'Quote',
  type: 'object',
  fields: [
    defineField({
      name: 'text',
      title: 'Text',
      type: 'text',
    }),
    defineField({
      name: 'attributedTo',
      title: 'Attributed To',
      type: 'reference',
      to: [{type: 'person'}],
    }),
  ],
  preview: {
    select: {
      title: 'text',
      firstName: 'attributedTo.firstName',
      lastName: 'attributedTo.lastName',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.firstName} ${selection.lastName}`,
      }
    },
  },
})
