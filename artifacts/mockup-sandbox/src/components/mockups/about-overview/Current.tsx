import { useState } from 'react';
import { ArrowRight, Menu, MoveUpRight, X } from 'lucide-react';
import './_group.css';
import './Current.css';

const navItems = [
  ['Home', '/'],
  ['Products', '/products'],
  ['Services', '/services'],
  ['Sectors', '/sectors'],
  ['Case studies', '/case-studies'],
  ['News', '/news-insights'],
  ['About', '/about'],
] as const;

const companyPages = [
  { href: '/about/history', title: 'Our history', lead: 'From a small marine engine named Ajax to the security entrances we make today, Bamford’s story has always been shaped by engineering and family.' },
  { href: '/about/factory', title: 'Our Factory', lead: 'Made in Stockport, built around your project. Bespoke security doors and screens from our purpose-built 68,000 sq ft factory and office.' },
  { href: '/about/sustainability', title: 'Sustainability', lead: 'Bamford recognises its responsibility to procure and manufacture goods and services sustainably, protect the environment and work towards net zero.' },
  { href: '/about/accreditations', title: 'Accreditations', lead: 'Bamford Doors is committed to earning your trust through recognised standards and independent assessment.' },
  { href: '/about/meet-the-team', title: 'Meet the team', lead: 'Meet the people who coordinate Bamford’s projects, installations, production and regional client support.' },
  { href: '/about/aluminium-versus-steel', title: 'Aluminium versus steel', lead: 'Compare aluminium and steel doors for corrosion, maintenance, strength, weight and whole-project requirements.' },
  { href: '/about/corporate-social-responsibility', title: 'Corporate social responsibility', lead: 'Bamford Doors contributes to the communities it works in through charitable giving, practical support, school and college partnerships, and work with housing associations.' },
  { href: '/about/unique-environments', title: 'Unique environments', lead: 'Some buildings have specific setting and exposure requirements.' },
  { href: '/about/conservation-areas', title: 'Conservation areas', lead: 'Explore bespoke communal entrance design for conservation areas, with guidance on finishes, planning context and access.' },
  { href: '/about/coastal-applications', title: 'Coastal applications', lead: 'Plan communal entrances for salt-laden air, wind-driven rain and demanding coastal exposure.' },
];

function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topline"><span>DESIGNED · MANUFACTURED · INSTALLED</span><span>UK-wide service for public and commercial buildings</span></div>
    <header className="header"><div className="header-inner">
      <a href="/" className="brand" aria-label="Bamford Doors home"><img src="/__mockup/images/bamford-doors-wordmark.png" alt="Bamford Doors" /></a>
      <nav className="nav" aria-label="Main navigation">{navItems.map(([label, path]) => <a key={path} href={path} aria-current={path === '/about' ? 'page' : undefined}>{label}</a>)}</nav>
      <a className="nav-cta" href="/contact?purpose=consultation">Start an enquiry <ArrowRight size={15} /></a>
      <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
    </div>{open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, path]) => <a key={path} href={path} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="/contact?purpose=consultation" onClick={() => setOpen(false)}>Start an enquiry <ArrowRight size={15} /></a></nav>}</header>
  </>;
}

function Footer() {
  return <footer className="footer"><div className="wrap">
    <div className="footer-grid">
      <div><img className="footer-logo" src="/__mockup/images/bamford-doors-footer-logo.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div>
      <div><h3>Explore</h3>{navItems.slice(1, 5).map(([label, path]) => <a key={path} href={path}>{label}</a>)}<a href="/news-insights">News &amp; insights</a></div>
      <div><h3>About</h3><a href="/about">About Bamford</a><a href="/faq">Frequently asked questions</a><a href="/downloads">Documents and downloads</a></div>
      <div><h3>Start a conversation</h3><p>Tell us what your building needs.</p><a href="/contact">Contact Bamford <ArrowRight size={13} /></a></div>
    </div>
    <div className="footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span></div>
  </div></footer>;
}

export function Current() {
  return <div className="site-shell about-current">
    <Header />
    <main className="main">
      <div className="page-hero"><div className="wrap">
        <p className="eyebrow">About Bamford</p>
        <h1>Made for the entrance</h1>
        <p className="lead">Bamford designs, manufactures and installs custom-made, vandal-resistant security doors and screens.</p>
      </div></div>
      <section className="about-section"><div className="wrap about-grid">
        <div><p className="eyebrow">Who we serve</p><h2>For public buildings across the UK.</h2></div>
        <div>
          <p className="about-intro">Bamford works with local authorities, housing associations, schools and other public and commercial building teams.</p>
          <div className="about-links">{companyPages.map(page => <a className="about-link" key={page.href} href={page.href}><strong>{page.title}</strong><p>{page.lead}</p><span className="arrow"><MoveUpRight size={16} /></span></a>)}</div>
        </div>
      </div></section>
      <section className="feature-band"><div className="wrap current-cta"><div><p className="eyebrow">Talk to Bamford</p><h2>Discuss your requirements</h2><p>Tell us about your building, entrance or project and our team can help with the next step.</p></div><a href="/contact" className="button">Contact our team <ArrowRight size={16} /></a></div></section>
    </main>
    <Footer />
  </div>;
}
