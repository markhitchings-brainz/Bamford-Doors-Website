import { ArrowRight, ChevronRight, Factory, Recycle, Truck, Users } from 'lucide-react';
import { Link } from 'wouter';
import './sustainability.css';

const mediaBase = 'https://bamforddoors.com/wp-content/uploads/2023/06';

const actionGroups = [
  {
    number: '01',
    title: 'Travel and logistics',
    summary: 'Reducing the impact of how people and products move.',
    icon: Truck,
    actions: [
      'Reduce carbon emissions by employing local people, operating regional offices and using weekly deliveries to reduce mileage.',
      'Replace the existing fleet with newer, more efficient electric and hybrid vehicles and Euro 6 engines.',
      'Reduce congestion through car sharing, rail and Tube travel, ride-to-work schemes, agile or remote working, and meetings via Microsoft Teams or Zoom.',
    ],
  },
  {
    number: '02',
    title: 'Materials and waste',
    summary: 'Keeping useful materials in circulation for longer.',
    icon: Recycle,
    actions: [
      'Move materials and finished products on reusable stillages and “A” frames to minimise waste.',
      'Segregate waste returned from site for recycling by stream, including paper and cardboard, wood and timber, and metals.',
      'Use locally based key supply-chain partners to support local businesses and reduce the supply-chain footprint.',
      'Where possible, upcycle and reuse waste, including sending items back through the supply chain in its packaging.',
    ],
  },
  {
    number: '03',
    title: 'Efficient operations',
    summary: 'Using energy and equipment more thoughtfully.',
    icon: Factory,
    actions: [
      'Reduce waste through state-of-the-art, energy-efficient CNC machinery using optimising software.',
      'Use LED lighting controlled by movement detectors and photocells.',
      'Generate energy using solar panels, with any surplus returned to the National Grid.',
      'Use thermostatic valves on radiators.',
    ],
  },
  {
    number: '04',
    title: 'Smarter everyday working',
    summary: 'Making better use of digital systems and local recycling.',
    icon: Users,
    actions: [
      'Move towards paperless processes using digital platforms, devices and cloud-based IT. Where printing is needed, print documentation double-sided.',
      'Provide centralised recycling stations throughout offices, the factory and depots.',
      'Recycle electrical and IT equipment through a local registered WEEE supplier.',
    ],
  },
];

const productValues = [
  {
    title: 'Aluminium can be recycled',
    body: 'Aluminium is 100% recyclable, supporting a circular approach to material use.',
    image: `${mediaBase}/recycle.png`,
    alt: 'Recycling symbol',
  },
  {
    title: 'Sections can be replaced',
    body: 'Bamford doors are designed so sections can be replaced on site, reducing waste and saving time, money and carbon.',
    image: `${mediaBase}/cogs.png`,
    alt: 'Engineering gears symbol',
  },
  {
    title: 'FSC-certified products',
    body: 'Our supply chain uses FSC-certified products.',
    image: `${mediaBase}/fsc.png`,
    alt: 'FSC certification mark',
  },
];

export function SustainabilityPage() {
  return (
    <main className="sustainability-page">
      <section className="sus-hero">
        <div className="wrap">
          <nav className="sus-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Sustainability</span>
          </nav>
          <div className="sus-hero-grid">
            <div className="sus-hero-copy">
              <p className="eyebrow">Responsibility in practice</p>
              <h1>Sustainability</h1>
              <p className="sus-hero-lead">
                We recognise our responsibility to procure and manufacture goods and services
                sustainably, and to protect the environment.
              </p>
              <a className="sus-scroll-link" href="#environmental-actions">
                Explore our actions <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
            <figure className="sus-hero-mark">
              <img
                src={`${mediaBase}/sustainability-logos1a.png`}
                alt="Sustainability and environmental marks from Bamford’s existing website"
                referrerPolicy="no-referrer"
              />
              <figcaption>Our environmental commitments</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="sus-intro wrap" aria-labelledby="sus-intro-heading">
        <div className="sus-intro-heading">
          <p className="eyebrow">A continuing commitment</p>
          <h2 id="sus-intro-heading">Progress through better choices.</h2>
        </div>
        <div className="sus-intro-copy">
          <p>
            As a major national security door manufacturer, we recognise our responsibilities to
            procure and manufacture goods and services in a sustainable manner, in line with our
            obligations to protect the environment.
          </p>
          <p>
            Our practices and supply chain can significantly affect local communities and the
            environment. We are taking active steps to adapt our policies and practices, while
            recognising that continued review and improvement are necessary.
          </p>
          <p>
            Our aim is to move away from linear processes that take, make and waste resources, and
            towards systems where resources can be reduced, reused and recycled. We encourage our
            employees to think sustainably through product, supply and service innovation as we work
            towards net zero.
          </p>
        </div>
      </section>

      <section className="sus-actions" id="environmental-actions" aria-labelledby="sus-actions-heading">
        <div className="wrap">
          <div className="sus-section-heading">
            <div>
              <p className="eyebrow">Environmental changes</p>
              <h2 id="sus-actions-heading">Small changes.<br /><em>Better practice.</em></h2>
            </div>
            <div className="sus-action-count">
              <strong>14</strong>
              <span>practical steps<br />across our operations</span>
            </div>
          </div>
          <div className="sus-action-grid">
            {actionGroups.map((group) => {
              const Icon = group.icon;
              return (
                <article className="sus-action-card" key={group.number}>
                  <div className="sus-action-card-heading">
                    <span className="sus-action-number">{group.number}</span>
                    <span className="sus-action-icon"><Icon size={20} aria-hidden="true" /></span>
                    <div>
                      <h3>{group.title}</h3>
                      <p>{group.summary}</p>
                    </div>
                  </div>
                  <ul>
                    {group.actions.map((action) => <li key={action}>{action}</li>)}
                  </ul>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="sus-values wrap" aria-labelledby="sus-values-heading">
        <div className="sus-values-heading">
          <p className="eyebrow">Key product values</p>
          <h2 id="sus-values-heading">Designed to use<br /><em>resources wisely.</em></h2>
          <p>
            Product choices can help reduce waste over the life of an entrance, from material
            selection to repair and responsible sourcing.
          </p>
        </div>
        <div className="sus-values-grid">
          {productValues.map((value, index) => (
            <article className="sus-value-card" key={value.title}>
              <div className="sus-value-mark">
                <img src={value.image} alt={value.alt} referrerPolicy="no-referrer" />
                <span>0{index + 1}</span>
              </div>
              <h3>{value.title}</h3>
              <p>{value.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="sus-closing">
        <div className="wrap sus-closing-inner">
          <div>
            <p className="eyebrow">Working towards net zero</p>
            <h2>Built around better use of resources.</h2>
            <p>
              If your project has environmental or procurement requirements, share them with us.
              We’ll help you find the relevant product and supply-chain information.
            </p>
          </div>
          <Link href="/contact?purpose=consultation" className="button">
            Discuss your project <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
