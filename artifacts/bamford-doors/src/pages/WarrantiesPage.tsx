import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './warranties.css';

const images = [
  {
    src: '/media/warranties/door-frame-assembly-at-workshop.jpg',
    alt: 'Door frames assembled in the Bamford workshop, with further frames visible behind',
    label: 'Made for the project',
  },
  {
    src: '/media/warranties/grey-aluminium-entrance.jpg',
    alt: 'Grey aluminium communal entrance door and glazed screen set into a brick building',
    label: 'An installed entrance',
  },
  {
    src: '/media/warranties/light-grey-aluminium-entrance.jpg',
    alt: 'Light-grey aluminium entrance doorset with glazed panels and side screens',
    label: 'Bespoke doorset',
  },
];

export function WarrantiesPage() {
  return (
    <main className="warranties">
      <section className="wr-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={12} />
            <Link href="/services">Services</Link><ChevronRight size={12} />
            <span aria-current="page">Warranties</span>
          </nav>
          <div className="wr-hero-grid">
            <div className="wr-hero-copy">
              <p className="eyebrow">Services / Warranties</p>
              <EditablePageHeadline>Warranties.<br /><em>Clear terms.</em></EditablePageHeadline>
              <p className="wr-hero-deck">Warranty and maintenance information for Bamford doorsets</p>
              <span className="wr-rule" aria-hidden="true" />
              <p className="wr-intro">Every entrance has its own specification and project history. Here is a practical guide to the warranty periods, coverage and conditions to check for your Bamford doors and screens.</p>
              <p className="wr-intro">Bamford designs and manufactures its own products, with new products developed to be backward-compatible with existing ranges.</p>
              <Link className="wr-inline-link" href="/contact">Discuss your product or project warranty <ArrowRight size={15} /></Link>
            </div>
            <figure className="wr-hero-image">
              <ResponsiveImage src="/media/warranties/red-door-frames-in-production.jpg" alt="Red door and screen frames in production at the Bamford workshop" sizes="(max-width: 760px) 100vw, 50vw" fetchPriority="high" />
              <figcaption><span>01 / MADE IN THE WORKSHOP</span>Built around the doorset specification.</figcaption>
            </figure>
          </div>
          <div className="wr-hero-index" aria-hidden="true"><span>PRODUCT &amp; PROJECT SUPPORT</span><span>WARRANTY · MAINTENANCE · CARE</span></div>
        </div>
      </section>

      <section className="wr-periods" aria-labelledby="wr-periods-heading">
        <div className="wrap">
          <div className="wr-section-heading">
            <div><p className="eyebrow">Warranty periods</p><h2 id="wr-periods-heading">Start with the <em>term.</em></h2></div>
            <p>Warranty periods depend on the product and project. Check which written terms apply to your doorset.</p>
          </div>
          <div className="wr-term-list">
            <article className="wr-term">
              <span className="wr-term-number">02</span>
              <div><p className="wr-term-kicker">Standard warranty</p><h3>Two years from installation</h3><p>For Bamford products. Automatic operators have a one-year standard warranty from installation.</p></div>
              <span className="wr-term-duration">Years</span>
            </article>
            <article className="wr-term wr-term-featured">
              <span className="wr-term-number">10</span>
              <div><p className="wr-term-kicker">Conditional warranty</p><h3>Ten years, where eligible</h3><p>Available only where Bamford Doors has provided a written technical specification accepted by the end user, and the doors are used solely and continuously as communal entrance doors in that end user’s housing stock. It is also available for framework-procured projects. Eligibility is project-specific: please ask us to confirm it.</p></div>
              <span className="wr-term-duration">Years</span>
            </article>
            <article className="wr-term">
              <span className="wr-term-number">20</span>
              <div><p className="wr-term-kicker">Maintenance-linked guarantee</p><h3>Twenty years with a maintenance plan</h3><p>For communal doors, an annual <Link className="wr-term-link" href="/services/maintenance-packages">maintenance plan</Link> must be delivered by a Bamford operative or agent and taken out before the standard warranty expires.</p></div>
              <span className="wr-term-duration">Years</span>
            </article>
          </div>
          <p className="wr-summary-note">This page is a summary. Coverage depends on the written warranty for the specific product or project. Please confirm current eligibility, written terms and maintenance requirements with Bamford.</p>
        </div>
      </section>

      <section className="wr-gallery" aria-labelledby="wr-gallery-heading">
        <div className="wrap">
          <div className="wr-gallery-heading">
            <div><p className="eyebrow">Designed and manufactured by Bamford</p><h2 id="wr-gallery-heading">Every doorset has <em>its own detail.</em></h2></div>
            <p>Each bespoke door has a unique reference number. Share it with the team, along with your project details, when checking warranty information.</p>
          </div>
          <div className="wr-gallery-grid">
            {images.map((image, index) => (
              <figure className={`wr-photo wr-photo-${index + 1}`} key={image.src}>
                <ResponsiveImage src={image.src} alt={image.alt} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw" />
                <figcaption><span>0{index + 2} / ENTRANCE DETAILS</span>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="wr-coverage" aria-labelledby="wr-coverage-heading">
        <div className="wrap wr-coverage-grid">
          <div className="wr-coverage-heading">
            <p className="eyebrow">What technical faults cover</p>
            <h2 id="wr-coverage-heading">The listed components.</h2>
            <p>Coverage is for technical faults in the following components:</p>
          </div>
          <div className="wr-component-list">
            <div><span>01</span><strong>Door and screen frame</strong></div>
            <div><span>02</span><strong>Door hinge</strong></div>
            <div><span>03</span><strong>Manual door closer</strong><small>Automatic closers are excluded.</small></div>
            <div><span>04</span><strong>PTE</strong><small>Only where supplied and fitted by Bamford.</small></div>
            <div><span>05</span><strong>Mag-locks</strong></div>
            <div><span>06</span><strong>Mechanical locks</strong></div>
            <div><span>07</span><strong>Electric strikes</strong></div>
          </div>
        </div>
        <div className="wrap wr-parts-note"><span>PARTS ONLY</span><p>Call-out and labour are charged separately.</p></div>
      </section>

      <section className="wr-conditions" aria-labelledby="wr-conditions-heading">
        <div className="wrap wr-conditions-grid">
          <div className="wr-conditions-intro">
            <p className="eyebrow">Conditions and exclusions</p>
            <h2 id="wr-conditions-heading">Know what can affect <em>cover.</em></h2>
            <p>Keep maintenance and repair work within the approved team, and check the written terms for your project.</p>
          </div>
          <div className="wr-condition-columns">
            <article className="wr-condition">
              <span className="wr-condition-label">01 / AUTHORISED WORK</span>
              <h3>Use approved personnel</h3>
              <p>Work on the doorset by unauthorised personnel or companies invalidates the guarantee. Maintenance and repairs must be carried out by Bamford staff or approved staff or contractors.</p>
            </article>
            <article className="wr-condition wr-exclusions">
              <span className="wr-condition-label">02 / NOT COVERED</span>
              <h3>Exclusions</h3>
              <ul>
                <li>Non-technical faults</li>
                <li>Vandalism, misuse or abuse</li>
                <li>Cosmetic damage or wear, including paint discolouration or fading</li>
                <li>Acts of God, flood or fire</li>
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="wr-long-life">
        <div className="wrap wr-long-life-grid">
          <figure className="wr-long-life-image">
            <ResponsiveImage src="/media/warranties/blue-grp-entrance-door.jpg" alt="Blue GRP entrance door set in a brick communal building" loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
            <figcaption><span>05 / IN SERVICE</span>A Bamford communal entrance.</figcaption>
          </figure>
          <div className="wr-long-life-copy">
            <p className="eyebrow">Maintenance and product support</p>
            <h2>Support for the <em>long view.</em></h2>
            <p>Comprehensive preventative and corrective <Link className="wr-term-link" href="/services/maintenance-packages">maintenance packages</Link> are available. An annual <Link className="wr-term-link" href="/services/maintenance-packages">maintenance plan</Link> is also a condition of the 20-year communal-door guarantee described above.</p>
            <p>Bamford currently maintains doors installed around 20 years ago that remain operational and functional. This is an example of existing doors in service, not a promise of lifespan.</p>
            <p>For a specific doorset, its unique reference number helps connect the entrance to its product and project information.</p>
          </div>
        </div>
      </section>

      <section className="wr-legal">
        <div className="wrap wr-legal-inner">
          <div className="wr-legal-mark" aria-hidden="true">UK<br />LAW</div>
          <div><p className="eyebrow">Your statutory rights</p><h2>Guarantees do not affect your rights.</h2><p>Bamford Door Guarantees do not affect statutory rights under UK law.</p></div>
          <p className="wr-legal-reminder">Confirm the written warranty, eligibility and maintenance requirements for your product or project.</p>
        </div>
      </section>

      <section className="wr-contact">
        <div className="wrap wr-contact-inner">
          <div><p className="eyebrow">Discuss your doorset</p><h2>Let’s confirm what applies to your project.</h2><p>Tell us what you know about the product, installation or framework. We can help you check the relevant written terms and maintenance requirements.</p></div>
          <Link className="wr-contact-link" href="/contact" data-testid="link-contact-warranty"><span>Discuss your product or project warranty</span><ArrowRight size={20} /></Link>
        </div>
      </section>
    </main>
  );
}
