import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import './our-history.css';

const imageBase = 'https://bamforddoors.com/wp-content/uploads/2021/04';

const milestones = [
  {
    year: '1944',
    title: 'A family business passes on',
    text: 'Fred Bamford died, and the company passed to his son, Fred Bamford Junior.',
    image: `${imageBase}/frederickbamfordsnr.jpg`,
    alt: 'Fred Bamford Senior, founder of the company',
  },
  {
    year: '1947–48',
    title: 'Frank Smith takes the helm',
    text: 'Frank Smith joined as Assistant Managing Director in 1947. A year later, he bought the company from Fred Bamford Junior.',
    image: `${imageBase}/Frank-Smith-751x1024.jpg`,
    alt: 'Frank Smith',
  },
  {
    year: '1984',
    title: 'A new direction for engineering',
    text: 'After Frank’s death, his son Andrew Smith became Chairman and Managing Director. As British shipbuilding declined, the company applied its engineering experience to high-strength, vandal-resistant security doors and screens.',
    image: `${imageBase}/Andrew-Smith.jpg`,
    alt: 'Andrew Smith',
  },
  {
    year: '2001',
    title: 'The entrance range grows',
    text: 'Andrew’s daughter Alexis Smith joined the company to develop sales, products and services. She introduced door entry, access control and automatic operators, building a more complete entrance security offer.',
    image: `${imageBase}/Alexis-Smith.jpg`,
    alt: 'Alexis Smith',
  },
];

export function OurHistoryPage() {
  return (
    <main className="history-page">
      <section className="history-hero">
        <div className="wrap">
          <nav className="history-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Our history</span>
          </nav>
          <div className="history-hero-grid">
            <div className="history-hero-copy">
              <p className="eyebrow">A story that began in 1903</p>
              <EditablePageHeadline>Our history</EditablePageHeadline>
              <p className="history-hero-lead">
                From a small marine engine named “Ajax” to the security entrances we make today,
                Bamford’s story has always been shaped by engineering and family.
              </p>
              <div className="history-hero-stamp">
                <strong>1903</strong>
                <span>Engineering for the next generation</span>
              </div>
            </div>
            <figure className="history-hero-image">
              <img
                src={`${imageBase}/ajax-works.jpg`}
                alt="The historic Ajax works, part of Bamford’s early engineering story"
              />
              <figcaption>Our beginnings · marine engineering</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="history-origin wrap">
        <div className="history-origin-copy">
          <p className="eyebrow">1903 · The first chapter</p>
          <h2>A small engine named <em>Ajax.</em></h2>
          <p>
            F. Bamford &amp; Co. Ltd. began trading in 1903, when founder Fred Bamford designed a
            small marine engine to power his canal boat, “Ajax”. The engine proved a success, and
            customers soon asked for a complete package. Bamford responded by manufacturing
            propellers.
          </p>
        </div>
        <figure className="history-ajax-mark">
          <img
            src={`${imageBase}/Ajax-Logo.jpg`}
            alt="The Ajax name from Bamford’s early marine-engine range"
          />
          <figcaption>Ajax · the engine that started it</figcaption>
        </figure>
      </section>

      <section className="history-marine">
        <div className="wrap history-marine-grid">
          <div className="history-marine-photos">
            <figure className="history-miss-england">
              <img
                src={`${imageBase}/miss-england-3.jpg`}
                alt="Miss England, whose propellers were made by Bamford"
              />
              <figcaption>Miss England · a record-breaking boat</figcaption>
            </figure>
            <figure className="history-propeller">
              <img
                src={`${imageBase}/Propeller.jpg`}
                alt="A propeller from Bamford’s marine engineering history"
              />
            </figure>
          </div>
          <div className="history-marine-copy">
            <p className="eyebrow">Engineering on the water</p>
            <h2>Built to make <em>an impact.</em></h2>
            <p>
              Bamford’s propellers achieved many notable successes. They included the propellers
              fitted to “Miss England”, which reached the world water speed record at more than
              100mph.
            </p>
          </div>
        </div>
      </section>

      <section className="history-timeline">
        <div className="wrap">
          <div className="history-timeline-heading">
            <div>
              <p className="eyebrow">Four generations of progress</p>
              <h2>Built on experience.<br /><em>Ready to adapt.</em></h2>
            </div>
            <p>
              The business changed with the times, carrying its engineering knowledge and family
              standards into new work.
            </p>
          </div>
          <div className="history-timeline-list">
            {milestones.map((milestone) => (
              <article className="history-milestone" key={milestone.year}>
                <div className="history-milestone-year">{milestone.year}</div>
                <div className="history-milestone-copy">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.text}</p>
                </div>
                <figure className="history-milestone-image">
                  <img src={milestone.image} alt={milestone.alt} />
                </figure>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="history-closing">
        <figure className="history-closing-image">
          <img
            src={`${imageBase}/Bamford-Delivery-Lorry-300x164.jpg`}
            alt="Bamford delivery lorry"
          />
          <figcaption>Made for the work ahead</figcaption>
        </figure>
        <div className="history-closing-copy">
          <p className="eyebrow">Then and now</p>
          <h2>Family standards.<br /><em>Looking forward.</em></h2>
          <p>
            Although the company has grown, Bamford still takes pride in maintaining high family
            standards for quality and service.
          </p>
          <Link className="button" href="/contact">
            Talk to our team <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
