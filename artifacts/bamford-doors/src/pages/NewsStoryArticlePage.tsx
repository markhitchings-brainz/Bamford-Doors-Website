import { PortableText } from '@portabletext/react';
import { Link } from 'wouter';
import { CookieSettingsButton, useCookieConsent } from '@/components/CookieConsent';
import { getCaseStudyVideoEmbed } from '../sanity/caseStudyVideo';
import './news-story-article.css';

export type NewsStoryImage = {
  url: string;
  alt?: string;
  dimensions?: { width: number; height: number };
};

export type NewsStoryGalleryItem = {
  url: string;
  alt?: string;
  caption?: string;
  _key: string;
};

export type NewsStory = {
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  author?: string;
  publishedAt: string;
  mainImage?: NewsStoryImage | null;
  body: Array<Record<string, unknown>>;
  videoUrl?: string | null;
  gallery?: NewsStoryGalleryItem[] | null;
};

type NewsStoryArticlePageProps = {
  story: NewsStory;
};

function formatPublishedDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

function safeArticleHref(value?: string) {
  if (!value) return undefined;
  const trimmed = value.trim();
  if (/^(https?:|mailto:|tel:|\/|#)/i.test(trimmed) && !/^\/\//.test(trimmed)) {
    return trimmed;
  }
  return undefined;
}

function imageDimensions(image: NewsStoryImage) {
  const { width, height } = image.dimensions || {};
  return {
    ...(width && width > 0 ? { width } : {}),
    ...(height && height > 0 ? { height } : {}),
  };
}

function optimizedImageUrl(url: string, width: number) {
  try {
    const image = new URL(url);
    image.searchParams.set('w', String(width));
    image.searchParams.set('auto', 'format');
    return image.toString();
  } catch {
    return url;
  }
}

function imageSrcSet(image: NewsStoryImage, widths: number[]) {
  const maxWidth = image.dimensions?.width;
  return widths
    .filter((width) => !maxWidth || width <= maxWidth)
    .map((width) => `${optimizedImageUrl(image.url, width)} ${width}w`)
    .join(', ') || undefined;
}

export function NewsStoryArticlePage({ story }: NewsStoryArticlePageProps) {
  const video = getCaseStudyVideoEmbed(story.videoUrl);
  const { externalMediaAllowed } = useCookieConsent();
  const gallery = (story.gallery || []).filter((image) => image?.url);

  return (
    <main className="news-story-page" data-story-slug={story.slug}>
      <article className="news-story-article" aria-labelledby="news-story-title">
        <header className="news-story-header">
          <div className="news-story-container">
            <Link href="/news-insights" className="news-story-backlink">
              <span aria-hidden="true">←</span>
              <span>Back to news &amp; insights</span>
            </Link>

            <div className="news-story-heading">
              <p className="news-story-kicker">
                <span>{story.category || 'News & insights'}</span>
                <span className="news-story-kicker-divider" aria-hidden="true" />
                <time dateTime={story.publishedAt}>{formatPublishedDate(story.publishedAt)}</time>
              </p>
              <h1 id="news-story-title">{story.title}</h1>
              {story.excerpt && <p className="news-story-excerpt">{story.excerpt}</p>}
              {story.author && (
                <div className="news-story-byline">
                  <span>Words by {story.author}</span>
                </div>
              )}
            </div>
          </div>
        </header>

        {story.mainImage?.url && (
          <figure className="news-story-main-figure news-story-container">
            <img
              src={optimizedImageUrl(story.mainImage.url, 1600)}
              srcSet={imageSrcSet(story.mainImage, [640, 960, 1280, 1600, 1920])}
              sizes="(max-width: 760px) calc(100vw - 36px), min(1120px, calc(100vw - 48px))"
              {...imageDimensions(story.mainImage)}
              alt={story.mainImage.alt || ''}
              fetchPriority="high"
              decoding="async"
            />
          </figure>
        )}

        <div className="news-story-container">
          <div className="news-story-content-layout">
            <aside className="news-story-side-note" aria-label="Article information">
              <span className="news-story-side-label">Bamford Doors</span>
              <span>News &amp; insights</span>
            </aside>

            <div className="news-story-content">
              <div className="news-story-body">
                <PortableText
                  value={story.body as never[]}
                  components={{
                    types: {
                      image: ({ value }) => value?.url ? (
                        <figure>
                          <img
                            src={optimizedImageUrl(value.url, 960)}
                            srcSet={imageSrcSet(value as NewsStoryImage, [480, 720, 960, 1200])}
                            sizes="(max-width: 760px) calc(100vw - 36px), 720px"
                            {...imageDimensions(value as NewsStoryImage)}
                            alt={value.alt || ''}
                            loading="lazy"
                            decoding="async"
                          />
                        </figure>
                      ) : null,
                    },
                    marks: {
                      link: ({ children, value }) => {
                        const href = safeArticleHref(value?.href);
                        return href ? (
                          <a href={href} rel={/^https?:/i.test(href) ? 'noopener noreferrer' : undefined}>
                            {children}
                          </a>
                        ) : <>{children}</>;
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {video && (
          <section className="news-story-media-section news-story-container" aria-labelledby="news-story-video-title">
            <div className="news-story-section-heading">
              <p className="news-story-section-label">Watch</p>
              <h2 id="news-story-video-title">The story in context</h2>
            </div>
            <div className="news-story-video-frame">
              {externalMediaAllowed ? (
                <iframe
                  src={video.src}
                  title={`${story.title} — video on ${video.provider}`}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              ) : (
                <div className="cookie-media-blocked">
                  <p>
                    This video is hosted by {video.provider}. Allow external
                    media to load it.
                  </p>
                  <CookieSettingsButton>Review cookie preferences</CookieSettingsButton>
                </div>
              )}
            </div>
            <p className="news-story-media-caption">Watch this story on {video.provider}.</p>
          </section>
        )}

        {gallery.length > 0 && (
          <section className="news-story-gallery-section news-story-container" aria-labelledby="news-story-gallery-title">
            <div className="news-story-section-heading">
              <p className="news-story-section-label">In pictures</p>
              <h2 id="news-story-gallery-title">A closer look</h2>
            </div>
            <div className="news-story-gallery">
              {gallery.map((image) => (
                <figure className="news-story-gallery-item" key={image._key}>
                  <img
                    src={optimizedImageUrl(image.url, 960)}
                    srcSet={imageSrcSet(image, [480, 720, 960, 1200])}
                    sizes="(max-width: 760px) calc(100vw - 36px), 50vw"
                    {...imageDimensions(image)}
                    alt={image.alt || ''}
                    loading="lazy"
                    decoding="async"
                  />
                  {image.caption && <figcaption>{image.caption}</figcaption>}
                </figure>
              ))}
            </div>
          </section>
        )}

        <footer className="news-story-footer">
          <div className="news-story-container">
            <p>More from Bamford Doors</p>
            <Link href="/news-insights" className="news-story-backlink news-story-backlink-bottom">
              <span aria-hidden="true">←</span>
              <span>Back to news &amp; insights</span>
            </Link>
          </div>
        </footer>
      </article>
    </main>
  );
}

export default NewsStoryArticlePage;
