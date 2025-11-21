import {type PortableTextBlock} from 'next-sanity'
import CustomPortableText from '@/app/components/PortableText'
import {ExtractPageBuilderType} from '@/sanity/lib/types'

type InfoProps = {
  block: ExtractPageBuilderType<'infoSection'>
  index: number
  pageId: string
  pageType: string
}

export default function InfoSectionBlock({block, pageId, pageType}: InfoProps) {
  return (
    <div className="container my-12 min-h-10">
      <div className="max-w-3xl">
        {block?.heading && (
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">{block.heading}</h2>
        )}
        {block?.subheading && (
          <span className="block mt-4 mb-8 text-lg uppercase font-light text-gray-900/70">
            {block.subheading}
          </span>
        )}
        <div className="mt-4">
          {block?.body?.length && (
            <CustomPortableText
              parentId={pageId}
              parentType={pageType}
              parentPath={`pageBuilder[_key=="${block._key}"].body`}
              value={block.body as PortableTextBlock[]}
            />
          )}
        </div>
      </div>
    </div>
  )
}
