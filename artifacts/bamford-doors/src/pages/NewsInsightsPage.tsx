import { useEffect, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'wouter';
import { applyPageSeo } from '@/lib/seo';
import {
  fetchPublishedNewsStories,
  fetchPublishedNewsStory,
  type NewsStory,
} from '@/sanity/client';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import NewsStoryArticlePage from './NewsStoryArticlePage';

type NewsInsightsPageProps = {
  slug?: string;
};

export default function NewsInsightsPage({ slug }: NewsInsightsPageProps) {
  return slug ? <ArticleDetail slug={slug} /> : <NewsListing />;
}

function NewsListing() {
  const [stories, setStories] = useState<NewsStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    fetchPublishedNewsStories()
      .then((items) => {
        if (active) setStories(items);
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, []);

  return <>
    <NewsHeading eyebrow="News & insights" title="News and insights" lead="Updates and practical information from Bamford Doors." />
    <section className="section">
      <div className="wrap">
        {loading && <p className="news-state" role="status">Loading stories…</p>}
        {failed && <p className="news-state" role="alert">News stories are temporarily unavailable. Please try again shortly.</p>}
        {!loading && !failed && stories.length === 0 && <p className="news-state">New stories from Bamford Doors will appear here.</p>}
        {!failed && stories.length > 0 && <div className="news-grid">
          {stories.map((story) => <Link className="news-card" href={`/news-insights/${story.slug}`} key={story._id}>
            {story.mainImage?.url
              ? <img src={newsImageUrl(story.mainImage.url, 640)} srcSet={newsImageSrcSet(story.mainImage.url, [320, 480, 640, 960], story.mainImage.dimensions?.width)} sizes="(max-width: 760px) 100vw, 33vw" width={story.mainImage.dimensions?.width} height={story.mainImage.dimensions?.height} alt={story.mainImage.alt || ''} loading="lazy" decoding="async" />
              : <div className="news-card-image-placeholder" aria-hidden="true" />}
            <div className="news-card-copy">
              <div className="news-card-meta"><span>{story.category || 'News'}</span><time dateTime={story.publishedAt}>{formatNewsDate(story.publishedAt)}</time></div>
              <h2>{story.title}</h2>
              <p>{story.excerpt}</p>
              <span className="news-card-link">Read story <ArrowRight size={15} /></span>
            </div>
          </Link>)}
        </div>}
      </div>
    </section>
  </>;
}

function ArticleDetail({ slug }: { slug: string }) {
  const [story, setStory] = useState<NewsStory | null>(null);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    setStory(null);
    setLoading(true);
    setFailed(false);
    fetchPublishedNewsStory(slug)
      .then((item) => {
        if (active) setStory(item);
      })
      .catch(() => {
        if (active) setFailed(true);
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [slug]);

  useEffect(() => {
    if (!story) return;
    applyPageSeo({
      title: story.seoTitle || story.title,
      description: story.seoDescription || story.excerpt,
      path: `/news-insights/${story.slug}`,
      image: story.mainImage?.url,
      noindex: true,
    });
  }, [story]);

  if (loading) return <>
    <NewsHeading eyebrow="News & insights" title="Loading story…" />
    <section className="section"><div className="wrap"><p className="news-state" role="status">Loading article…</p></div></section>
  </>;
  if (failed) return <>
    <NewsHeading eyebrow="News & insights" title="Story unavailable" />
    <section className="section"><div className="wrap"><p className="news-state" role="alert">We couldn’t load this story. Please try again shortly.</p><Link href="/news-insights" className="button button-outline">Back to news</Link></div></section>
  </>;
  if (!story) return <section className="section"><div className="wrap"><NewsHeading eyebrow="News & insights" title="Story not found" /><Link href="/news-insights" className="button button-outline">Back to news</Link></div></section>;

  return <NewsStoryArticlePage story={story} />;
}

function NewsHeading({ eyebrow, title, lead }: { eyebrow: string; title: string; lead?: string }) {
  return <div className="page-hero"><div className="wrap"><p className="eyebrow">{eyebrow}</p><EditablePageHeadline>{title}</EditablePageHeadline>{lead && <p className="lead">{lead}</p>}</div></div>;
}

function formatNewsDate(value: string) {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? ''
    : new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
}

function newsImageUrl(url: string, width: number) {
  try {
    const image = new URL(url);
    image.searchParams.set('w', String(width));
    image.searchParams.set('auto', 'format');
    return image.toString();
  } catch {
    return url;
  }
}

function newsImageSrcSet(url: string, widths: number[], maxWidth?: number) {
  const candidates = maxWidth ? widths.filter((width) => width <= maxWidth) : widths;
  return candidates
    .sort((a, b) => a - b)
    .map((width) => `${newsImageUrl(url, width)} ${width}w`)
    .join(', ') || undefined;
}
