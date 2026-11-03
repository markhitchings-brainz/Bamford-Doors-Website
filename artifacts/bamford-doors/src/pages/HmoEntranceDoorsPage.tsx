import { ArrowDown, ArrowRight, Check, ChevronRight, DoorOpen, KeyRound, Ruler, ShieldCheck, Wrench } from 'lucide-react';
import { Link } from 'wouter';
import './hmo-entrance-doors.css';

const gallery = [
  {
    src: '/media/hmo/entrance-01.jpg',
    alt: 'Black raised-panel entrance door with a door closer and entry system at a shared residential building',
    caption: 'A traditional raised-panel style',
    detail: 'RESIDENTIAL ENTRANCE',
  },
  {
    src: '/media/hmo/entrance-02.jpg',
    alt: 'Blue-grey raised-panel door and glazed fanlight in a brick archway',
    caption: 'A door designed around the opening',
    detail: 'ARCHED BRICK OPENING',
  },
  {
    src: '/media/hmo/entrance-04.jpg',
    alt: 'Dark raised-panel entrance door with glazed upper panels and access control',
    caption: 'Glazing and entry details together',
    detail: 'DOOR + ACCESS',
  },
];

const considerations = [
  {
    icon: Ruler,
    title: 'Made for the opening',
    text: 'Plan the door, frame, fanlight and any side screens around the building’s existing entrance.',
  },
  {
    icon: KeyRound,
    title: 'Access that fits how you manage the property',
    text: 'Discuss door-entry integration, magnetic locking or key-operated options with the project team.',
  },
  {
    icon: DoorOpen,
    title: 'A choice of styles',
    text: 'Explore raised and fielded panels, glazing, door viewers and letterplates where they suit the design and specification.',
  },
  {
    icon: Wrench,
    title: 'Support over the life of the door',
    text: 'Bamford doors are designed and manufactured in Britain. Ask about maintenance, warranty terms and spare parts—which may be available for up to 20 years, depending on the product and specification.',
  },
];

export function HmoEntranceDoorsPage() {
  return (
    <main className="hmo-page" data-testid="page-hmo-entrance-doors">
      <section className="hmo-hero" aria-labelledby="hmo-title">
        <div className="hmo-wrap">
          <nav className="hmo-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-hmo-breadcrumb">
            <Link href="/" data-testid="link-hmo-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/products" data-testid="link-hmo-products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">HMO entrance doors</span>
          </nav>
          <div className="hmo-hero-grid">
            <div className="hmo-hero-copy">
              <p className="hmo-eyebrow">Bamford Doors / Shared residential entrances</p>
              <h1 id="hmo-title">HMO entrance<br /><span>doors.</span></h1>
              <p className="hmo-hero-lead">A made-to-measure entrance for shared living—planned around your building, residents and access requirements.</p>
              <div className="hmo-actions">
                <Link className="hmo-button" href="/contact?purpose=product&product=HMO%20entrance%20doors" data-testid="link-hmo-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
                <a className="hmo-text-action" href="#considerations" data-testid="link-hmo-considerations">Explore the options <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="hmo-hero-meta"><span>01 / Houses in multiple occupation</span><span>Designed around the entrance</span></div>
            </div>
            <figure className="hmo-hero-image">
              <img src="/media/hmo/entrance-03.jpg" alt="Dark blue-grey entrance door and glazed side panel set within a brick and stone arched opening" width="1158" height="1560" />
              <figcaption>Door + side panel / Shared entrance</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="hmo-intro hmo-wrap" aria-labelledby="hmo-intro-title">
        <div className="hmo-intro-panel">
          <p className="hmo-eyebrow">Shared living, considered</p>
          <h2 id="hmo-intro-title">An entrance that works for everyone who uses it.</h2>
          <p>A house in multiple occupation (HMO) is generally a home shared by people who are not all part of one household. Residents may share facilities such as a kitchen or bathroom.</p>
          <p>Definitions, licensing and safety requirements vary by location and property. Check the relevant local authority guidance for your building before planning an entrance upgrade.</p>
        </div>
        <aside className="hmo-intro-side" aria-label="Key HMO entrance requirements">
          <p className="hmo-eyebrow">Start with the building</p>
          <h2>Make the details<br /><em>work together.</em></h2>
          <ul className="hmo-check-list">
            <li><Check size={16} aria-hidden="true" /><span>How residents and visitors enter</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Door-entry and locking requirements</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Applicable fire safety and accessibility needs</span></li>
          </ul>
          <p className="hmo-side-note">Confirm that the complete doorset and access arrangement suit the property and its current requirements.</p>
        </aside>
      </section>

      <section className="hmo-considerations" id="considerations" aria-labelledby="hmo-considerations-title">
        <div className="hmo-wrap">
          <div className="hmo-section-head">
            <div><p className="hmo-eyebrow">A tailored entrance system</p><h2 id="hmo-considerations-title">The right choices,<br />for your property.</h2></div>
            <p>Tell us about the building and how the entrance is used. We can discuss door and screen layouts, finishes and access details for your project.</p>
          </div>
          <div className="hmo-consideration-grid" data-testid="list-hmo-considerations">
            {considerations.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="hmo-consideration" key={item.title} data-testid={`card-hmo-consideration-${index + 1}`}>
                  <span className="hmo-consideration-index">0{index + 1}</span>
                  <Icon size={22} aria-hidden="true" />
                  <div><h3>{item.title}</h3><p>{item.text}</p></div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="hmo-security" aria-labelledby="hmo-security-title">
        <div className="hmo-wrap hmo-security-grid">
          <div className="hmo-security-mark"><ShieldCheck size={25} aria-hidden="true" /><span>Security<br />by design</span></div>
          <div>
            <p className="hmo-eyebrow">Evidence and suitability</p>
            <h2 id="hmo-security-title">Check what applies to your exact doorset.</h2>
          </div>
          <p>Ask us to confirm current Secured by Design status and whether STS 202 or PAS 24 test evidence applies to the exact door, frame, glazing, hardware and access-control arrangement you are considering. Check fire safety, accessibility and local licensing requirements with the appropriate professionals and authorities.</p>
        </div>
      </section>

      <section className="hmo-gallery" aria-labelledby="hmo-gallery-title">
        <div className="hmo-wrap">
          <div className="hmo-gallery-head">
            <div><p className="hmo-eyebrow">In context</p><h2 id="hmo-gallery-title">Entrances for<br /><em>shared homes.</em></h2></div>
            <p>Examples of entrance doors and layouts. The right design and specification depend on the property and project.</p>
          </div>
          <div className="hmo-gallery-grid" data-testid="gallery-hmo-entrances">
            {gallery.map((item, index) => (
              <figure className="hmo-gallery-card" key={item.src}>
                <div className="hmo-gallery-image"><img src={item.src} alt={item.alt} /></div>
                <figcaption><small>0{index + 1} / {item.detail}</small><strong>{item.caption}</strong></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="hmo-closing" aria-labelledby="hmo-closing-title">
        <div className="hmo-wrap hmo-closing-inner">
          <div>
            <p className="hmo-eyebrow">Plan your entrance</p>
            <h2 id="hmo-closing-title">Tell us about your HMO.</h2>
            <p>Share the opening, building and access requirements. We’ll help you discuss a door and entrance arrangement for the project.</p>
          </div>
          <Link className="hmo-button" href="/contact?purpose=product&product=HMO%20entrance%20doors" data-testid="link-hmo-closing-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
