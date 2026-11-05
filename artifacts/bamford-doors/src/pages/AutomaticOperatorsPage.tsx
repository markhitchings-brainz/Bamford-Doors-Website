import { ArrowDown, ArrowRight, Check, ChevronRight, DoorOpen, Gauge, ShieldCheck, Volume2, Wrench, Zap } from 'lucide-react';
import { Link } from 'wouter';
import './automatic-operators.css';

const operatorFeatures = [
  {
    icon: Volume2,
    title: 'Quiet operation',
    text: 'A compact drive and programmed movement can support quieter operation. Actual sound levels depend on the door, operator and installation.',
  },
  {
    icon: Gauge,
    title: 'Energy settings',
    text: 'Full-power and low-energy options can be considered to suit the intended use and entrance requirements.',
  },
  {
    icon: DoorOpen,
    title: 'Push or pull',
    text: 'The opening direction and operating arrangement are selected for the door and the available space.',
  },
  {
    icon: Zap,
    title: 'Power-failure planning',
    text: 'The response during a power failure depends on the selected operator and installation. Confirm the expected behaviour before specification.',
  },
];

export function AutomaticOperatorsPage() {
  return (
    <main className="ao-page" data-testid="page-automatic-operators">
      <section className="ao-hero" aria-labelledby="ao-title">
        <div className="ao-wrap">
          <nav className="ao-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-ao-breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Automatic door operators</span>
          </nav>
          <div className="ao-hero-grid">
            <div className="ao-hero-copy">
              <p className="ao-eyebrow">Bamford Doors / Entrance automation</p>
              <h1 id="ao-title">Automatic door <span>operators.</span></h1>
              <p className="ao-hero-lead">A well-planned automatic entrance can make everyday access easier. Choose an operator around the door, how the entrance is used and the needs of the people using it.</p>
              <div className="ao-actions">
                <Link className="ao-button" href="/contact?purpose=product&product=Automatic%20door%20operators" data-testid="link-ao-enquire">Discuss your entrance <ArrowRight size={16} aria-hidden="true" /></Link>
                <a className="ao-text-action" href="#operator-options" data-testid="link-ao-options">Explore operator options <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="ao-hero-meta"><span>01 / Automatic operation</span><span>Installation and maintenance discussions</span></div>
            </div>
            <figure className="ao-hero-image">
              <img src="/media/automatic-operators-entrance.jpg" alt="Automatic glazed entrance doors in an entrance lobby" width="386" height="325" />
              <figcaption>Automatic entrance / Project example</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="ao-intro ao-wrap" aria-labelledby="ao-intro-title">
        <div className="ao-intro-panel">
          <p className="ao-eyebrow">From the first discussion</p>
          <h2 id="ao-intro-title">Plan the whole entrance.</h2>
          <p>Automatic operators need to work with the door, access controls and the way people approach and use the entrance. Bamford can discuss the requirements with you, including installation and maintenance arrangements.</p>
          <p>Share the building type, door details and how the entrance needs to operate. The team can help identify what should be checked before a system is specified.</p>
        </div>
        <div className="ao-intro-side">
          <p className="ao-eyebrow">Designed around use</p>
          <h2>Access, operation <em>and safety.</em></h2>
          <ul className="ao-check-list">
            <li><Check size={17} aria-hidden="true" /><span>Consider who uses the entrance and how access is managed.</span></li>
            <li><Check size={17} aria-hidden="true" /><span>Match the operator and settings to the door and site conditions.</span></li>
            <li><Check size={17} aria-hidden="true" /><span>Confirm applicable accessibility and safety requirements for the installation.</span></li>
          </ul>
          <p className="ao-side-note">Ask Bamford to confirm current installer approvals, technician qualifications and the relevant BS EN 16005 requirements for your project.</p>
        </div>
      </section>

      <section className="ao-options" id="operator-options" aria-labelledby="ao-options-title">
        <div className="ao-wrap">
          <div className="ao-section-head">
            <div><p className="ao-eyebrow">Options to discuss</p><h2 id="ao-options-title">Operation that fits the building.</h2></div>
            <p>Available features depend on the operator, door and installation. The selected system should be confirmed for the intended use.</p>
          </div>
          <div className="ao-feature-grid">
            {operatorFeatures.map(({ icon: Icon, title, text }, index) => (
              <article className="ao-feature" key={title}>
                <span className="ao-feature-index">0{index + 1} / OPTION</span>
                <Icon size={23} aria-hidden="true" />
                <div><h3>{title}</h3><p>{text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="ao-model ao-wrap" aria-labelledby="ao-model-title">
        <figure className="ao-model-image">
          <img src="/media/automatic-operator-drive.jpg" alt="Overhead electromechanical door operator fitted above an entrance door" width="398" height="315" loading="lazy" />
          <figcaption>Overhead swing-door operator / Detail</figcaption>
        </figure>
        <div className="ao-model-copy">
          <p className="ao-eyebrow">Swing-door operator</p>
          <h2 id="ao-model-title">A compact drive. A considered setup.</h2>
          <p>The Record DFA 127 is a swing-door operator model to discuss for suitable applications. It is described as using a programmable microprocessor and a compact electromechanical drive designed for quiet operation.</p>
          <p>Model availability, performance, energy settings and power-failure behaviour can vary. Ask Bamford to confirm the current specification and suitability for your entrance.</p>
          <Link className="ao-inline-link" href="/contact?purpose=product&product=Automatic%20door%20operators" data-testid="link-ao-model-enquire">Ask about an operator <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="ao-assurance" aria-labelledby="ao-assurance-title">
        <div className="ao-wrap ao-assurance-grid">
          <div className="ao-assurance-mark"><ShieldCheck size={30} aria-hidden="true" /><span>Specify with care</span></div>
          <div><p className="ao-eyebrow">Before installation</p><h2 id="ao-assurance-title">Confirm the details for your site.</h2></div>
          <p>Automatic doors must be assessed for their intended use and applicable safety and accessibility requirements. Confirm the selected operator, installation, commissioning and maintenance plan with the project team.</p>
        </div>
      </section>

      <section className="ao-closing" aria-labelledby="ao-closing-title">
        <div className="ao-wrap ao-closing-inner">
          <div>
            <p className="ao-eyebrow">Talk through the requirement</p>
            <h2 id="ao-closing-title">Tell us how your entrance needs to work.</h2>
            <p>Share what you know about the door and building. Bamford can discuss operator options and the next steps for your project.</p>
          </div>
          <Link className="ao-button" href="/contact?purpose=product&product=Automatic%20door%20operators" data-testid="link-ao-closing-enquire">Talk to the team <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
