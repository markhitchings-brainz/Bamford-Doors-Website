import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronRight, RotateCw } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import { applyPageSeo } from '@/lib/seo';
import { fetchPublishedCaseStudies, type CaseStudySummary } from '@/sanity/client';
import { CASE_STUDIES_SEO as SEO } from '@/sanity/caseStudySeo';
import { formatDate, sanityImage, sanitySrcSet } from './case-studies/shared';
import './case-studies/case-studies.css';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'ready'; items: CaseStudySummary[] };

export function CaseStudiesPage() {
  const [state, setState] = useState<State>({ status: 'loading' });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((a) => a + 1), []);

  useEffect(() => {
    let cancelled = false;
    setState({ status: 'loading' });
    applyPageSeo({ ...SEO, noindex: true });
    fetchPublishedCaseStudies()
      .then((items) => {
        if (cancelled) return;
        if (!Array.isArray(items)) throw new Error('Invalid case-study response');
        const list = items;
        setState({ status: 'ready', items: list });
        applyPageSeo({ ...SEO, noindex: list.length === 0 });
      })
      .catch(() => { if (!cancelled) setState({ status: 'error' }); });
    return () => { cancelled = true; };
  }, [attempt]);

  const items = state.status === 'ready' ? state.items : [];
  const [lead, ...rest] = items;

  return (
    <main className="cs-page" data-testid="page-case-studies">
      <section className="cs-hero" aria-labelledby="cs-title">
        <div className="cs-wrap">
          <nav className="cs-crumbs" aria-label="Breadcrumb">
            <Link href="/" data-testid="link-cs-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Case studies</span>
          </nav>
          <div className="cs-hero-grid">
            <div>
              <p className="cs-eyebrow">Bamford Doors / Project record</p>
              <EditablePageHeadline id="cs-title">Case<br /><span>studies.</span></EditablePageHeadline>
            </div>
            <div className="cs-hero-side">
              <p className="cs-hero-lead">Real entrances, from first brief to finished doorset. See what each building needed, how the entrance was resolved and what changed for the people using it.</p>
              <div className="cs-hero-meta" data-testid="text-cs-count">
                {state.status === 'ready' ? <span>{String(items.length).padStart(2, '0')} / Published projects</span> : <span>Projects / {state.status === 'error' ? 'Unavailable' : 'Loading'}</span>}
                <span>Brief / Solution / Outcome</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="cs-listing cs-wrap" aria-label="Case study list" aria-busy={state.status === 'loading'}>
        {state.status === 'loading' && (
          <div className="cs-grid" data-testid="status-cs-loading">
            {[0, 1, 2].map((i) => (
              <div key={i} className={`cs-card cs-skeleton ${i === 0 ? 'cs-card-lead' : ''}`} aria-hidden="true">
                <div className="cs-card-image" /><div className="cs-card-body"><i /><i /><i /></div>
              </div>
            ))}
            <span className="cs-sr">Loading case studies</span>
          </div>
        )}

        {state.status === 'error' && (
          <div className="cs-panel" role="alert" data-testid="status-cs-error">
            <p className="cs-eyebrow">Connection problem</p>
            <h2>We couldn’t load the case studies.</h2>
            <p>Check your connection and try again. If it keeps happening, our team can talk you through relevant projects directly.</p>
            <div className="cs-panel-actions">
              <button type="button" className="cs-button" onClick={retry} data-testid="button-cs-retry"><RotateCw size={15} aria-hidden="true" /> Try again</button>
              <Link className="cs-text-link" href="/contact" data-testid="link-cs-error-contact">Contact our team <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        )}

        {state.status === 'ready' && items.length === 0 && (
          <div className="cs-panel" data-testid="status-cs-empty">
            <p className="cs-eyebrow">Coming soon</p>
            <h2>Project write-ups are on their way.</h2>
            <p>We’re preparing detailed accounts of recent entrances. In the meantime, tell us about your building and we can discuss work similar to yours.</p>
            <div className="cs-panel-actions">
              <Link className="cs-button" href="/contact?purpose=consultation" data-testid="link-cs-empty-contact">Discuss your project <ArrowRight size={15} aria-hidden="true" /></Link>
              <Link className="cs-text-link" href="/products" data-testid="link-cs-empty-products">Explore products <ArrowRight size={14} aria-hidden="true" /></Link>
            </div>
          </div>
        )}

        {state.status === 'ready' && lead && (
          <div className="cs-grid" data-testid="list-case-studies">
            <CaseCard item={lead} index={0} featured />
            {rest.map((item, i) => <CaseCard key={item._id} item={item} index={i + 1} />)}
          </div>
        )}
      </section>

      <section className="cs-closing" aria-labelledby="cs-closing-title">
        <div className="cs-wrap cs-closing-inner">
          <div>
            <p className="cs-eyebrow">Your building next</p>
            <h2 id="cs-closing-title">Tell us about your entrance.</h2>
            <p>Share the building, the opening and how it’s used. We’ll help you plan the next step.</p>
          </div>
          <Link className="cs-button" href="/contact?purpose=consultation" data-testid="link-cs-closing-contact">Start an enquiry <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

function CaseCard({ item, index, featured = false }: { item: CaseStudySummary; index: number; featured?: boolean }) {
  const meta = [item.sector, item.location].filter(Boolean) as string[];
  const date = formatDate(item.completedAt);
  const img = item.mainImage?.url;
  return (
    <Link href={`/case-studies/${item.slug}`} className={`cs-card ${featured ? 'cs-card-lead' : ''}`} data-testid={`card-case-study-${item.slug}`}>
      <div className="cs-card-image">
        {img ? (
          <img src={sanityImage(img, featured ? 1400 : 900)} srcSet={sanitySrcSet(img, featured ? [700, 1100, 1600] : [480, 760, 1000])} sizes={featured ? '(max-width: 760px) 100vw, 60vw' : '(max-width: 760px) 100vw, 33vw'} alt={item.mainImage?.alt || ''} loading={featured ? 'eager' : 'lazy'} />
        ) : <div className="cs-card-noimage" aria-hidden="true"><span>Bamford Doors</span></div>}
        <span className="cs-card-index">{String(index + 1).padStart(2, '0')}{meta[0] ? ` / ${meta[0]}` : ''}</span>
      </div>
      <div className="cs-card-body">
        {(meta.length > 0 || date) && <p className="cs-card-meta">{[item.location, date].filter(Boolean).join(' · ')}</p>}
        <h2>{item.title}</h2>
        {item.excerpt && <p className="cs-card-excerpt">{item.excerpt}</p>}
        <span className="cs-card-link">Read the project <ArrowUpRight size={15} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
