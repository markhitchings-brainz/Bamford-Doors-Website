import { ArrowRight, MoveUpRight } from 'lucide-react';
import { Link } from 'wouter';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './sectorsOverview.css';

type SectorLink = { slug: string; title: string; summary: string };

const audiences = [
  { id: 'housing', label: 'Homes & shared residential', heading: 'Where people live.', note: 'Shared entrances used every day by residents and visitors.', image: '/media/stock-condition-surveys/housing-estate-aerial-wide.jpg', alt: 'Aerial view of a residential housing estate', slugs: ['housing-associations', 'social-housing', 'apartment-blocks', 'hmos', 'student-accommodation'] },
  { id: 'public', label: 'Councils & the public sector', heading: 'Buildings that serve the public.', note: 'Public-facing entrances shaped by the building and how it operates.', image: '/media/stock-condition-surveys/communal-entrance-exterior.jpg', alt: 'Exterior of a communal building entrance', slugs: ['local-authorities', 'public-government-buildings', 'public-commercial-buildings'] },
  { id: 'care', label: 'Education & healthcare', heading: 'Entrances for learning and care.', note: 'Settings where the way an entrance is used matters as much as the door.', image: '/media/automatic-operators-entrance.jpg', alt: 'Glazed entrance with an automatic door operator', slugs: ['schools', 'education', 'healthcare'] },
  { id: 'commercial', label: 'Commercial property', heading: 'Entrances at work.', note: 'Door and screen requirements discussed around the building and its use.', image: '/media/screens-curtain-walling.jpg', alt: 'Aluminium entrance screen and curtain walling', slugs: ['commercial-property'] },
];

export function SectorsOverviewPage({ sectors }: { sectors: SectorLink[] }) {
  const used = new Set(audiences.flatMap((a) => a.slugs));
  const groups = audiences.map((a) => ({ ...a, items: a.slugs.map((s) => sectors.find((x) => x.slug === s)).filter((x): x is SectorLink => Boolean(x)) }));
  const rest = sectors.filter((s) => !used.has(s.slug));
  if (rest.length) groups.push({ id: 'other', label: 'Other sectors', heading: 'Other buildings.', note: 'More building types we can discuss.', image: '/media/factory-hero-poster.jpg', alt: 'Bamford workshop production line', slugs: [], items: rest });
  const visible = groups.filter((g) => g.items.length);
  const indexOf = (slug: string) => String(sectors.findIndex((s) => s.slug === slug) + 1).padStart(2, '0');

  return (
    <main className="main sectors-redesign">
      <section className="sr-hero">
        <div className="sr-hero-copy">
          <p className="eyebrow"><span className="sr-mark" /> Sectors</p>
          <h1>Every building<br />has its <em>people.</em></h1>
          <p className="sr-hero-lead">Bamford serves local authorities, housing associations, schools and other public-sector buildings nationally. Find the information shaped around yours.</p>
          <nav className="sr-jump" aria-label="Jump to audience">
            {visible.map((g, i) => (
              <a key={g.id} href={`#sr-${g.id}`} data-testid={`link-jump-${g.id}`}><span>0{i + 1}</span>{g.label}<ArrowRight size={13} /></a>
            ))}
          </nav>
        </div>
        <div className="sr-hero-image">
          <ResponsiveImage src="/media/stock-condition-surveys/high-rise-residential-block.webp" alt="High-rise residential block seen from street level" sizes="(max-width: 760px) 100vw, 46vw" fetchPriority="high" />
          <span className="sr-hero-count"><strong>{sectors.length}</strong> sectors<br />one starting point: the building</span>
        </div>
      </section>

      <section className="sr-strip" aria-label="Approach">
        <div className="wrap sr-strip-inner">
          <span>Designed</span><i /><span>Manufactured</span><i /><span>Installed</span>
          <p>Custom-made, vandal-resistant security doors and screens from Stockport.</p>
        </div>
      </section>

      {visible.map((g, gi) => (
        <section className={`sr-group ${gi % 2 ? 'sr-flip' : ''}`} id={`sr-${g.id}`} key={g.id} aria-labelledby={`sr-h-${g.id}`}>
          <div className="wrap sr-group-grid">
            <figure className="sr-group-image">
              <ResponsiveImage src={g.image} alt={g.alt} loading="lazy" sizes="(max-width: 760px) 100vw, 42vw" />
              <figcaption><span>0{gi + 1} / {g.label}</span>Illustrative photograph</figcaption>
            </figure>
            <div className="sr-group-body">
              <p className="eyebrow">{g.label}</p>
              <h2 id={`sr-h-${g.id}`}>{g.heading}</h2>
              <p className="sr-group-note">{g.note}</p>
              <div className="sr-list">
                {g.items.map((s) => (
                  <Link className="sr-link" href={`/sectors/${s.slug}`} key={s.slug} data-testid={`card-sector-${s.slug}`}>
                    <span className="sr-num">{indexOf(s.slug)}</span>
                    <span className="sr-copy"><strong>{s.title}</strong><small>{s.summary}</small></span>
                    <MoveUpRight size={18} className="sr-arrow" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      ))}

      <section className="sr-survey">
        <div className="wrap sr-survey-grid">
          <div className="sr-survey-image">
            <ResponsiveImage src="/media/stock-condition-surveys/housing-estate-aerial-close.jpg" alt="Close aerial view of residential blocks and their entrances" loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
          </div>
          <div>
            <p className="eyebrow">Not sure where to begin?</p>
            <h2>Start with what is already there.</h2>
            <p>Bamford Doors provides a free stock condition survey to give you a clearer picture of your communal door sets, door entry and access systems.</p>
            <Link className="sr-text-link" href="/services/stock-condition-surveys" data-testid="link-sectors-survey">About stock condition surveys <MoveUpRight size={15} /></Link>
          </div>
        </div>
      </section>

      <section className="sr-contact">
        <div className="wrap sr-contact-inner">
          <div>
            <p className="eyebrow">Talk to Bamford</p>
            <h2>Tell us about your building.</h2>
            <p>Tell us about your building, entrance or project and our team can help with the next step.</p>
          </div>
          <Link href="/contact" className="button" data-testid="link-contact-cta">Contact our team <ArrowRight size={16} /></Link>
        </div>
      </section>
    </main>
  );
}
