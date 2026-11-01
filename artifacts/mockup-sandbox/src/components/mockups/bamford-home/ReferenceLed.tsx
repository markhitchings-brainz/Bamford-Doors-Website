import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import './ReferenceLed.css';

const navItems = [
  ['Products', '/products'],
  ['Services', '/services'],
  ['Sectors', '/sectors'],
  ['Case studies', '/case-studies'],
  ['About', '/about'],
] as const;

const products = [
  { slug: 'aluminium-modular-doors', title: 'Aluminium modular doors', copy: 'Custom-made entrance doors and screens for shared and public buildings.', image: 'aluminium.webp', tag: '01 / MODULAR SYSTEMS' },
  { slug: 'thermally-broken-doors', title: 'Thermally broken doors', copy: 'A considered door option for buildings where a thermally broken product is required.', image: 'thermal.webp', tag: '02 / DOOR SYSTEMS' },
  { slug: 'wood-effect-door', title: 'Wood effect doors', copy: 'A distinctive wood-effect finish, made to suit the entrance.', image: 'wood-effect.webp', tag: '03 / FINISHES' },
  { slug: 'hmo', title: 'HMO entrance doors', copy: 'Custom-made entrance doors for houses in multiple occupation.', image: 'hmo.webp', tag: '04 / SHARED LIVING' },
];

const sectors = [
  { slug: 'social-housing', name: 'Social housing', code: '01', note: 'Shared entrances, considered in context.' },
  { slug: 'local-authorities', name: 'Local authorities', code: '02', note: 'Made for the needs of public buildings.' },
  { slug: 'housing-associations', name: 'Housing associations', code: '03', note: 'Entrance systems for communities.' },
  { slug: 'apartment-blocks', name: 'Apartment blocks', code: '04', note: 'A better fit for the building and its people.' },
];

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="rl-topline"><span>DESIGNED · MANUFACTURED · INSTALLED</span><span>UK-wide service for public and commercial buildings</span></div>
      <header className="rl-header">
        <div className="rl-header-main">
          <a href="/" className="rl-brand" aria-label="Bamford Doors home"><img src="/__mockup/images/bamford-doors-wordmark.png" alt="Bamford Doors" /></a>
          <p className="rl-header-note">Entrance systems<br />made around your building</p>
          <a href="/contact?purpose=consultation" className="rl-header-cta">Start an enquiry <ArrowUpRight size={16} /></a>
          <button className="rl-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        <nav className={`rl-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          <div className="rl-nav-inner">{navItems.map(([label, path]) => <a key={path} href={path} onClick={() => setOpen(false)}>{label}<span /></a>)}
            <a className="rl-nav-mobile-cta" href="/contact?purpose=consultation" onClick={() => setOpen(false)}>Start an enquiry <ArrowRight size={15} /></a>
          </div>
        </nav>
      </header>
    </>
  );
}

function ProductCard({ item, index }: { item: typeof products[number]; index: number }) {
  return <a className={`rl-product rl-product-${index + 1}`} href={`/products/${item.slug}`}>
    <div className="rl-product-image"><img src={`/__mockup/images/${item.image}`} alt={`${item.title} entrance door`} /><span>{item.tag}</span><i><ArrowUpRight size={18} /></i></div>
    <div className="rl-product-copy"><h3>{item.title}</h3><p>{item.copy}</p><span className="rl-link">Explore product <ArrowRight size={14} /></span></div>
  </a>;
}

function Footer() {
  return <footer className="rl-footer"><div className="rl-wrap">
    <div className="rl-footer-top"><div className="rl-footer-brand"><img src="/__mockup/images/bamford-doors-wordmark.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div>
      <div className="rl-footer-col"><h3>Explore</h3>{navItems.slice(0, 4).map(([label, path]) => <a href={path} key={path}>{label}</a>)}<a href="/news-insights">News &amp; insights</a></div>
      <div className="rl-footer-col"><h3>Company</h3><a href="/about">About Bamford</a><a href="/faq">Frequently asked questions</a><a href="/downloads">Documents and downloads</a></div>
      <div className="rl-footer-contact"><p className="rl-kicker">A good place to start</p><h3>Tell us about<br />your entrance.</h3><a href="/contact">Contact our team <ArrowRight size={15} /></a></div>
    </div>
    <div className="rl-footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span><a href="/">Back to top ↑</a></div>
  </div></footer>;
}

export function ReferenceLed() {
  return <div className="rl-site">
    <Header />
    <main>
      <section className="rl-hero">
        <div className="rl-hero-image"><img src="/__mockup/images/grp.webp" alt="Bamford entrance door installed at a shared residential building" /><div className="rl-image-caption"><span>01</span><i /> ENTRANCE SYSTEMS</div></div>
        <div className="rl-hero-panel">
          <p className="rl-kicker">Bamford Doors <b>/</b> Made for the entrance</p>
          <h1>Entrances<br />that work<br /><em>harder.</em></h1>
          <p className="rl-hero-lead">Custom-made security doors and entrance systems for the buildings people rely on.</p>
          <p className="rl-hero-body">Designed, manufactured and installed for housing providers, councils, schools and public building teams.</p>
          <div className="rl-hero-actions"><a className="rl-button" href="/contact?purpose=consultation">Discuss your project <ArrowRight size={16} /></a><a className="rl-quiet-link" href="/products">Explore products <ArrowUpRight size={16} /></a></div>
          <span className="rl-panel-mark">B / D <i>BUILT AROUND THE BUILDING</i></span>
        </div>
        <div className="rl-hero-side-label">A dependable first impression <span>—</span> since the first detail</div>
      </section>
      <section className="rl-capabilities" aria-label="How we work"><a href="/sectors"><span>01</span><strong>Understand</strong><small>The building and its use</small><ArrowUpRight /></a><a href="/products"><span>02</span><strong>Design</strong><small>Door and screen options</small><ArrowUpRight /></a><a href="/services"><span>03</span><strong>Make</strong><small>Custom-made in the UK</small><ArrowUpRight /></a><a href="/services"><span>04</span><strong>Install</strong><small>Support for the project</small><ArrowUpRight /></a></section>

      <section className="rl-intro rl-wrap">
        <div className="rl-intro-heading"><p className="rl-kicker">An entrance is part of the building</p><h2>Good design begins<br />with <em>good questions.</em></h2></div>
        <div className="rl-intro-copy"><span className="rl-rule-number">01 <i>—</i> CONTEXT FIRST</span><p className="rl-intro-lead">Every entrance has a job to do — and a building around it.</p><p>We work with housing providers and building teams to understand the setting, the people who use it and the work being planned. Then we can explore the right door and screen options together.</p><a className="rl-link" href="/about">Meet Bamford <ArrowRight size={14} /></a></div>
      </section>

      <section className="rl-sectors">
        <div className="rl-wrap">
          <div className="rl-section-heading"><div><p className="rl-kicker">Who we work with</p><h2>Built around<br /><em>real buildings.</em></h2></div><p>Different buildings bring different considerations. Find information shaped around your sector and the entrance it needs.</p></div>
          <div className="rl-sector-layout">
            <a className="rl-sector-feature" href="/sectors/social-housing"><img src="/__mockup/images/wood-effect.webp" alt="Wood-effect entrance door in a shared residential building" /><span className="rl-sector-shade" /><span className="rl-sector-label">SECTOR / 01</span><div><small>For communities and shared homes</small><h3>Social<br />housing</h3><span className="rl-round-arrow"><ArrowUpRight /></span></div></a>
            <div className="rl-sector-list">{sectors.slice(1).map(sector => <a href={`/sectors/${sector.slug}`} key={sector.slug}><span>{sector.code}</span><div><h3>{sector.name}</h3><p>{sector.note}</p></div><ArrowUpRight className="rl-sector-arrow" size={19} /></a>)}<a className="rl-all-sectors" href="/sectors">All sectors <ArrowRight size={15} /></a></div>
          </div>
        </div>
      </section>

      <section className="rl-products rl-wrap">
        <div className="rl-section-heading rl-products-heading"><div><p className="rl-kicker">The product range</p><h2>Made to meet<br /><em>the moment.</em></h2></div><div><p>Explore a selection of Bamford door options. Each project starts with the building and the requirements you bring.</p><a className="rl-link" href="/products">View all products <ArrowRight size={14} /></a></div></div>
        <div className="rl-product-grid">{products.map((item, index) => <ProductCard key={item.slug} item={item} index={index} />)}</div>
      </section>

      <section className="rl-service">
        <div className="rl-service-photo"><img src="/__mockup/images/aluminium.webp" alt="Aluminium modular entrance door and screen" /><span>DETAIL STUDY <i>—</i> MODULAR ENTRANCE</span></div>
        <div className="rl-service-content"><p className="rl-kicker">More than a product</p><h2>Good work takes<br /><em>good support.</em></h2><p>There is more to an entrance project than the door itself. Explore services for the wider requirement, from early conversations to ongoing maintenance discussions.</p><a className="rl-button" href="/services">Explore our services <ArrowRight size={15} /></a>
          <div className="rl-service-links"><a href="/services/project-management"><span>01</span>Project management<ArrowUpRight size={16} /></a><a href="/services/stock-condition-surveys"><span>02</span>Stock condition surveys<ArrowUpRight size={16} /></a><a href="/services/maintenance-packages"><span>03</span>Maintenance packages<ArrowUpRight size={16} /></a></div>
        </div>
      </section>

      <section className="rl-process rl-wrap"><div><p className="rl-kicker">A clear way forward</p><h2>Start with what<br />you <em>know.</em></h2><p>Share the details you have. Our team can talk through the building, entrance and project requirements with you.</p><a className="rl-link" href="/contact">What to include in an enquiry <ArrowRight size={14} /></a></div><ol><li><span>01</span><div><h3>Tell us about the building</h3><p>Its setting, use and the work being considered.</p></div></li><li><span>02</span><div><h3>Discuss the requirement</h3><p>Explore the entrance and product options together.</p></div></li><li><span>03</span><div><h3>Agree a way forward</h3><p>Understand the next steps for your project.</p></div></li></ol></section>

      <section className="rl-contact-band"><div className="rl-wrap rl-contact-inner"><div><p className="rl-kicker">A conversation, not a commitment</p><h2>Let’s talk about<br />your entrance.</h2><p>Tell us what you are looking to discuss. Share only the project information you have to hand.</p></div><div className="rl-contact-actions"><a className="rl-button rl-button-light" href="/contact?purpose=consultation">Request a consultation <ArrowRight size={16} /></a><a href="/contact?purpose=stock-survey">Request a stock condition survey <ArrowUpRight size={15} /></a><a href="/contact?purpose=product">Enquire about a product <ArrowUpRight size={15} /></a><a href="/contact?purpose=callback">Request a callback <ArrowUpRight size={15} /></a></div><span className="rl-contact-monogram">B</span></div></section>
    </main>
    <Footer />
  </div>;
}
