import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import './stock-condition-surveys.css';

const surveyImages = [
  {
    src: '/media/stock-condition-surveys/housing-estate-aerial-wide.jpg',
    alt: 'Wide aerial view across a residential housing estate',
    label: 'A wider view',
  },
  {
    src: '/media/stock-condition-surveys/housing-estate-aerial-close.jpg',
    alt: 'Closer aerial view across rows of homes and shared estate roads',
    label: 'Across the estate',
  },
  {
    src: '/media/stock-condition-surveys/housing-estate-field-road.jpg',
    alt: 'Aerial view of a housing estate beside a field and road',
    label: 'The surrounding setting',
  },
];

export function StockConditionSurveysPage() {
  return (
    <main className="stock-surveys">
      <section className="sc-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={12} />
            <Link href="/services">Services</Link><ChevronRight size={12} />
            <span aria-current="page">Stock Condition Surveys</span>
          </nav>
          <div className="sc-hero-grid">
            <div className="sc-hero-copy">
              <p className="eyebrow">Services / Stock Condition Surveys</p>
              <h1>Stock Condition <em>Surveys</em></h1>
              <p className="sc-hero-deck">Know the condition of your communal doors and access systems</p>
              <span className="sc-rule" aria-hidden="true" />
              <p className="sc-intro">Bamford Doors provides a free stock condition survey to give you a clearer picture of your communal door sets, door entry and access systems.</p>
              <p className="sc-intro">Our team carries out a detailed inspection, looking at door sets internally and externally. The survey helps assess the age and condition of each element, giving you useful information to plan any improvements that may be needed in the future.</p>
            </div>
            <figure className="sc-hero-image">
              <img
                src="/media/stock-condition-surveys/high-rise-residential-block.webp"
                alt="High-rise residential apartment block viewed from outside"
                fetchPriority="high"
              />
              <figcaption><span>01 / RESIDENTIAL BLOCK</span>Door sets and access systems, in context.</figcaption>
            </figure>
          </div>
          <div className="sc-hero-index" aria-hidden="true">
            <span>STOCK CONDITION SURVEYS</span><span>DOORS · ENTRY · ACCESS</span>
          </div>
        </div>
      </section>

      <section className="sc-report">
        <div className="wrap sc-report-grid">
          <div className="sc-report-heading">
            <p className="eyebrow">A clearer picture</p>
            <h2>A detailed inspection, <em>with findings in a report</em></h2>
          </div>
          <div className="sc-report-copy">
            <p className="sc-large-copy">The survey covers your communal door, door entry and access system.</p>
            <p>We document our findings in a report and provide the supporting documentation, so you have information about the condition of the surveyed elements to refer to when considering future work.</p>
          </div>
        </div>
      </section>

      <section className="sc-estate">
        <div className="wrap">
          <div className="sc-estate-head">
            <div>
              <p className="eyebrow">Across your properties</p>
              <h2>Across the <em>estate.</em></h2>
            </div>
          </div>
          <div className="sc-estate-grid">
            {surveyImages.map((image, index) => (
              <figure className={`sc-estate-photo sc-estate-photo-${index + 1}`} key={image.src}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <figcaption><span>0{index + 2} / HOUSING CONTEXT</span>{image.label}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sc-planning">
        <div className="wrap sc-planning-grid">
          <figure className="sc-planning-image">
            <img
              src="/media/stock-condition-surveys/apartment-entrances-through-brickwork.jpg"
              alt="View through brickwork toward apartment entrances"
              loading="lazy"
            />
            <figcaption><span>05 / ENTRANCE DETAIL</span>Looking through to a shared residential entrance.</figcaption>
          </figure>
          <div className="sc-planning-copy">
            <p className="eyebrow">Future planning</p>
            <h2>Support for future <em>planning</em></h2>
            <p>Understanding the current condition of your doors and access systems can help you consider what improvements may be due and plan the next steps.</p>
            <p>The survey provides a starting point for those conversations, whether you are reviewing one entrance or assessing requirements across your properties.</p>
          </div>
        </div>
      </section>

      <section className="sc-cost">
        <div className="wrap sc-cost-inner">
          <div className="sc-cost-mark" aria-hidden="true">£0</div>
          <div className="sc-cost-copy">
            <p className="eyebrow">Free of charge</p>
            <h2>A useful starting point, <em>at no charge.</em></h2>
            <p>Our stock condition survey service is provided free of charge by Bamford Doors.</p>
          </div>
          <div className="sc-cost-note">
            <span>STOCK CONDITION SURVEYS</span>
            <p>Understand the condition of your communal doors and access systems.</p>
          </div>
        </div>
      </section>

      <section className="sc-contact">
        <div className="wrap sc-contact-inner">
          <div>
            <p className="eyebrow">Start with your building</p>
            <h2>Arrange a free stock condition survey.</h2>
          </div>
          <Link className="sc-contact-link" href="/contact?purpose=stock-survey" data-testid="link-arrange-stock-survey">
            <span>Arrange a free stock condition survey</span><ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
