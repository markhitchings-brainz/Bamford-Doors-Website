import { useState } from 'react';
import { ArrowRight, Menu, MoveUpRight, X } from 'lucide-react';
import './_group.css';

type Product = { slug: string; title: string; summary: string; image: string };
type Sector = { slug: string; title: string; summary: string };
type Service = { slug: string; title: string };

const navItems = [
  ['Products', '/products'],
  ['Services', '/services'],
  ['Sectors', '/sectors'],
  ['Case studies', '/case-studies'],
  ['About', '/about'],
] as const;

const products: Product[] = [
  { slug: 'aluminium-modular-doors', title: 'Aluminium modular doors', summary: 'Custom-made aluminium entrance doors and screens for shared and public buildings.', image: '/__mockup/images/aluminium.webp' },
  { slug: 'thermally-broken-doors', title: 'Thermally broken doors', summary: 'A thermally broken entrance door option for buildings where this product type is required.', image: '/__mockup/images/thermal.webp' },
  { slug: 'wood-effect-door', title: 'Wood effect doors', summary: 'A wood-effect finish option for a custom-made entrance door.', image: '/__mockup/images/wood-effect.webp' },
  { slug: 'hmo', title: 'HMO entrance doors', summary: 'Custom-made entrance doors for houses in multiple occupation.', image: '/__mockup/images/hmo.webp' },
];

const sectors: Sector[] = [
  { slug: 'social-housing', title: 'Social housing', summary: 'Bamford designs, manufactures and installs custom-made security doors and screens for housing providers.' },
  { slug: 'local-authorities', title: 'Local authorities', summary: 'Bamford serves local authorities nationally with custom-made, vandal-resistant security doors and screens.' },
  { slug: 'housing-associations', title: 'Housing associations', summary: 'Entrance systems for housing providers, including housing associations serving communities nationally.' },
  { slug: 'apartment-blocks', title: 'Apartment blocks', summary: 'Custom-made door and entrance system options for shared residential buildings.' },
];

const services: Service[] = [
  { slug: 'project-management', title: 'Project management' },
  { slug: 'maintenance-packages', title: 'Maintenance packages' },
  { slug: 'stock-condition-surveys', title: 'Stock condition surveys' },
];

function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topline"><span>DESIGNED · MANUFACTURED · INSTALLED</span><span>UK-wide service for public and commercial buildings</span></div>
    <header className="header">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="Bamford Doors home"><img src="/__mockup/images/bamford-doors-wordmark.png" alt="Bamford Doors" /></a>
        <nav className="nav" aria-label="Main navigation">{navItems.map(([label, path]) => <a key={path} href={path}>{label}</a>)}</nav>
        <a className="nav-cta" href="/contact?purpose=consultation">Start an enquiry <ArrowRight size={15} /></a>
        <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {navItems.map(([label, path]) => <a key={path} href={path} onClick={() => setOpen(false)}>{label}</a>)}
        <a className="nav-cta" href="/contact?purpose=consultation" onClick={() => setOpen(false)}>Request a Consultation <ArrowRight size={15} /></a>
      </nav>}
    </header>
  </>;
}

function ProductCard({ product }: { product: Product }) {
  return <a className="product-card" href={`/products/${product.slug}`}>
    <img src={product.image} alt={product.title} />
    <div className="product-card-copy">
      <h3>{product.title}</h3>
      <p>{product.summary}</p>
      <span className="text-link">Explore product <ArrowRight size={13} /></span>
    </div>
  </a>;
}

function Footer() {
  return <footer className="footer"><div className="wrap">
    <div className="footer-grid">
      <div><img className="footer-logo" src="/__mockup/images/bamford-doors-wordmark.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div>
      <div><h3>Explore</h3>{navItems.slice(0, 4).map(([label, path]) => <a key={path} href={path}>{label}</a>)}<a href="/news-insights">News &amp; insights</a></div>
      <div><h3>About</h3><a href="/about">About Bamford</a><a href="/faq">Frequently asked questions</a><a href="/downloads">Documents and downloads</a></div>
      <div><h3>Start a conversation</h3><p>Tell us what your building needs.</p><a href="/contact">Contact Bamford <ArrowRight size={13} /></a></div>
    </div>
    <div className="footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span></div>
  </div></footer>;
}

function Home() {
  return <main className="main">
    <section className="text-[15px]"><div className="wrap hero-grid">
      <div className="hero-copy">
        <p className="eyebrow">Bamford Doors <span className="eyebrow-divider">/</span> Made for the entrance</p>
        <h1>Quality Bespoke Security Doors for Social Housing Providers and Landlords</h1>
        <p className="hero-question">Entrances matter. Make yours fit the building.</p>
        <p>Bamford designs, manufactures and installs custom-made security doors and screens for housing providers, councils and building teams.</p>
        <div className="hero-actions"><a href="/contact?purpose=consultation" className="button">Request a Consultation <ArrowRight size={16} /></a><a href="/products" className="button button-outline">Explore products</a></div>
        <span className="hero-note">For shared entrances and public buildings</span>
      </div>
      <div className="hero-photo"><img src="/__mockup/images/grp.webp" alt="Bamford security entrance door at a shared residential building" /><span className="hero-photo-index">01 <i /> ENTRANCE SYSTEMS</span></div>
    </div></section>
    <section className="font-semibold text-[15px]"><div className="wrap audience-inner"><span>Built around the needs of</span><a href="/sectors/social-housing">Social housing</a><a href="/sectors/local-authorities">Local authorities</a><a href="/sectors/housing-associations">Housing associations</a><a href="/sectors/apartment-blocks">Building teams</a></div></section>
    <section className="section intro-section"><div className="wrap split">
      <div><p className="eyebrow">An entrance is a working part of the building</p><h2>One entrance.<br /><em>Many considerations.</em></h2></div>
      <div className="intro-copy"><p className="section-lead">Every shared entrance has its own context: the building, the people who use it and the work planned around it.</p><p>Bamford can help you explore door and screen options, alongside services that support your project. Start with the requirement; the team can discuss what comes next.</p><a className="text-link" href="/contact?purpose=consultation">Talk through your project <ArrowRight size={14} /></a></div>
    </div></section>
    <section className="section sector-section"><div className="wrap">
      <div className="section-head"><div><p className="eyebrow">Who we work with</p><h2>For buildings serving people.</h2></div><p>Explore information shaped around your building type and the entrance it needs.</p></div>
      <div className="sector-feature-grid">{sectors.map((sector, i) => <a className={`sector-feature sector-feature-${i + 1}`} key={sector.slug} href={`/sectors/${sector.slug}`}><span className="sector-number">0{i + 1} / SECTOR</span><strong>{sector.title}</strong><p>{sector.summary}</p><span className="sector-arrow"><MoveUpRight size={18} /></span></a>)}</div>
      <a className="text-link sector-all-link" href="/sectors">View all sectors <ArrowRight size={14} /></a>
    </div></section>
    <section className="section product-section"><div className="wrap">
      <div className="section-head"><div><p className="eyebrow">Product range</p><h2>Made for the entrance.</h2></div><p>Explore door and entrance system options, then talk with the team about your building and project requirements.</p></div>
      <div className="product-grid">{products.map(product => <ProductCard key={product.slug} product={product} />)}</div>
      <div className="product-index-link"><span>Door systems, screens and entrance details.</span><a className="text-link" href="/products">Explore all products <ArrowRight size={14} /></a></div>
    </div></section>
    <section className="service-spotlight"><div className="service-visual"><img src="/__mockup/images/wood-effect.webp" alt="Wood-effect entrance door in a residential building" /><span>DETAIL / 02</span></div><div className="service-copy">
      <p className="eyebrow">More than a product</p><h2>Support for the work around the door.</h2><p>From project management to maintenance discussions and stock condition surveys, explore services for the wider entrance requirement.</p><a className="button" href="/services">Explore services <ArrowRight size={15} /></a>
      <div className="service-links">{services.map((service, i) => <a key={service.slug} href={`/services/${service.slug}`}><span>0{i + 1}</span>{service.title}<ArrowRight size={14} /></a>)}</div>
    </div></section>
    <section className="section process-section"><div className="wrap split">
      <div><p className="eyebrow">Start with a conversation</p><h2>Bring the building into focus.</h2><p className="process-intro">Share what you know. The team can discuss the building, the entrance and the details needed to explore a suitable next step.</p><a className="text-link" href="/contact">What to include in an enquiry <ArrowRight size={14} /></a></div>
      <ol className="process-list">{['Tell us about the building', 'Discuss the requirement', 'Agree a way forward'].map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
    </div></section>
    <section className="feature-band home-cta"><div className="wrap"><p className="eyebrow">Start here</p><h2>Let’s talk about your entrance.</h2><p>Tell us what you are looking to discuss. Share only the project information you have to hand.</p><div className="hero-actions"><a className="button" href="/contact?purpose=consultation">Request a Consultation <ArrowRight size={15} /></a><a className="button button-outline" href="/contact?purpose=stock-survey">Request a Stock Condition Survey</a><a className="text-link" href="/contact?purpose=product">Enquire about a product <ArrowRight size={14} /></a><a className="text-link" href="/contact?purpose=callback">Request a callback <ArrowRight size={14} /></a></div></div></section>
  </main>;
}

export function Current() {
  return <div className="site-shell"><Header /><Home /><Footer /></div>;
}
