import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import './frameworks-page.css';

const frameworks = [
  { name: 'Advantage South West', image: '/media/frameworks/advantage-south-west.jpeg' },
  { name: 'CHIC', image: '/media/frameworks/chic.jpeg' },
  { name: 'CPC', image: '/media/frameworks/cpc.jpg' },
  { name: 'EEM', image: '/media/frameworks/eem.jpeg' },
  { name: 'LHC', image: '/media/frameworks/lhc.jpeg' },
  { name: 'Northern', image: '/media/frameworks/northern.jpeg' },
  { name: 'Procure Plus', image: '/media/frameworks/procure-plus.jpg' },
  { name: 'SWPA', image: '/media/frameworks/swpa.jpg' },
  { name: 'West Works', image: '/media/frameworks/west-works.jpeg' },
  { name: 'WPA', image: '/media/frameworks/wpa.jpeg' },
];

const benefits = [
  {
    title: 'Reduce tender administration',
    description: 'Reduce the time and administration involved in running a full tender from the beginning.',
  },
  {
    title: 'Access assessed suppliers',
    description: 'Access suppliers whose capability and offers have already been assessed through a competitive process.',
  },
  {
    title: 'Procure against defined terms',
    description: 'Work to the requirements and terms set out by the framework.',
  },
  {
    title: 'Use an appropriate call-off',
    description: 'Follow the framework’s route, such as a direct award where permitted or a mini-competition between suppliers.',
  },
];

export function FrameworksPage() {
  return (
    <main className="frameworks-page">
      <section className="fw-overview">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={12} />
            <Link href="/services">Services</Link><ChevronRight size={12} />
            <span aria-current="page">Frameworks</span>
          </nav>
          <div className="fw-overview-grid">
            <div className="fw-overview-copy">
              <p className="eyebrow">Public-sector procurement</p>
              <h2>A clear route from agreement to project.</h2>
              <p>Bamford Doors is appointed to a number of competitively tendered OJEU-compliant procurement frameworks used by eligible councils, housing providers and other public-sector organisations.</p>
              <p>A framework is an agreement established by a purchasing organisation following a competitive process. It appoints suppliers for defined products or services and sets out the requirements, terms and process for placing work.</p>
            </div>
            <aside className="fw-calloff-card" aria-label="How a framework call-off works">
              <p className="fw-card-label">A framework is not an order</p>
              <p className="fw-card-intro">When an organisation has a specific project, it places an order—often called a call-off—using the framework’s rules.</p>
              <div className="fw-calloff-flow">
                <span>Specific project</span>
                <i aria-hidden="true" />
                <strong>Call-off</strong>
                <small>Placed under the framework’s process</small>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="fw-benefits" aria-labelledby="fw-benefits-title">
        <div className="wrap">
          <div className="fw-section-heading">
            <div>
              <p className="eyebrow">Why use a framework?</p>
              <h2 id="fw-benefits-title">A more straightforward<br />procurement process.</h2>
            </div>
            <p>A framework can help customers move forward using suppliers and terms established through a competitive process.</p>
          </div>
          <ol className="fw-benefit-grid">
            {benefits.map((benefit, index) => (
              <li key={benefit.title}>
                <span className="fw-benefit-number">0{index + 1}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fw-frameworks" aria-labelledby="fw-frameworks-title">
        <div className="wrap">
          <div className="fw-section-heading">
            <div>
              <p className="eyebrow">Our appointments</p>
              <h2 id="fw-frameworks-title">Frameworks we’re appointed to.</h2>
            </div>
            <p>These frameworks are used by eligible public-sector organisations to procure products and services.</p>
          </div>
          <ul className="fw-logo-grid">
            {frameworks.map((framework) => (
              <li className="fw-logo-card" key={framework.name}>
                <img src={framework.image} alt={`${framework.name} framework logo`} loading="lazy" />
                <span>{framework.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="fw-guidance" aria-labelledby="fw-guidance-title">
        <div className="wrap fw-guidance-inner">
          <div>
            <p className="eyebrow">Check the requirements</p>
            <h2 id="fw-guidance-title">The right route depends on the framework.</h2>
            <p>The route and rules vary between frameworks. Customers should check that they are eligible to use the framework and follow its call-off process and their own procurement procedures.</p>
          </div>
          <Link className="button" href="/contact?purpose=consultation">Discuss a framework enquiry <ArrowRight size={15} /></Link>
        </div>
      </section>
    </main>
  );
}
