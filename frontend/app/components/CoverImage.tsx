import {stegaClean} from '@sanity/client/stega'
import {Image} from 'next-sanity/image'
import {getImageDimensions} from '@sanity/asset-utils'
import {urlForImage} from '@/sanity/lib/utils'

interface CoverImageProps {
  image: any
  attribute: string
  priority?: boolean
}

export default function CoverImage(props: CoverImageProps) {
  const {image: source, priority} = props
  const image = source?.asset?._ref ? (
    <Image
      data-sanity={props.attribute}
      className="object-cover"
      width={getImageDimensions(source).width}
      height={getImageDimensions(source).height}
      alt={stegaClean(source?.alt) || ''}
      src={urlForImage(source)?.url() as string}
      priority={priority}
    />
  ) : null

  return <div className="relative">{image}</div>
}
