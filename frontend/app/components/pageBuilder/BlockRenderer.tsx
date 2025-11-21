import React from 'react'

import CallToAction from '@/app/components/pageBuilder/blockComponents/CallToAction'
import InfoSection from '@/app/components/pageBuilder/blockComponents/InfoSection'
import ContactForm from './blockComponents/ContactForm'
import Announcements from './blockComponents/Announcements'
import {dataAttr} from '@/sanity/lib/utils'

type BlocksType = {
  [key: string]: React.FC<any>
}

type BlockType = {
  _type: string
  _key: string
}

type BlockProps = {
  index: number
  block: BlockType
  pageId: string
  pageType: string
}

const Blocks: BlocksType = {
  callToAction: CallToAction,
  infoSection: InfoSection,
  contactForm: ContactForm,
  announcements: Announcements,
}

/**
 * Used by the <PageBuilder>, this component renders a the component that matches the block type.
 */
export default function BlockRenderer({block, index, pageId, pageType}: BlockProps) {
  // Block does exist

  if (typeof Blocks[block._type] !== 'undefined') {
    const attr = dataAttr({
      id: pageId,
      type: pageType,
      path: `pageBuilder[_key=="${block._key}"]`,
    })
    return (
      <div key={block._key} data-sanity={attr.toString()}>
        {React.createElement(Blocks[block._type], {
          key: block._key,
          pageId: pageId,
          pageType: pageType,
          block: block,
          index: index,
        })}
      </div>
    )
  }
  // Block doesn't exist yet
  return React.createElement(
    () => (
      <div className="w-full bg-gray-100 text-center text-gray-500 p-20 rounded">
        A &ldquo;{block._type}&rdquo; block hasn&apos;t been created
      </div>
    ),
    {key: block._key},
  )
}
