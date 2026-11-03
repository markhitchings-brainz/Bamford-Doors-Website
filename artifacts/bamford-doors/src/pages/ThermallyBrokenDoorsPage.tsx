import { ArrowDown, ArrowRight, Check, ChevronRight, Layers3, ShieldCheck, Thermometer } from 'lucide-react';
import { Link } from 'wouter';
import './thermally-broken-doors.css';

const testing = [
  {
    label: 'Independent testing',
    value: 'BS EN ISO 10077-1:2006',
    detail: 'The door and screen were independently tested in accordance with this standard.',
  },
  {
    label: 'L2A reference value',
    value: 'U-value 3.5',
    detail: 'The reference value for high-use entrance doors cited in the test information.',
  },
  {
    label: 'Tested sample',
    value: '1230 × 2180 mm',
    detail: 'With a thermally unbroken sill, this sample achieved a U-value of 2.1.',
  },
];

const considerations = [
  {
    icon: ShieldCheck,
    title: 'Security-led modular design',
    text: 'Based on Bamford’s Secure by Design modular door set, with the entrance arrangement planned around the building.',
  },
  {
    icon: Thermometer,
    title: 'Thermal performance',
    text: 'Thermally broken profiles and sill options can be considered as part of the door and screen specification.',
  },
  {
    icon: Layers3,
    title: 'Project-specific configuration',
    text: 'Door, screen and sill choices affect the completed set. Confirm the proposed configuration and its evidence for each project.',
  },
];

export function ThermallyBrokenDoorsPage() {
  return (
    <main className="tb-page" data-testid="page-thermally-broken-doors">
      <section className="tb-hero" aria-labelledby="tb-title">
        <div className="tb-wrap">
          <nav className="tb-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-tb-breadcrumb">
            <Link href="/" data-testid="link-tb-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/products" data-testid="link-tb-products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Thermally broken doors</span>
          </nav>
          <div className="tb-hero-grid">
            <div className="tb-hero-copy">
              <p className="tb-eyebrow">Bamford Doors / Aluminium entrance systems</p>
              <h1 id="tb-title">Thermal performance.<br /><span>Security in detail.</span></h1>
              <p className="tb-hero-lead">A thermally broken door set based on Bamford’s modular entrance system, bringing thermal performance and physical security into one considered specification.</p>
              <div className="tb-hero-actions">
                <Link className="tb-button" href="/contact?purpose=product&product=Thermally%20broken%20doors" data-testid="link-tb-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
                <a className="tb-scroll-link" href="#testing" data-testid="link-tb-testing">Explore testing information <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="tb-hero-meta"><span>01 / Thermally broken door sets</span><span>Made around the entrance</span></div>
            </div>
            <figure className="tb-hero-image">
              <img src="/media/thermal.webp" alt="White aluminium communal entrance door and glazed screen" width="500" height="313" />
              <figcaption>Thermally broken entrance system</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="tb-overview tb-wrap" aria-labelledby="tb-overview-title">
        <div className="tb-overview-panel">
          <p className="tb-eyebrow">Product overview</p>
          <h2 id="tb-overview-title">Designed for demanding shared entrances.</h2>
          <p>The Bamford thermally broken door is based on the tried-and-tested Secure by Design modular door set. It is designed to provide strength against physical attack alongside a thermal, energy-efficient entrance solution.</p>
          <p>The system can be specified with Building Regulations Parts Q, L, M and K in mind. Requirements depend on the project and the complete doorset specification, so confirm compliance for the selected configuration.</p>
          <Link href="/products/aluminium-modular-doors" className="tb-inline-link" data-testid="link-tb-modular">Explore aluminium modular doors <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
        <div className="tb-overview-side">
          <p className="tb-eyebrow">The detail matters</p>
          <h2>One entrance.<br /><em>Connected choices.</em></h2>
          <ul className="tb-check-list">
            <li><Check size={16} aria-hidden="true" /><span>Door and screen configuration</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Thermal break and sill selection</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Building use and compliance needs</span></li>
          </ul>
          <p className="tb-side-note">Performance information should be checked against the complete proposed system and current project requirements.</p>
        </div>
      </section>

      <section className="tb-visual-section" aria-labelledby="tb-visual-title">
        <div className="tb-wrap">
          <div className="tb-section-head">
            <div><p className="tb-eyebrow">Designed as a complete set</p><h2 id="tb-visual-title">From section detail<br />to finished entrance.</h2></div>
            <p>The profile detail and installed door set show why the sill, door and surrounding screen need to be considered as one system.</p>
          </div>
          <div className="tb-visual-grid">
            <figure className="tb-visual-card tb-profile-card">
              <div className="tb-visual-image"><img src="/media/thermally-broken/thermal-section.jpg" alt="Cross-section illustration of a thermally broken aluminium door profile and sill" width="244" height="386" /></div>
              <figcaption><span>01 / Profile detail</span><strong>Thermal break and sill</strong></figcaption>
            </figure>
            <figure className="tb-visual-card tb-install-card">
              <div className="tb-visual-image"><img src="/media/thermally-broken/door-set.jpg" alt="White paired entrance doors with glazed panels and a glazed upper screen" width="747" height="845" /></div>
              <figcaption><span>02 / Installed example</span><strong>Thermally broken door set</strong></figcaption>
            </figure>
          </div>
          <p className="tb-image-note">Illustrative images. Confirm the appearance and specification of the proposed system with Bamford.</p>
        </div>
      </section>

      <section className="tb-testing" id="testing" aria-labelledby="tb-testing-title">
        <div className="tb-wrap">
          <div className="tb-section-head tb-testing-head">
            <div><p className="tb-eyebrow">Testing information</p><h2 id="tb-testing-title">The important figures</h2></div>
            <p>The test method and results relate to a specific tested doorset. Confirm their relevance against current requirements and the exact project specification.</p>
          </div>
          <div className="tb-testing-grid">
            {testing.map((item, index) => (
              <article className="tb-test-card" key={item.label} data-testid={`card-tb-test-${index + 1}`}>
                <span className="tb-test-index">0{index + 1}</span>
                <p>{item.label}</p>
                <h3>{item.value}</h3>
                <span className="tb-test-rule" />
                <p className="tb-test-detail">{item.detail}</p>
              </article>
            ))}
          </div>
          <div className="tb-result-callout">
            <Thermometer size={23} aria-hidden="true" />
            <p><strong>Sample result: U-value 2.1.</strong> This is 1.4 below the 3.5 L2A reference value for high-use entrance doors. Improved values can be achieved using a thermally broken sill and/or a larger side screen.</p>
          </div>
          <p className="tb-disclaimer">Performance values and regulatory references relate to specific test conditions and may not apply to every configuration. Ask Bamford for current test documentation and confirm the requirements for the exact doorset, dimensions and project.</p>
        </div>
      </section>

      <section className="tb-considerations" aria-labelledby="tb-considerations-title">
        <div className="tb-wrap">
          <div className="tb-section-head">
            <div><p className="tb-eyebrow">Specify with confidence</p><h2 id="tb-considerations-title">A system shaped around the brief.</h2></div>
            <p>Talk through the intended use, dimensions, performance targets and compliance evidence before settling the final specification.</p>
          </div>
          <div className="tb-consideration-grid">
            {considerations.map((item, index) => {
              const Icon = item.icon;
              return <article className="tb-consideration" key={item.title}>
                <span>0{index + 1}</span><Icon size={21} aria-hidden="true" />
                <h3>{item.title}</h3><p>{item.text}</p>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="tb-closing" aria-labelledby="tb-closing-title">
        <div className="tb-wrap tb-closing-inner">
          <div><p className="tb-eyebrow">Next step</p><h2 id="tb-closing-title">Discuss the right specification for your building.</h2><p>Share the opening, project requirements and any target performance information with the Bamford team.</p></div>
          <Link className="tb-button" href="/contact?purpose=product&product=Thermally%20broken%20doors" data-testid="link-tb-closing-enquire">Talk to our team <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
