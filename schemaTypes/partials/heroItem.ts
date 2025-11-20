import { defineType, defineField, defineArrayMember } from 'sanity';

export const heroItem = defineType({
  name: 'heroItem',
  title: 'Hero Item',
  type: 'object',
  fields: [
    defineField({
      name: 'insightType',
      title: 'Insight Type',
      type: 'string',
    }),
    defineField({
      name: 'subitemvalue',
      title: 'Sub Item Value',
      type: 'string',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
    }),
    defineField({
      name: 'copyClass',
      title: 'Copy Class',
      type: 'string',
    }),
    defineField({
      name: 'tagLine',
      title: 'Tag Line',
      description: 'Supports HTML markup like <sup>®</sup>',
      type: 'text',
    }),
    defineField({
      name: 'taglineClass',
      title: 'Tagline Class',
      type: 'string',
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'headingClass',
      title: 'Heading Class',
      type: 'string',
    }),
    defineField({
      name: 'subHeading',
      title: 'Subheading',
      type: 'string',
    }),
    defineField({
      name: 'subHeadingClass',
      title: 'Subheading Class',
      type: 'string',
    }),
    defineField({
      name: 'backgroundVideo',
      title: 'Background Video URL',
      type: 'url',
    }),
    defineField({
      name: 'featureImage',
      title: 'Feature Image',
      type: 'image',
    }),
    defineField({
      name: 'featureImageWEBP',
      title: 'Feature Image (WEBP)',
      type: 'image',
    }),
    defineField({
      name: 'ctas',
      title: 'CTAs',
      type: 'array',
      of: [defineArrayMember({ type: 'heroCTA' })],
    }),
  ],
});
