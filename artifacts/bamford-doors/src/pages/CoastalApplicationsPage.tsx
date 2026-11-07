import { ArrowDown, ArrowRight, ChevronRight, Droplets, KeyRound, Layers, Palette, PanelTop, Ruler, ShieldCheck, Waves, Wind } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import './coastal-applications.css';

const materials = [
  {
    key: 'steel',
    icon: Droplets,
    title: 'Steel',
    text: 'Salt-laden air and persistent moisture can accelerate corrosion where they reach steel through damaged coatings, edges, fixings or poorly drained details. Stainless steel performs better in many conditions, but it is not immune; grade, detailing and cleaning all matter near the coast.',
  },
  {
    key: 'timber',
    icon: Wind,
    title: 'Timber',
    text: 'Wind-driven rain, salt and repeated wetting and drying can speed up deterioration of timber and its finish. Coastal timber doors typically need a careful finish specification and a disciplined maintenance cycle.',
  },
  {
    key: 'aluminium',
    icon: Waves,
    title: 'Aluminium',
    text: 'Aluminium forms a natural oxide layer that helps it resist corrosion, which can make it a sensible option for coastal communal doors. It is not maintenance-free: finish selection, compatible fixings, drainage and periodic cleaning still need to be planned.',
  },
];

const options = [
  { icon: Layers, title: 'Engineered aluminium', text: 'Purpose-designed aluminium sections for communal entrances, rather than a lightweight shopfront system. Bespoke to the opening.' },
  { icon: Palette, title: 'Finish and colour', text: 'Silver anodised or powder-coated finishes, including woodgrain effect, with BS or RAL colours subject to product availability.' },
  { icon: PanelTop, title: 'Glazing', text: 'Different glazing types and configurations can be considered for visibility, privacy and the character of the entrance.' },
  { icon: KeyRound, title: 'Access and locking', text: 'Door access control can be integrated with mechanical or electromagnetic locking, as suits the project specification.' },
];

const checklist = [
  ['Define the exposure', 'How close is the site to the sea? Is the entrance sheltered, facing prevailing wind, or regularly wetted by spray or driven rain?'],
  ['Specify the finish for the setting', 'Agree the finish type, colour and any coastal-specific finish requirements with the supplier, and record them in the specification.'],
  ['Check interfaces and fixings', 'Review fixings, hardware, thresholds and drainage for compatibility and resistance in the exposure conditions.'],
  ['Plan inspection and cleaning', 'Set a realistic cleaning and inspection routine for the finish and hardware. Coastal deposits should not be left to build up.'],
  ['Confirm access and accessibility', 'Check operating effort, threshold and access control for the complete doorset against current project accessibility requirements.'],
  ['Confirm evidence and terms', 'Ask for product-specific test, certification and warranty information for the selected doorset, and confirm what conditions apply in coastal locations.'],
];

export function CoastalApplicationsPage() {
  return (
    <main className="coastal-page" data-testid="page-coastal-applications">
      <section className="co-hero" aria-labelledby="co-page-title">
        <div className="co-hero-lines" aria-hidden="true" />
        <div className="co-wrap">
          <nav className="co-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-coastal-breadcrumb">
            <Link href="/" data-testid="link-coastal-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about" data-testid="link-coastal-about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Coastal applications</span>
          </nav>
          <div className="co-hero-grid">
            <div className="co-reveal">
              <p className="co-eyebrow">A project guide · Coastal properties</p>
              <EditablePageHeadline id="co-page-title">For coastal<br /><span>entrances.</span></EditablePageHeadline>
              <p className="co-hero-lead">Coastal exposure changes how an entrance ages. Specify the material, finish and details for the place it stands.</p>
              <a className="co-scroll-link" href="#exposure" data-testid="link-explore-coastal">
                Why exposure matters <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <figure className="co-hero-figure co-reveal co-reveal-2">
              <img src="/media/coastal-applications/coastal-communal-entrance.jpg" alt="Anthracite powder-coated aluminium communal entrance with glazed screen and door, set in a brick and render facade." width="347" height="330" />
              <figcaption>Aluminium door and screen</figcaption>
            </figure>
          </div>
          <div className="co-hero-footer">
            <span>01 / Coastal applications</span>
            <span>For housing providers, councils & public buildings</span>
          </div>
        </div>
      </section>

      <section className="co-intro co-wrap" aria-labelledby="co-intro-title">
        <div>
          <p className="co-eyebrow">Start with the location</p>
          <h2 id="co-intro-title">The coast is a demanding neighbour.</h2>
        </div>
        <div className="co-intro-copy">
          <p className="co-emphasis">Sea air carries salt that settles on surfaces and holds moisture against them. Combined with wind-driven rain, that can shorten the life of an unsuitable door.</p>
          <p>For communal entrances on coastal estates, seafront blocks and public buildings, the choice of material and finish affects how the door looks, how it operates and how much attention it needs over time.</p>
          <p>Exposure varies a great deal, even on the same street. Describe the actual site conditions early so the specification can respond to them.</p>
          <div className="co-callout">
            <ShieldCheck size={19} aria-hidden="true" />
            <span>Use this guide to frame the brief. Confirm performance, finish and terms for the selected product and site.</span>
          </div>
        </div>
      </section>

      <section className="co-exposure" id="exposure" aria-labelledby="co-exposure-title">
        <div className="co-wrap">
          <div className="co-section-head">
            <div>
              <p className="co-eyebrow">What material should be used?</p>
              <h2 id="co-exposure-title">Three materials. One harsh setting.</h2>
            </div>
            <p>How each material responds depends on its grade, finish, detailing and maintenance, as well as the exposure itself.</p>
          </div>
          <div className="co-material-grid" data-testid="list-coastal-materials">
            {materials.map((m, i) => {
              const Icon = m.icon;
              return (
                <article key={m.key} className={`co-material co-material-${m.key}`} data-testid={`card-material-${m.key}`}>
                  <header><span>0{i + 1}</span><Icon size={20} aria-hidden="true" /></header>
                  <h3>{m.title}</h3>
                  <p>{m.text}</p>
                </article>
              );
            })}
          </div>
          <p className="co-exposure-note">Aluminium is typically lighter than comparable steel or timber doors, and its extruded sections allow flexible designs. Cost depends on the full specification; compare like-for-like quotations. <Link href="/about/aluminium-versus-steel" data-testid="link-coastal-avs">Read aluminium versus steel</Link>.</p>
        </div>
      </section>

      <section className="co-gallery-section" aria-labelledby="co-gallery-title">
        <div className="co-wrap">
          <div className="co-section-head">
            <div>
              <p className="co-eyebrow">Aluminium entrance examples</p>
              <h2 id="co-gallery-title">Different finishes. Same discipline.</h2>
            </div>
              <p>Brochure examples of aluminium entrance configurations in blue, anthracite and woodgrain-effect finishes.</p>
          </div>
          <div className="co-gallery" data-testid="gallery-coastal-examples">
            <figure className="co-photo" data-testid="figure-blue-entrance">
              <div className="co-photo-image"><img src="/media/coastal-applications/blue-entrance.jpg" alt="Blue aluminium entrance with full-height glazing, fanlight and side screen." width="176" height="330" loading="eager" /></div>
              <figcaption>01 / Blue entrance with side screen<small>Door, fanlight and screen</small></figcaption>
            </figure>
            <figure className="co-photo co-photo-wide" data-testid="figure-communal-entrance">
              <div className="co-photo-image"><img src="/media/coastal-applications/coastal-communal-entrance.jpg" alt="Anthracite aluminium communal entrance with glazed screen, solid lower panels and a glazed door leaf." width="347" height="330" loading="eager" /></div>
              <figcaption>02 / Anthracite communal entrance<small>Door and screen composition</small></figcaption>
            </figure>
            <figure className="co-photo" data-testid="figure-woodgrain-door">
              <div className="co-photo-image"><img src="/media/coastal-applications/woodgrain-door.jpg" alt="Woodgrain-effect aluminium door with vertical glazed bars in a brick opening." width="172" height="330" loading="eager" /></div>
              <figcaption>03 / Woodgrain-effect finish<small>Individual entrance example</small></figcaption>
            </figure>
          </div>
          <p className="co-gallery-note">Images illustrate possible appearance only. They are not evidence of performance, certification or suitability for a particular coastal site.</p>
        </div>
      </section>

      <section className="co-options-section" aria-labelledby="co-options-title">
        <div className="co-wrap co-options-grid">
          <div>
            <p className="co-eyebrow">Why a Bamford aluminium door?</p>
            <h2 id="co-options-title">Bespoke to the opening and the exposure.</h2>
            <p>Each entrance is designed and manufactured around the building. Agree appearance, hardware and finish together as one coordinated doorset.</p>
          </div>
          <div className="co-options" data-testid="list-coastal-options">
            {options.map((o, i) => {
              const Icon = o.icon;
              return (
                <article className="co-option" key={o.title} data-testid={`card-option-${i + 1}`}>
                  <Icon size={20} aria-hidden="true" />
                  <h3>{o.title}</h3>
                  <p>{o.text}</p>
                </article>
              );
            })}
            <aside className="co-qualify" data-testid="note-coastal-qualification">
              <span>Product and project specific</span>
              <p>Warranty terms, accessibility performance, test evidence and Secured by Design / Police Preferred Specification status depend on the selected product and configuration. Ask the team to confirm what applies to your project before specifying.</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="co-check-section" aria-labelledby="co-check-title">
        <div className="co-wrap co-check-grid">
          <div>
            <p className="co-eyebrow">Specification checklist</p>
            <h2 id="co-check-title">Six questions for a coastal brief.</h2>
            <p className="co-check-lead">Work through these with your project team and supplier. Each one should be answered for the actual site and doorset.</p>
            <div className="co-callout" style={{ marginTop: 28 }}>
              <Ruler size={18} aria-hidden="true" />
              <span>Record the agreed answers in the specification.</span>
            </div>
          </div>
          <ol className="co-checklist" data-testid="list-coastal-checklist">
            {checklist.map(([title, text], i) => (
              <li key={title} data-testid={`checklist-item-${i + 1}`}>
                <span>0{i + 1}</span>
                <div><strong>{title}</strong><p>{text}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="co-closing" aria-labelledby="co-closing-title">
        <div className="co-wrap co-closing-inner">
          <div>
            <p className="co-eyebrow">A clear next step</p>
            <h2 id="co-closing-title">Tell us where the entrance stands.</h2>
            <p>Share the site location, exposure and how the entrance is used. Bamford can help you explore a suitable aluminium specification and confirm the product-specific details.</p>
          </div>
          <div className="co-closing-actions">
            <Link href="/contact?purpose=consultation" className="co-button" data-testid="link-coastal-consultation">
              Discuss your coastal project <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/products/aluminium-modular-doors" className="co-button co-button-ghost" data-testid="link-coastal-products">
              Aluminium modular doors <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
