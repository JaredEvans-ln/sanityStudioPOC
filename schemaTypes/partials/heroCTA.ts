import { defineType, defineField } from 'sanity';

export const heroCTA = defineType({
  name: 'heroCTA',
  title: 'Hero CTA',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
    }),
    defineField({
      name: 'class',
      title: 'CSS Class',
      type: 'string',
    }),
    defineField({
      name: 'linkSize',
      title: 'Link Size',
      type: 'string',
    }),
    defineField({
      name: 'target',
      title: 'Target',
      type: 'string',
      options: {
        list: [
          { title: '_self', value: '_self' },
          { title: '_blank', value: '_blank' },
        ],
      },
    }),
    defineField({
      name: 'browseLink',
      title: 'Browse Link',
      type: 'url',
    }),
    defineField({
      name: 'modalid',
      title: 'Modal ID',
      type: 'string',
    }),
  ],
});
