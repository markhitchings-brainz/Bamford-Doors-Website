import { useCallback, useEffect, useRef, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, Expand, RotateCw, X } from 'lucide-react';
import { Link } from 'wouter';
import { applyPageSeo } from '@/lib/seo';
import { fetchPublishedCaseStudy, type CaseStudy } from '@/sanity/client';
import { getCaseStudyVideoEmbed } from '@/sanity/caseStudyVideo';
import { RichText, formatDate, hasBlocks, sanityImage, sanitySrcSet } from './case-studies/shared';
import { DetailSkeleton } from './case-studies/DetailSkeleton';
import './case-studies/case-studies.css';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'notfound' }
  | { status: 'ready'; item: CaseStudy };

type GalleryImage = { _key: string; url: string; alt?: string; caption?: string };

export function CaseStudyDetailPage({ slug }: { slug: string }) {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    let cancelled = false;
    const path = `/case-studies/${slug}`;
    setState({ status: 'loading' });
    applyPageSeo({ title: 'Case study', description: 'A Bamford Doors case study.', path, noindex: true });
    fetchPublishedCaseStudy(slug)
      .then((item) => {
        if (cancelled) return;
        if (!item) {
          setState({ status: 'notfound' });
          applyPageSeo({ title: 'Case study not found', description: 'This case study is not available.', path, noindex: true });
          return;
        }
        setState({ status: 'ready', item });
        applyPageSeo({
          title: item.seoTitle || item.title,
          description: item.seoDescription || item.excerpt,
          path,
          image: item.mainImage?.url,
          noindex: false,
        });
      })
      .catch(() => {
        if (cancelled) return;
        setState({ status: 'error' });
        applyPageSeo({ title: 'Case study', description: 'This case study could not be loaded.', path, noindex: true });
      });
    return () => { cancelled = true; };
  }, [slug, attempt]);

  if (state.status === 'loading') return <DetailSkeleton />;
  if (state.status === 'error' || state.status === 'notfound') {
    const isError = state.status === 'error';
    return (
      <main className="cs-page" data-testid={isError ? 'status-cs-detail-error' : 'status-cs-notfound'}>
        <section className="cs-hero cs-hero-compact">
          <div className="cs-wrap">
            <Crumbs current={isError ? 'Unavailable' : 'Not found'} />
            <p className="cs-eyebrow">{isError ? 'Connection problem' : 'Project not found'}</p>
            <h1 className="cs-title-sm">{isError ? 'We couldn’t load this project.' : 'This case study isn’t available.'}</h1>
          </div>
        </section>
        <div className="cs-wrap">
          <div className="cs-panel" role={isError ? 'alert' : undefined}>
            <p>{isError ? 'Check your connection and try again.' : 'The link may be out of date, or the project may have been moved. Browse our other projects instead.'}</p>
            <div className="cs-panel-actions">
              {isError && <button type="button" className="cs-button" onClick={retry} data-testid="button-cs-detail-retry"><RotateCw size={15} aria-hidden="true" /> Try again</button>}
              <Link className={isError ? 'cs-text-link' : 'cs-button'} href="/case-studies" data-testid="link-cs-back-list">All case studies <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const item = state.item;
  const video = getCaseStudyVideoEmbed(item.videoUrl);
  const facts = [
    ['Client', item.clientName],
    ['Sector', item.sector],
    ['Location', item.location],
    ['Completed', formatDate(item.completedAt)],
  ].filter((f): f is [string, string] => Boolean(f[1]));
  const products = (item.productsUsed || []).filter(Boolean);
  const gallery = (item.gallery || []).filter((g) => g && g.url);
  const chapters = [
    { id: 'brief', label: 'The brief', blocks: item.brief },
    { id: 'solution', label: 'The solution', blocks: item.solution },
    { id: 'outcome', label: 'The outcome', blocks: item.outcome },
  ].filter((c) => hasBlocks(c.blocks));
  const t = item.testimonial;

  return (
    <main className="cs-page" data-testid={`page-case-study-${item.slug}`}>
      <section className="cs-hero cs-detail-hero" aria-labelledby="cs-detail-title">
        <div className="cs-wrap">
          <Crumbs current={item.title} />
          <div className="cs-detail-head">
            <div>
              <p className="cs-eyebrow">Case study{item.sector ? ` / ${item.sector}` : ''}</p>
              <h1 id="cs-detail-title" data-testid="text-cs-title">{item.title}</h1>
            </div>
            {item.excerpt && <p className="cs-hero-lead" data-testid="text-cs-excerpt">{item.excerpt}</p>}
          </div>
        </div>
      </section>

      {item.mainImage?.url && (
        <figure className="cs-wrap cs-main-figure">
          <img src={sanityImage(item.mainImage.url, 1800)} srcSet={sanitySrcSet(item.mainImage.url, [800, 1300, 1800, 2400])} sizes="(max-width: 1340px) 100vw, 1280px" alt={item.mainImage.alt || ''} data-testid="img-cs-main" />
          {item.mainImage.caption && <figcaption>{item.mainImage.caption}</figcaption>}
        </figure>
      )}

      <div className="cs-wrap cs-body">
        {(facts.length > 0 || products.length > 0) && (
          <aside className="cs-facts" aria-label="Project details" data-testid="panel-cs-facts">
            {facts.length > 0 && <dl>{facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>}
            {products.length > 0 && (
              <div className="cs-products">
                <p>Products used</p>
                <ul>{products.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            )}
            <Link className="cs-button cs-facts-cta" href={`/contact?purpose=consultation&project=${encodeURIComponent(item.title)}`} data-testid="link-cs-facts-contact">Discuss a similar project <ArrowRight size={15} aria-hidden="true" /></Link>
          </aside>
        )}

        <article className="cs-story">
          {chapters.map((c, i) => (
            <section key={c.id} className="cs-chapter" aria-labelledby={`cs-${c.id}`} data-testid={`section-cs-${c.id}`}>
              <div className="cs-chapter-head"><span>0{i + 1}</span><h2 id={`cs-${c.id}`}>{c.label}</h2></div>
              <RichText value={c.blocks} />
            </section>
          ))}
          {t?.quote && (
            <figure className="cs-quote" data-testid="text-cs-testimonial">
              <blockquote><p>{t.quote}</p></blockquote>
              {t.attribution && <figcaption><strong>{t.attribution}</strong>{t.role && <span>{t.role}</span>}</figcaption>}
            </figure>
          )}
        </article>
      </div>

      {video && (
        <section className="cs-video-section cs-wrap" aria-labelledby="cs-video-title" data-testid="section-cs-video">
          <div className="cs-video-head">
            <div><p className="cs-eyebrow">Project video</p><h2 id="cs-video-title">See the project.</h2></div>
            <p>Watch this project video on {video.provider}.</p>
          </div>
          <div className="cs-video-frame">
            <iframe
              src={video.src}
              title={`${item.title} project video on ${video.provider}`}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              data-testid="embed-cs-video"
            />
          </div>
        </section>
      )}

      {gallery.length > 0 && <Gallery images={gallery} />}

      <section className="cs-closing" aria-labelledby="cs-detail-closing">
        <div className="cs-wrap cs-closing-inner">
          <div>
            <p className="cs-eyebrow">Similar building?</p>
            <h2 id="cs-detail-closing">Let’s talk about your entrance.</h2>
            <p>Tell us about the opening, the people who use it and the access you need.</p>
          </div>
          <div className="cs-closing-actions">
            <Link className="cs-button" href={`/contact?purpose=consultation&project=${encodeURIComponent(item.title)}`} data-testid="link-cs-detail-contact">Start an enquiry <ArrowRight size={15} aria-hidden="true" /></Link>
            <Link className="cs-text-link cs-text-link-light" href="/case-studies" data-testid="link-cs-detail-all"><ArrowLeft size={14} aria-hidden="true" /> All case studies</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
function Crumbs({ current }: { current: string }) {
  return (
    <nav className="cs-crumbs" aria-label="Breadcrumb">
      <Link href="/" data-testid="link-cs-crumb-home">Home</Link>
      <ChevronRight size={13} aria-hidden="true" />
      <Link href="/case-studies" data-testid="link-cs-crumb-list">Case studies</Link>
      <ChevronRight size={13} aria-hidden="true" />
      <span aria-current="page">{current}</span>
    </nav>
  );
}

function Gallery({ images }: { images: GalleryImage[] }) {
  const [open, setOpen] = useState<number | null>(null);
  const returnFocus = useRef<HTMLButtonElement | null>(null);
  const count = images.length;
  const go = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + count) % count)), [count]);
  const current = open !== null ? images[open] : null;

  return (
    <section className="cs-gallery" aria-labelledby="cs-gallery-title">
      <div className="cs-wrap">
        <div className="cs-gallery-head">
          <div><p className="cs-eyebrow">On site</p><h2 id="cs-gallery-title">Project gallery.</h2></div>
          <p>{count} {count === 1 ? 'photograph' : 'photographs'}. Select an image to view it in full.</p>
        </div>
        <ul className="cs-gallery-grid" data-testid="gallery-cs">
          {images.map((img, i) => (
            <li key={img._key}>
              <button type="button" className="cs-gallery-item" onClick={(event) => { returnFocus.current = event.currentTarget; setOpen(i); }} aria-label={`View image ${i + 1} of ${count}${img.alt ? `: ${img.alt}` : ''}`} data-testid={`button-cs-gallery-${i}`}>
                <img src={sanityImage(img.url, 900)} srcSet={sanitySrcSet(img.url, [480, 760, 1100])} sizes="(max-width: 760px) 100vw, 33vw" alt="" loading="lazy" />
                <span className="cs-gallery-expand" aria-hidden="true"><Expand size={15} /></span>
              </button>
              {img.caption && <p className="cs-gallery-caption"><span>{String(i + 1).padStart(2, '0')}</span>{img.caption}</p>}
            </li>
          ))}
        </ul>
      </div>

      <Dialog.Root open={open !== null} onOpenChange={(v) => { if (!v) setOpen(null); }}>
        <Dialog.Portal>
          <Dialog.Overlay className="cs-lightbox-overlay" />
          <Dialog.Content className="cs-lightbox" aria-describedby={undefined} onCloseAutoFocus={(event) => { event.preventDefault(); returnFocus.current?.focus(); }} onKeyDown={(e) => { if (count > 1 && e.key === 'ArrowRight') go(1); if (count > 1 && e.key === 'ArrowLeft') go(-1); }} data-testid="dialog-cs-lightbox">
            <Dialog.Title className="cs-sr">{current?.alt || `Project image ${open !== null ? open + 1 : ''}`}</Dialog.Title>
            <div className="cs-lightbox-bar">
              <span>{open !== null ? `${String(open + 1).padStart(2, '0')} / ${String(count).padStart(2, '0')}` : ''}</span>
              <Dialog.Close className="cs-lightbox-btn" aria-label="Close image" data-testid="button-cs-lightbox-close"><X size={20} /></Dialog.Close>
            </div>
            {current && (
              <figure className="cs-lightbox-figure">
                <img src={sanityImage(current.url, 2400)} alt={current.alt || ''} data-testid="img-cs-lightbox" />
                {current.caption && <figcaption>{current.caption}</figcaption>}
              </figure>
            )}
            {count > 1 && (
              <>
                <button type="button" className="cs-lightbox-btn cs-lightbox-prev" onClick={() => go(-1)} aria-label="Previous image" data-testid="button-cs-lightbox-prev"><ChevronLeft size={22} /></button>
                <button type="button" className="cs-lightbox-btn cs-lightbox-next" onClick={() => go(1)} aria-label="Next image" data-testid="button-cs-lightbox-next"><ChevronRight size={22} /></button>
              </>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </section>
  );
}
