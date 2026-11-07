import { ArrowDown, ArrowRight, Check, ChevronRight, Layers3, Paintbrush, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './wood-effect-doors.css';

const gallery = [
  {
    src: '/media/wood-effect/entrance-02.jpeg',
    alt: 'Woodgrain-effect entrance door fitted within a traditional arched brick opening',
    caption: 'A tailored fit for a distinctive opening',
    detail: 'ARCHED COMMUNAL ENTRANCE',
  },
  {
    src: '/media/wood-effect/entrance-03.jpeg',
    alt: 'Woodgrain-effect door and glazed side screens at a sheltered communal entrance',
    caption: 'Door and screen, considered together',
    detail: 'DOOR + SIDE SCREENS',
  },
  {
    src: '/media/wood-effect/entrance-04.jpeg',
    alt: 'Woodgrain-effect entrance doors with glazed panels and access hardware',
    caption: 'A consistent finish across the entrance',
    detail: 'GLAZING + ACCESS',
  },
  {
    src: '/media/wood-effect/entrance-05.jpeg',
    alt: 'Woodgrain-effect communal entrance with door, glazing and an access-control panel',
    caption: 'Made to complement the building',
    detail: 'RESIDENTIAL ENTRANCE',
  },
];

const benefits = [
  {
    icon: Paintbrush,
    title: 'A warm woodgrain appearance',
    text: 'A wood-effect finish brings a timber-inspired character to an aluminium entrance door.',
  },
  {
    icon: Layers3,
    title: 'A coated finish',
    text: 'A two-part powder-coated finish—not a vinyl wrap—gives your entrance its woodgrain appearance.',
  },
  {
    icon: Wrench,
    title: 'Less routine repainting',
    text: 'Choose a finish designed to avoid regular repainting. Ask us for care guidance suited to your building and conditions.',
  },
  {
    icon: ShieldCheck,
    title: 'Specified around the project',
    text: 'Discuss the door, screens, glazing, access and any applicable security or accessibility requirements together.',
  },
];

export function WoodEffectDoorsPage() {
  return (
    <main className="we-page" data-testid="page-wood-effect-doors">
      <section className="we-hero" aria-labelledby="we-title">
        <div className="we-wrap">
          <nav className="we-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-we-breadcrumb">
            <Link href="/" data-testid="link-we-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/products" data-testid="link-we-products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Wood effect doors</span>
          </nav>
          <div className="we-hero-grid">
            <div className="we-hero-copy">
              <p className="we-eyebrow">Bamford Doors / Aluminium entrance systems</p>
              <EditablePageHeadline id="we-title">Woodgrain character.<br /><span>Made for the entrance.</span></EditablePageHeadline>
              <p className="we-hero-lead">A timber-inspired finish for bespoke aluminium doors and screens, bringing a warmer look to shared entrances and public buildings.</p>
              <div className="we-actions">
                <Link className="we-button" href="/contact?purpose=product&product=Wood%20effect%20doors" data-testid="link-we-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
                <a className="we-text-action" href="#finish" data-testid="link-we-finish">Explore the finish <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="we-hero-meta"><span>01 / Wood-effect finish</span><span>Made around the building</span></div>
            </div>
            <figure className="we-hero-image">
              <ResponsiveImage src="/media/wood-effect/entrance-01.jpeg" alt="Woodgrain-effect aluminium communal entrance door with glazed panels and matching top lights" width="783" height="855" sizes="(max-width: 760px) 100vw, 50vw" fetchPriority="high" />
              <figcaption>Woodgrain finish / Bespoke entrance</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="we-intro we-wrap" id="finish" aria-labelledby="we-intro-title">
        <div className="we-intro-panel">
          <p className="we-eyebrow">Product overview</p>
          <h2 id="we-intro-title">The familiar character of timber. The flexibility of aluminium.</h2>
          <p>Give your communal entrance the warmth of timber with a wood-effect finish on a made-to-measure aluminium door and screen.</p>
          <p>The woodgrain finish uses a two-part powder-coating process—not a vinyl wrap. Talk to us about samples, colours, layout and the right specification for your building.</p>
          <Link href="/products/aluminium-modular-doors" className="we-inline-link" data-testid="link-we-modular">Explore aluminium modular doors <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <aside className="we-intro-side" aria-label="Key product considerations">
          <p className="we-eyebrow">A considered specification</p>
          <h2>Finish is only<br /><em>the beginning.</em></h2>
          <ul className="we-check-list">
            <li><Check size={16} aria-hidden="true" /><span>Door and screen arrangement</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Glazing, hardware and access</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Security and accessibility needs</span></li>
          </ul>
          <p className="we-side-note">Before you specify, ask us to confirm current approvals and test evidence for your exact door and screen configuration.</p>
        </aside>
      </section>

      <section className="we-benefits" aria-labelledby="we-benefits-title">
        <div className="we-wrap">
          <div className="we-section-head">
            <div><p className="we-eyebrow">Designed around the entrance</p><h2 id="we-benefits-title">A considered alternative to timber.</h2></div>
            <p>Tell us about your opening and we’ll help you consider the finish and details that suit your project.</p>
          </div>
          <div className="we-benefit-grid" data-testid="list-we-benefits">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <article className="we-benefit" key={benefit.title} data-testid={`card-we-benefit-${index + 1}`}>
                  <span className="we-benefit-index">0{index + 1}</span>
                  <Icon size={22} aria-hidden="true" />
                  <div><h3>{benefit.title}</h3><p>{benefit.text}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="we-gallery" aria-labelledby="we-gallery-title">
        <div className="we-wrap">
          <div className="we-gallery-head">
            <div><p className="we-eyebrow">In context</p><h2 id="we-gallery-title">Woodgrain, across<br />the entrance.</h2></div>
            <p>Examples of wood-effect door and screen arrangements across a range of building entrances.</p>
          </div>
          <div className="we-gallery-grid">
            {gallery.map((item, index) => (
              <figure className="we-gallery-card" key={item.src}>
                <div className="we-gallery-image"><ResponsiveImage src={item.src} alt={item.alt} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw" /></div>
                <figcaption><small>0{index + 2} / {item.detail}</small><strong>{item.caption}</strong></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="we-assurance" aria-labelledby="we-assurance-title">
        <div className="we-wrap we-assurance-grid">
          <div>
            <p className="we-eyebrow">Security and suitability</p>
            <h2 id="we-assurance-title">Check the details that matter.</h2>
          </div>
          <div className="we-assurance-copy">
            <p>Considering these doors for a project? Ask us to confirm whether Secured by Design approval and STS 202 BR2 test evidence apply to the exact configuration you are considering.</p>
            <p>Check accessibility, maintenance and whole-life cost against your building, chosen door set and intended use.</p>
            <a className="we-inline-link" href="https://bamforddoors.com/wood-effect-door/" target="_blank" rel="noopener noreferrer" data-testid="link-we-original">View the existing Bamford wood-effect page <ArrowRight size={15} aria-hidden="true" /></a>
          </div>
        </div>
      </section>

      <section className="we-closing" aria-labelledby="we-closing-title">
        <div className="we-wrap we-closing-inner">
          <div>
            <p className="we-eyebrow">Start with your building</p>
            <h2 id="we-closing-title">Let’s shape the right entrance.</h2>
            <p>Talk to Bamford about the opening, the finish you have in mind and the project requirements to consider.</p>
          </div>
          <Link className="we-button" href="/contact?purpose=product&product=Wood%20effect%20doors" data-testid="link-we-closing-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
