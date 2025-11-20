import { defineType, defineField, defineArrayMember } from 'sanity';

import HeroBannerPreview from '../../components/preview/HeroBannerPreview';

export const heroBanner = defineType({
  name: 'heroBanner',
  title: 'Hero Banner',
  type: 'document',
  fields: [
    defineField({
      name: 'dcrname',
      title: 'DCR Name',
      type: 'string',
    }),
    defineField({
      name: 'jsonname',
      title: 'JSON Name',
      type: 'string',
    }),
    defineField({
      name: 'itemvalue',
      title: 'Item Value',
      type: 'string',
    }),
    defineField({
      name: 'itemtype',
      title: 'Item Type',
      type: 'string',
    }),
    defineField({
      name: 'class',
      title: 'Class',
      type: 'string',
    }),
    defineField({
      name: 'height',
      title: 'Height',
      type: 'string',
    }),
    defineField({
      name: 'theme',
      title: 'Theme',
      type: 'string',
    }),
    defineField({
      name: 'transparent',
      title: 'Transparent',
      type: 'boolean',
    }),
    defineField({
      name: 'items',
      title: 'Hero Items',
      type: 'array',
      of: [defineArrayMember({ type: 'heroItem' })],
    }),
  ],
  components: {
    preview: HeroBannerPreview,
    }
});
