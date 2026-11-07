import { ArrowDown, ArrowRight, Check, ChevronRight, CircleHelp, Scale, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import './aluminium-vs-steel.css';

const materialPoints = [
  {
    number: '01',
    title: 'Corrosion & maintenance',
    aluminium: 'Aluminium naturally forms a thin oxide layer that helps resist corrosion. A decorative finish may still be chosen, but it is not always needed for corrosion prevention.',
    steel: 'Steel’s susceptibility to corrosion depends on its type, coating, finish and exposure. If moisture reaches unprotected steel, corrosion can develop and may spread beneath a coating.',
    note: 'For exposed or persistently damp locations, consider the details, finish and maintenance plan—not just the material name.',
  },
  {
    number: '02',
    title: 'Strength & security',
    aluminium: 'A well-designed aluminium door can provide a robust entrance. The material alone does not determine how a complete door performs.',
    steel: 'Steel is often associated with strength, but a well-designed aluminium door can also be strong and resistant to attack.',
    note: 'Assess the complete door set: leaf, frame, glazing, hardware, fixings and installation, against the project’s requirements.',
  },
  {
    number: '03',
    title: 'Weight & operation',
    aluminium: 'Typically lighter than a comparable steel door, which can make manual operation and hardware selection easier to manage.',
    steel: 'Often heavier than aluminium. Added weight can influence operating effort and place greater demands on hinges and other hardware.',
    note: 'Check the proposed door’s actual weight, operator or manual use, hinge capacity and current accessibility requirements.',
  },
  {
    number: '04',
    title: 'Cost',
    aluminium: 'Can be cost-effective, particularly where a project benefits from the flexibility of aluminium sections or a side screen.',
    steel: 'Cost varies with the door design, finish, configuration and project requirements. A like-for-like specification is essential.',
    note: 'Compare whole-door quotations for the same opening, performance needs, finishes, hardware and installation scope.',
  },
  {
    number: '05',
    title: 'Appearance',
    aluminium: 'Extruded sections can support a range of profiles and configurations, including options that feel less institutional in a residential setting.',
    steel: 'Steel can offer a distinctive, substantial appearance. The visible character depends on the chosen construction and finish.',
    note: 'Consider how the entrance will sit within the building and what residents, staff and visitors will see and use every day.',
  },
  {
    number: '06',
    title: 'Environmental considerations',
    aluminium: 'Recyclable, with environmental impact influenced by how it is produced, its recycled content, service life and recovery route.',
    steel: 'Also recyclable. Corroded steel can be more difficult to recover effectively, but outcomes depend on condition and local recovery processes.',
    note: 'Compare the specified material’s production, recycled content, expected service life, maintenance and end-of-life recovery.',
  },
];

const photos = {
  portcullis: '/media/aluminium-vs-steel/steel-portcullis-corrosion.jpg',
  window: '/media/aluminium-vs-steel/steel-door-window.jpg',
  frame: '/media/aluminium-vs-steel/corroded-steel-frame.jpg',
  complete: '/media/aluminium-vs-steel/complete-steel-door.jpg',
  stainless: '/media/aluminium-vs-steel/stainless-steel-door.jpg',
};

function SteelPhoto({
  src,
  alt,
  caption,
  className = '',
  width,
  height,
}: {
  src: string;
  alt: string;
  caption: string;
  className?: string;
  width: number;
  height: number;
}) {
  return (
    <figure className={`avs-photo ${className}`} data-testid={`figure-${caption.toLowerCase().replaceAll(' ', '-')}`}>
      <div className="avs-photo-image">
        <img src={src} alt={alt} width={width} height={height} loading="lazy" />
      </div>
      <figcaption>{caption}<span>Steel example</span></figcaption>
    </figure>
  );
}

export function AluminiumVsSteelPage() {
  return (
    <main className="avs-page" data-testid="page-aluminium-versus-steel">
      <section className="avs-hero">
        <div className="avs-wrap">
          <nav className="avs-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-breadcrumb">
            <Link href="/" data-testid="link-breadcrumb-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about" data-testid="link-breadcrumb-about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Aluminium versus steel</span>
          </nav>
          <div className="avs-hero-grid">
            <div className="avs-hero-copy">
              <p className="avs-eyebrow">A practical guide for building teams</p>
              <EditablePageHeadline>Aluminium<br /><span>versus</span> steel.</EditablePageHeadline>
              <p className="avs-hero-lead">
                Two useful materials. Different considerations. A clear way to weigh them for your entrance.
              </p>
              <a className="avs-scroll-link" href="#comparison" data-testid="link-explore-comparison">
                Explore the comparison <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <aside className="avs-hero-aside" aria-label="A note on material choice">
              <span className="avs-aside-number">A considered choice</span>
              <p>Material is one part of the specification. The opening, complete door design, exposure and day-to-day use all matter.</p>
              <span className="avs-aside-rule" />
              <span className="avs-aside-caption">Bamford Doors · Project guidance</span>
            </aside>
          </div>
          <div className="avs-hero-footer">
            <span>01 / Material guide</span>
            <span>For housing, education & public buildings</span>
          </div>
        </div>
      </section>

      <section className="avs-intro avs-wrap" aria-labelledby="avs-intro-title">
        <div className="avs-intro-heading">
          <p className="avs-eyebrow">Start with the project</p>
          <h2 id="avs-intro-title">There isn’t one right answer for every entrance.</h2>
        </div>
        <div className="avs-intro-copy">
          <p className="avs-intro-emphasis">
            The best material is the one that suits the building, the people using it and the specification it needs to meet.
          </p>
          <p>
            Aluminium and steel each bring different practical considerations. Corrosion resistance, door weight, operating effort, appearance and whole-project cost can all influence a decision. And strength or security is never a question of material alone: it depends on the complete door set and how it is designed and installed.
          </p>
          <p>
            Use this guide to frame the conversation. Then check the proposed door, hardware, finish and maintenance approach against the actual opening and site conditions.
          </p>
          <div className="avs-intro-callout">
            <ShieldCheck size={19} aria-hidden="true" />
            <span>Evidence-led specification starts with the complete entrance—not a material in isolation.</span>
          </div>
        </div>
      </section>

      <section className="avs-comparison" id="comparison" aria-labelledby="avs-comparison-title">
        <div className="avs-wrap">
          <div className="avs-section-head">
            <div>
              <p className="avs-eyebrow">The trade-offs, side by side</p>
              <h2 id="avs-comparison-title">What to weigh up.</h2>
            </div>
            <p>Use these points as prompts for the project brief. The detail of the product and site can change the balance.</p>
          </div>
          <div className="avs-material-head" aria-hidden="true">
            <span>Consideration</span>
            <span>Aluminium</span>
            <span>Steel</span>
          </div>
          <div className="avs-rows">
            {materialPoints.map((point) => (
              <article className="avs-row" key={point.number} data-testid={`comparison-${point.number}`}>
                <div className="avs-row-title">
                  <span>{point.number}</span>
                  <h3>{point.title}</h3>
                </div>
                <p className="avs-material-copy"><span className="avs-mobile-label">Aluminium</span>{point.aluminium}</p>
                <p className="avs-material-copy avs-steel-copy"><span className="avs-mobile-label">Steel</span>{point.steel}</p>
                <div className="avs-row-note"><CircleHelp size={15} aria-hidden="true" /><p>{point.note}</p></div>
              </article>
            ))}
          </div>
          <p className="avs-comparison-footnote"><Scale size={16} aria-hidden="true" /> These are general considerations, not a substitute for checking the project specification.</p>
        </div>
      </section>

      <section className="avs-corrosion" aria-labelledby="avs-corrosion-title">
        <div className="avs-wrap avs-corrosion-grid">
          <div className="avs-corrosion-copy">
            <p className="avs-eyebrow">Exposure changes the conversation</p>
            <h2 id="avs-corrosion-title">Moisture, finish and maintenance belong together.</h2>
            <p>
              Steel may corrode where moisture reaches exposed metal. How likely that is—and how it can be managed—depends on the steel type, protective coating or finish, workmanship, damage and the exposure around the entrance. Once corrosion develops beneath a coating, the affected area may need attention.
            </p>
            <p>
              Aluminium forms a naturally protective oxide layer when exposed to air. Its surface finish may be selected for appearance or other project reasons; it is not always required to prevent corrosion. In either case, detail the door for its setting and plan for inspection and care.
            </p>
            <div className="avs-detail-list">
              <div><Check size={14} aria-hidden="true" /><span>Identify persistent wetting, coastal exposure and vulnerable interfaces.</span></div>
              <div><Check size={14} aria-hidden="true" /><span>Specify suitable materials, finishes and compatible details.</span></div>
              <div><Check size={14} aria-hidden="true" /><span>Include access for inspection and a realistic maintenance plan.</span></div>
            </div>
          </div>
          <div className="avs-corrosion-photos">
            <SteelPhoto
              src={photos.portcullis}
              alt="Close view of corrosion along the lower edge of a steel portcullis door leaf"
              caption="Moisture at a lower edge"
              width={316}
              height={120}
              className="avs-photo-wide"
            />
            <SteelPhoto
              src={photos.frame}
              alt="Severely corroded section of a steel door frame"
              caption="Corroded steel frame"
              width={240}
              height={310}
            />
            <SteelPhoto
              src={photos.window}
              alt="Blue painted steel door leaf with a glazed viewing window"
              caption="Steel door leaf window"
              width={300}
              height={390}
            />
            <p className="avs-photo-note">Archive brochure photographs show steel door examples only; they are not representations of aluminium products.</p>
          </div>
        </div>
      </section>

      <section className="avs-weight" aria-labelledby="avs-weight-title">
        <div className="avs-wrap avs-weight-inner">
          <div className="avs-weight-heading">
            <p className="avs-eyebrow">The everyday test</p>
            <h2 id="avs-weight-title">A door has to work for the people who use it.</h2>
            <p>Weight affects more than lifting and installation. It can influence manual operating effort, hinges, hardware and the long-term demands on the whole assembly.</p>
          </div>
          <div className="avs-weight-steps">
            <div><span>01</span><p><strong>Establish the actual door weight.</strong> Configuration, glazing, dimensions and hardware all affect the finished assembly.</p></div>
            <div><span>02</span><p><strong>Consider the user and mode of operation.</strong> Manual use, an operator and the pattern of daily traffic should inform the design.</p></div>
            <div><span>03</span><p><strong>Check the full specification.</strong> Confirm hinges, fixings and operating effort against current accessibility requirements and project needs.</p></div>
          </div>
          <div className="avs-weight-note"><strong>Important</strong><span>Do not rely on an old threshold or a material comparison alone to establish accessibility compliance.</span></div>
        </div>
      </section>

      <section className="avs-stainless" aria-labelledby="avs-stainless-title">
        <div className="avs-wrap avs-stainless-grid">
          <div className="avs-stainless-copy">
            <p className="avs-eyebrow">A separate consideration</p>
            <h2 id="avs-stainless-title">What about stainless steel?</h2>
            <p>
              Stainless steel can help address some corrosion concerns, but it is not rust-proof in every condition. Suitability depends on the grade, environment, detailing and maintenance. In marine environments, an appropriate grade such as 316 may be required; confirm the grade with the project specifier.
            </p>
            <p>
              Stainless steel can also bring greater weight and a different appearance and cost profile. Compare a complete, specified door set rather than assuming it is a direct substitute for another steel or aluminium option.
            </p>
            <div className="avs-stainless-marker"><span>Specify for the exposure</span><i aria-hidden="true" /></div>
          </div>
          <SteelPhoto
            src={photos.stainless}
            alt="Steel door and frame shown in an archive brochure photograph"
            caption="Door and frame example"
            width={650}
            height={278}
            className="avs-stainless-photo"
          />
        </div>
      </section>

      <section className="avs-example" aria-labelledby="avs-example-title">
        <div className="avs-wrap avs-example-grid">
          <SteelPhoto
            src={photos.complete}
            alt="Complete steel entrance door set with glazed panels installed in a masonry opening"
            caption="Complete steel door set"
            width={610}
            height={656}
            className="avs-example-photo"
          />
          <div className="avs-example-copy">
            <p className="avs-eyebrow">See the whole entrance</p>
            <h2 id="avs-example-title">The frame, leaf and details make the door.</h2>
            <p>
              A material comparison is a useful starting point, but a specification needs to describe the complete entrance: the frame and leaf, glazing where present, hardware, finish, interfaces with the building and how the door will be operated.
            </p>
            <p>
              Ask for proposals that reflect the same opening and project requirements. That makes it easier to compare what is included and identify where the options differ.
            </p>
            <Link href="/products" className="avs-text-link" data-testid="link-explore-products">
              Explore door options <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="avs-spec" aria-labelledby="avs-spec-title">
        <div className="avs-wrap avs-spec-grid">
          <div>
            <p className="avs-eyebrow">Before you decide</p>
            <h2 id="avs-spec-title">A short brief makes a better comparison.</h2>
            <p className="avs-spec-lead">Bring these project details into the conversation so the material choice can be tested against the building.</p>
          </div>
          <ol className="avs-checklist">
            <li><span>01</span><div><strong>Location & exposure</strong><p>Is the entrance sheltered, frequently wet, near the coast or exposed to damaging conditions?</p></div></li>
            <li><span>02</span><div><strong>Opening & configuration</strong><p>What are the opening dimensions, side screens, glazing and other door-set requirements?</p></div></li>
            <li><span>03</span><div><strong>People & operation</strong><p>Who uses the entrance, how often, and how will operating effort and accessibility be assessed?</p></div></li>
            <li><span>04</span><div><strong>Whole-life expectations</strong><p>What finish, inspection, maintenance, budget and recovery considerations belong in the brief?</p></div></li>
          </ol>
        </div>
      </section>

      <section className="avs-closing">
        <div className="avs-wrap avs-closing-inner">
          <div className="avs-closing-copy">
            <p className="avs-eyebrow">Discuss the project, not just the material</p>
            <h2>Bring us the opening and the requirements.</h2>
            <p>We can help you frame the next conversation around the building, the door set and the intended use.</p>
            <p className="avs-project-note">Project-specific material choice should always be verified against the building conditions and the full specification.</p>
          </div>
          <Link href="/contact?purpose=consultation" className="avs-contact-button" data-testid="link-material-consultation">
            Talk through your project <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
