// Utility function to generate Sanity image URLs
// This is a simplified version - you may want to use @sanity/image-url for more features

interface ImageAsset {
  asset?: {
    _ref: string
  }
}

export function imageUrlBuilder(image: ImageAsset): string {
  if (!image?.asset?._ref) return ''

  // Extract the image ID from the reference
  // Format: image-{assetId}-{dimensions}-{format}
  const ref = image.asset._ref
  const parts = ref.split('-')

  if (parts.length < 4) return ''

  const assetId = parts[1]
  const dimensions = parts[2]
  const format = parts[3]

  // Replace with your actual Sanity project ID and dataset
  const projectId = process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id'
  const dataset = process.env.SANITY_STUDIO_DATASET || 'production'

  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${assetId}-${dimensions}.${format}`
}

// Alternative: Install @sanity/image-url and use this instead:
/*
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const builder = imageUrlBuilder({
  projectId: process.env.SANITY_STUDIO_PROJECT_ID || 'your-project-id',
  dataset: process.env.SANITY_STUDIO_DATASET || 'production',
})

export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}
*/
