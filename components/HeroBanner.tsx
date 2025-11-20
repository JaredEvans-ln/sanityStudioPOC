import React from 'react'
import {imageUrlBuilder} from './utils/imageUrlBuilder'

interface HeroCTA {
  label?: string
  class?: string
  linkSize?: string
  target?: string
  browseLink?: string
  modalid?: string
}

interface HeroItem {
  insightType?: string
  subitemvalue?: string
  backgroundImage?: {
    asset?: {
      _ref: string
    }
  }
  copyClass?: string
  tagLine?: string
  taglineClass?: string
  heading?: string
  headingClass?: string
  subHeading?: string
  subHeadingClass?: string
  backgroundVideo?: string
  featureImage?: {
    asset?: {
      _ref: string
    }
  }
  featureImageWEBP?: {
    asset?: {
      _ref: string
    }
  }
  ctas?: HeroCTA[]
}

interface HeroBannerProps {
  banner: {
    dcrname?: string
    jsonname?: string
    itemvalue?: string
    itemtype?: string
    class?: string
    height?: string
    theme?: string
    transparent?: boolean
    items?: HeroItem[]
  }
}

const HeroBanner: React.FC<HeroBannerProps> = ({banner}) => {
  if (!banner) return null

  const {itemvalue, itemtype, height, theme, transparent, items} = banner

  const bannerClass = `hero-banner ${banner.class || ''} ${theme || ''} ${transparent ? 'transparent' : ''}`.trim()

  const getImageUrl = (image?: {asset?: {_ref: string}}) => {
    if (!image?.asset?._ref) return ''
    // This is a placeholder - you'll need to implement proper Sanity image URL generation
    return imageUrlBuilder(image)
  }

  const renderCTA = (cta: HeroCTA, index: number) => {
    const {label, class: ctaClass, linkSize, target, browseLink, modalid} = cta

    if (modalid) {
      return (
        <button
          key={index}
          className={`cta ${ctaClass || ''} ${linkSize || ''}`}
          data-modal-id={modalid}
          type="button"
        >
          {label}
        </button>
      )
    }

    if (browseLink) {
      return (
        <a
          key={index}
          href={browseLink}
          className={`cta ${ctaClass || ''} ${linkSize || ''}`}
          target={target || '_self'}
          rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        >
          {label}
        </a>
      )
    }

    return null
  }

  const renderHeroItem = (item: HeroItem, index: number) => {
    const backgroundImageUrl = getImageUrl(item.backgroundImage)
    const featureImageUrl = getImageUrl(item.featureImageWEBP || item.featureImage)

    const itemStyle: React.CSSProperties = {
      ...(backgroundImageUrl && {backgroundImage: `url(${backgroundImageUrl})`}),
    }

    return (
      <div key={index} className={`hero-item ${item.copyClass || ''}`} style={itemStyle}>
        {item.backgroundVideo && (
          <div className="hero-video-background">
            <video autoPlay muted loop playsInline>
              <source src={item.backgroundVideo} type="video/mp4" />
            </video>
          </div>
        )}

        <div className="hero-content">
          {item.tagLine && (
            <div
              className={`hero-tagline ${item.taglineClass || ''}`}
              dangerouslySetInnerHTML={{__html: item.tagLine}}
            />
          )}

          {item.heading && <h1 className={`hero-heading ${item.headingClass || ''}`}>{item.heading}</h1>}

          {item.subHeading && (
            <p className={`hero-subheading ${item.subHeadingClass || ''}`}>{item.subHeading}</p>
          )}

          {item.ctas && item.ctas.length > 0 && (
            <div className="hero-ctas">{item.ctas.map((cta, ctaIndex) => renderCTA(cta, ctaIndex))}</div>
          )}
        </div>

        {featureImageUrl && (
          <div className="hero-feature-image">
            <img src={featureImageUrl} alt={item.heading || 'Hero feature'} />
          </div>
        )}
      </div>
    )
  }

  return (
    <div
      className={bannerClass}
      data-item-value={itemvalue}
      data-item-type={itemtype}
      style={{height: height || undefined}}
    >
      {items && items.length > 0 ? (
        <div className="hero-items-container">
          {items.map((item, index) => renderHeroItem(item, index))}
        </div>
      ) : (
        <div className="hero-empty">No hero items configured</div>
      )}
    </div>
  )
}

export default HeroBanner
