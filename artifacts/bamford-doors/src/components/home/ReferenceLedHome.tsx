import { useState } from 'react';
import { ArrowRight, ArrowUpRight, Menu, X } from 'lucide-react';
import { Link } from 'wouter';
import './reference-led-home.css';

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
          <Link href="/" className="rl-brand" aria-label="Bamford Doors home"><img src="/media/bamford-doors-wordmark.png" alt="Bamford Doors" /></Link>
          <p className="rl-header-note">Entrance systems<br />made around your building</p>
          <Link href="/contact?purpose=consultation" className="rl-header-cta">Start an enquiry <ArrowUpRight size={16} /></Link>
          <button className="rl-menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
        </div>
        <nav className={`rl-nav${open ? ' is-open' : ''}`} aria-label="Main navigation">
          <div className="rl-nav-inner">{navItems.map(([label, path]) => <Link key={path} href={path} onClick={() => setOpen(false)}>{label}<span /></Link>)}
            <Link className="rl-nav-mobile-cta" href="/contact?purpose=consultation" onClick={() => setOpen(false)}>Start an enquiry <ArrowRight size={15} /></Link>
          </div>
        </nav>
      </header>
    </>
  );
}

function ProductCard({ item, index }: { item: typeof products[number]; index: number }) {
  return <Link className={`rl-product rl-product-${index + 1}`} href={`/products/${item.slug}`}>
    <div className="rl-product-image"><img src={`/media/${item.image}`} alt={`${item.title} entrance door`} /><span>{item.tag}</span><i><ArrowUpRight size={18} /></i></div>
    <div className="rl-product-copy"><h3>{item.title}</h3><p>{item.copy}</p><span className="rl-link">Explore product <ArrowRight size={14} /></span></div>
  </Link>;
}

function Footer() {
  return <footer className="rl-footer"><div className="rl-wrap">
    <div className="rl-footer-top"><div className="rl-footer-brand"><img src="/media/bamford-doors-wordmark.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div>
      <div className="rl-footer-col"><h3>Explore</h3>{navItems.slice(0, 4).map(([label, path]) => <Link href={path} key={path}>{label}</Link>)}<Link href="/news-insights">News &amp; insights</Link></div>
      <div className="rl-footer-col"><h3>Company</h3><Link href="/about">About Bamford</Link><Link href="/faq">Frequently asked questions</Link><Link href="/downloads">Documents and downloads</Link></div>
      <div className="rl-footer-contact"><p className="rl-kicker">A good place to start</p><h3>Tell us about<br />your entrance.</h3><Link href="/contact">Contact our team <ArrowRight size={15} /></Link></div>
    </div>
    <div className="rl-footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span><Link href="/">Back to top ↑</Link></div>
  </div></footer>;
}

export function ReferenceLedHome() {
  return (
    <div className="rl-site">
      <Header />
      <main>
        <section className="rl-hero">
          <div className="rl-hero-image"><img src="/media/grp.webp" alt="Bamford entrance door installed at a shared residential building" /><div className="rl-image-caption"><span>01</span><i /> ENTRANCE SYSTEMS</div></div>
          <div className="rl-hero-panel">
            <p className="rl-kicker">Bamford Doors <b>/</b> Made for the entrance</p>
            <h1>Secure your<br />tenants<br /><em>Elevate Your Spaces.</em></h1>
            <p className="rl-hero-lead">Custom-made security doors and entrance systems for the buildings people rely on.</p>
          <p className="rl-hero-body">Your building needs stronger, reliable security doors. Bamford Doors provides bespoke premium reinforced aluminum doors that keep your residents safe and secure, whilst enhancing living spaces giving you peace of mind and a proven reputation for safety and durability.</p>
            <div className="text-[10px]"><Link className="rl-button" href="/contact?purpose=consultation">Discuss your project <ArrowRight size={16} /></Link><Link className="rl-quiet-link" href="/products">Explore products <ArrowUpRight size={16} /></Link></div>
          <span className="rl-panel-mark">Security through design</span>
          </div>
          <div className="rl-hero-side-label">A dependable first impression <span>—</span> since the first detail</div>
        </section>
        <section className="rl-capabilities" aria-label="How we work"><Link href="/sectors"><span>01</span><strong>Understand</strong><small>The building and its use</small><ArrowUpRight /></Link><Link href="/products"><span>02</span><strong>Design</strong><small>Door and screen options</small><ArrowUpRight /></Link><Link href="/services"><span>03</span><strong>Make</strong><small>Custom-made in the UK</small><ArrowUpRight /></Link><Link href="/services"><span>04</span><strong>Install</strong><small>Support for the project</small><ArrowUpRight /></Link></section>

        <section className="rl-intro rl-wrap">
          <div className="rl-intro-heading"><p className="rl-kicker">An entrance is part of the building</p><h2>Good design begins<br />with <em>good questions.</em></h2></div>
          <div className="rl-intro-copy"><span className="rl-rule-number">01 <i>—</i> CONTEXT FIRST</span><p className="rl-intro-lead">Every entrance has a job to do — and a building around it.</p><p>We work with housing providers and building teams to understand the setting, the people who use it and the work being planned. Then we can explore the right door and screen options together.</p><Link className="rl-link" href="/about">Meet Bamford <ArrowRight size={14} /></Link></div>
        </section>

        <section className="rl-sectors">
          <div className="rl-wrap">
            <div className="rl-section-heading"><div><p className="rl-kicker">Who we work with</p><h2>Built around<br /><em>real buildings.</em></h2></div><p>Different buildings bring different considerations. Find information shaped around your sector and the entrance it needs.</p></div>
            <div className="rl-sector-layout">
              <Link className="rl-sector-feature" href="/sectors/social-housing"><img src="/media/wood-effect.webp" alt="Wood-effect entrance door in a shared residential building" /><span className="rl-sector-shade" /><span className="rl-sector-label">SECTOR / 01</span><div><small>For communities and shared homes</small><h3>Social<br />housing</h3><span className="rl-round-arrow"><ArrowUpRight /></span></div></Link>
              <div className="rl-sector-list">{sectors.slice(1).map(sector => <Link href={`/sectors/${sector.slug}`} key={sector.slug}><span>{sector.code}</span><div><h3>{sector.name}</h3><p>{sector.note}</p></div><ArrowUpRight className="rl-sector-arrow" size={19} /></Link>)}<Link className="rl-all-sectors" href="/sectors">All sectors <ArrowRight size={15} /></Link></div>
            </div>
          </div>
        </section>

        <section className="rl-products rl-wrap">
          <div className="rl-section-heading rl-products-heading"><div><p className="rl-kicker">The product range</p><h2>Made to meet<br /><em>the moment.</em></h2></div><div><p>Explore a selection of Bamford door options. Each project starts with the building and the requirements you bring.</p><Link className="rl-link" href="/products">View all products <ArrowRight size={14} /></Link></div></div>
          <div className="rl-product-grid">{products.map((item, index) => <ProductCard key={item.slug} item={item} index={index} />)}</div>
        </section>

        <section className="rl-service">
          <div className="rl-service-photo"><img src="/media/aluminium.webp" alt="Aluminium modular entrance door and screen" /><span>DETAIL STUDY <i>—</i> MODULAR ENTRANCE</span></div>
          <div className="rl-service-content"><p className="rl-kicker">More than a product</p><h2>Good work takes<br /><em>good support.</em></h2><p>There is more to an entrance project than the door itself. Explore services for the wider requirement, from early conversations to ongoing maintenance discussions.</p><Link className="rl-button" href="/services">Explore our services <ArrowRight size={15} /></Link>
            <div className="rl-service-links"><Link href="/services/project-management"><span>01</span>Project management<ArrowUpRight size={16} /></Link><Link href="/services/stock-condition-surveys"><span>02</span>Stock condition surveys<ArrowUpRight size={16} /></Link><Link href="/services/maintenance-packages"><span>03</span>Maintenance packages<ArrowUpRight size={16} /></Link></div>
          </div>
        </section>

        <section className="rl-process rl-wrap"><div><p className="rl-kicker">A clear way forward</p><h2>Start with what<br />you <em>know.</em></h2><p>Share the details you have. Our team can talk through the building, entrance and project requirements with you.</p><Link className="rl-link" href="/contact">What to include in an enquiry <ArrowRight size={14} /></Link></div><ol><li><span>01</span><div><h3>Tell us about the building</h3><p>Its setting, use and the work being considered.</p></div></li><li><span>02</span><div><h3>Discuss the requirement</h3><p>Explore the entrance and product options together.</p></div></li><li><span>03</span><div><h3>Agree a way forward</h3><p>Understand the next steps for your project.</p></div></li></ol></section>

        <section className="rl-contact-band"><div className="rl-wrap rl-contact-inner"><div><p className="rl-kicker">A conversation, not a commitment</p><h2>Let’s talk about<br />your entrance.</h2><p>Tell us what you are looking to discuss. Share only the project information you have to hand.</p></div><div className="rl-contact-actions"><Link className="rl-button rl-button-light" href="/contact?purpose=consultation">Request a consultation <ArrowRight size={16} /></Link><Link href="/contact?purpose=stock-survey">Request a stock condition survey <ArrowUpRight size={15} /></Link><Link href="/contact?purpose=product">Enquire about a product <ArrowUpRight size={15} /></Link><Link href="/contact?purpose=callback">Request a callback <ArrowUpRight size={15} /></Link></div><span className="rl-contact-monogram">B</span></div></section>
      </main>
      <Footer />
    </div>
  );
}
