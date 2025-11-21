import {defineField, defineType} from 'sanity'
import {MicrophoneIcon} from '@sanity/icons'

export const announcements = defineType({
  name: 'announcements',
  type: 'object',
  icon: MicrophoneIcon,
  fields: [
    defineField({name: 'heading', type: 'string'}),
    defineField({name: 'announcements', type: 'array', of: [{type: 'announcement'}]}),
  ],
  preview: {
    select: {
      heading: 'heading',
      announcementImage: 'announcements[0].image',
    },
    prepare({heading, announcementImage}) {
      return {
        title: heading,
        media: announcementImage,
      }
    },
  },
})
