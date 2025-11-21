/**
 * This component uses Portable Text to render a post body.
 *
 * You can learn more about Portable Text on:
 * https://www.sanity.io/docs/block-content
 * https://github.com/portabletext/react-portabletext
 * https://portabletext.org/
 *
 */

import {
  PortableText,
  type PortableTextComponents,
  type PortableTextBlock,
  createDataAttribute,
} from 'next-sanity'
import ResolvedLink from '@/app/components/ResolvedLink'
import {snakeCaseToTitleCase} from '@/shared/utils/text'
import CoverImage from './CoverImage'

export default function CustomPortableText({
  parentId,
  parentType,
  parentPath,
  className,
  value,
  themeName,
  customTextColor,
}: {
  parentId: string
  parentType: string
  parentPath: string
  className?: string
  value: PortableTextBlock[]
  themeName?: string
  customTextColor?: string
}) {
  const components: PortableTextComponents = {
    types: {
      image: ({value}) => {
        const attr = createDataAttribute({
          id: parentId,
          type: parentType,
          path: `${parentPath}[_key=="${value?._key}"]`,
        })
        if (!value?.asset?._ref) return null
        return <CoverImage image={value} attribute={attr()} />
      },
      planTier: ({value}) => {
        if (!value) return null
        return <div>{snakeCaseToTitleCase(value.tier)}</div>
      },
      quote: ({value}) => {
        if (!value) return null
        return (
          <div className="border-l-4 border-gray-200 pl-4">
            <p className="text-lg font-bold">{value.text}</p>
            <p className="text-sm text-gray-500">
              {value.attributedTo.firstName} {value.attributedTo.lastName}
            </p>
          </div>
        )
      },
    },
    block: {
      h1: ({children, value}) => (
        // Add an anchor to the h1
        <h1 className="group relative">
          {children}
          <a
            href={`#${value?._key}`}
            className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
          </a>
        </h1>
      ),
      h2: ({children, value}) => {
        // Add an anchor to the h2
        return (
          <h2 className="group relative">
            {children}
            <a
              href={`#${value?._key}`}
              className="absolute left-0 top-0 bottom-0 -ml-6 flex items-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                />
              </svg>
            </a>
          </h2>
        )
      },
    },
    marks: {
      link: ({children, value: link}) => {
        return <ResolvedLink link={link}>{children}</ResolvedLink>
      },
    },
  }

  return (
    <div
      className={['prose prose-a:text-brand', className].filter(Boolean).join(' ')}
      style={themeName ? {color: customTextColor} : {}}
    >
      <PortableText components={components} value={value} />
    </div>
  )
}
