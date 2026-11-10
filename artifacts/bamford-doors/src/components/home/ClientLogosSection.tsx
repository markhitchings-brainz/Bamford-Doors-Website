import { useCallback, useEffect, useRef, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './client-logos.css';

const clients = [
  ['barnet-homes', 'Barnet Homes'],
  ['east-suffolk', 'East Suffolk Council'],
  ['great-yarmouth', 'Great Yarmouth Borough Council'],
  ['hounslow', 'London Borough of Hounslow'],
  ['hyde', 'Hyde'],
  ['mtvh', 'Metropolitan Thames Valley Housing'],
  ['mhs', 'mhs homes group'],
  ['notting-hill-genesis', 'Notting Hill Genesis'],
  ['pa-housing', 'PA Housing'],
  ['richmond-housing', 'Richmond Housing Partnership'],
  ['sng', 'Sovereign Network Group'],
  ['southern-housing', 'Southern Housing'],
  ['transform', 'Transform Housing & Support'],
  ['vivid', 'VIVID'],
  ['welwyn-hatfield', 'Welwyn Hatfield Borough Council'],
  ['greensquare', 'GreenSquare'],
  ['homes-in-sedgemoor', 'Homes in Sedgemoor'],
  ['cornerstone', 'Cornerstone'],
  ['brighter-places', 'Brighter Places'],
  ['east-devon', 'East Devon District Council'],
  ['somerset-west-taunton', 'Somerset West and Taunton'],
  ['selwood-housing', 'Selwood Housing'],
  ['aster-group', 'Aster Group'],
  ['wiltshire-council', 'Wiltshire Council'],
  ['exeter-city-council', 'Exeter City Council'],
  ['livewest', 'LiveWest'],
] as const;

const pad = (n: number) => String(n).padStart(2, '0');

function scrollBehavior(): ScrollBehavior {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}

export function ClientLogosSection() {
  const trackRef = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(1);

  const update = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setAtStart(el.scrollLeft <= 2);
    setAtEnd(el.scrollLeft >= max - 2);
    setProgress(max > 0 ? el.scrollLeft / max : 1);
    const first = el.querySelector('li');
    const w = first ? first.getBoundingClientRect().width : 1;
    setVisible(Math.min(clients.length, Math.max(1, Math.round((el.scrollLeft + el.clientWidth) / (w + 1)))));
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    update();
    el.addEventListener('scroll', update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => { el.removeEventListener('scroll', update); ro.disconnect(); };
  }, [update]);

  const page = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.85, behavior: scrollBehavior() });
  };

  const onKey = (e: KeyboardEvent<HTMLUListElement>) => {
    const el = trackRef.current;
    if (!el) return;
    const step = (el.querySelector('li')?.getBoundingClientRect().width ?? 200);
    const b = scrollBehavior();
    if (e.key === 'ArrowRight') { e.preventDefault(); el.scrollBy({ left: step, behavior: b }); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); el.scrollBy({ left: -step, behavior: b }); }
    else if (e.key === 'Home') { e.preventDefault(); el.scrollTo({ left: 0, behavior: b }); }
    else if (e.key === 'End') { e.preventDefault(); el.scrollTo({ left: el.scrollWidth, behavior: b }); }
  };

  return (
    <section id="clients" className="home-clients" aria-labelledby="home-clients-title">
      <div className="rl-wrap">
        <header className="home-clients-heading">
          <div>
            <p className="rl-kicker">Trusted by</p>
            <h2 id="home-clients-title">Organisations that <em>rely on us.</em></h2>
          </div>
          <p>Housing providers, councils and public bodies across the UK who have chosen Bamford for their communal entrances.</p>
          <div className="home-clients-controls">
            <span className="home-clients-count" aria-hidden="true">{pad(visible)} <i /> {pad(clients.length)}</span>
            <button type="button" onClick={() => page(-1)} disabled={atStart} aria-label="Previous clients" aria-controls="home-clients-track" data-testid="button-clients-prev"><ArrowLeft size={17} /></button>
            <button type="button" onClick={() => page(1)} disabled={atEnd} aria-label="Next clients" aria-controls="home-clients-track" data-testid="button-clients-next"><ArrowRight size={17} /></button>
          </div>
        </header>

        <div className={`home-clients-frame${atStart ? '' : ' has-before'}${atEnd ? '' : ' has-after'}`}>
          <ul
            id="home-clients-track"
            ref={trackRef}
            className="home-clients-track"
            tabIndex={0}
            role="list"
            aria-label="Client logos, scroll horizontally or use arrow keys"
            onKeyDown={onKey}
            data-testid="list-client-logos"
          >
            {clients.map(([slug, name], i) => (
              <li key={slug} className="home-client" data-testid={`card-client-${slug}`}>
                <span className="home-client-index" aria-hidden="true">{pad(i + 1)}</span>
                <div className="home-client-logo">
                  <img src={`/media/clients/${slug}.webp`} alt={name} loading="lazy" decoding="async" draggable={false} />
                </div>
                <span className="home-client-name">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="home-clients-progress" aria-hidden="true"><span style={{ transform: `scaleX(${Math.max(0.08, progress)})` }} /></div>
      </div>
    </section>
  );
}
