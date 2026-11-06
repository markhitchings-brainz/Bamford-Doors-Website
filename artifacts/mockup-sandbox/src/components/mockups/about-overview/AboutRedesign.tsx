import { useState } from 'react';
import { ArrowRight, Menu, MoveUpRight, X } from 'lucide-react';
import './_group.css';
import './AboutRedesign.css';

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
  { href: '/about/history', title: 'Our history', lead: 'From a small marine engine named Ajax to the security entrances we make today, Bamford’s story has always been shaped by engineering and family.', category: 'The story' },
  { href: '/about/factory', title: 'Our Factory', lead: 'Made in Stockport, built around your project. Bespoke security doors and screens from our purpose-built 68,000 sq ft factory and office.', category: 'How we make' },
  { href: '/about/sustainability', title: 'Sustainability', lead: 'Bamford recognises its responsibility to procure and manufacture goods and services sustainably, protect the environment and work towards net zero.', category: 'Our responsibility' },
  { href: '/about/accreditations', title: 'Accreditations', lead: 'Bamford Doors is committed to earning your trust through recognised standards and independent assessment.', category: 'Our responsibility' },
  { href: '/about/meet-the-team', title: 'Meet the team', lead: 'Meet the people who coordinate Bamford’s projects, installations, production and regional client support.', category: 'The people' },
  { href: '/about/aluminium-versus-steel', title: 'Aluminium versus steel', lead: 'Compare aluminium and steel doors for corrosion, maintenance, strength, weight and whole-project requirements.', category: 'Design decisions' },
  { href: '/about/corporate-social-responsibility', title: 'Corporate social responsibility', lead: 'Bamford Doors contributes to the communities it works in through charitable giving, practical support, school and college partnerships, and work with housing associations.', category: 'Our responsibility' },
  { href: '/about/unique-environments', title: 'Unique environments', lead: 'Some buildings have specific setting and exposure requirements.', category: 'Design decisions' },
  { href: '/about/conservation-areas', title: 'Conservation areas', lead: 'Explore bespoke communal entrance design for conservation areas, with guidance on finishes, planning context and access.', category: 'Design decisions' },
  { href: '/about/coastal-applications', title: 'Coastal applications', lead: 'Plan communal entrances for salt-laden air, wind-driven rain and demanding coastal exposure.', category: 'Design decisions' },
];

function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <div className="topline"><span>DESIGNED · MANUFACTURED · INSTALLED</span><span>UK-wide service for public and commercial buildings</span></div>
    <header className="header">
      <div className="header-inner">
        <a href="/" className="brand" aria-label="Bamford Doors home"><img src="/__mockup/images/bamford-doors-wordmark.png" alt="Bamford Doors" /></a>
        <nav className="nav" aria-label="Main navigation">{navItems.map(([label, path]) => <a key={path} href={path} aria-current={path === '/about' ? 'page' : undefined}>{label}</a>)}</nav>
        <a className="nav-cta" href="/contact?purpose=consultation">Start an enquiry <ArrowRight size={15} /></a>
        <button className="menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, path]) => <a key={path} href={path} onClick={() => setOpen(false)}>{label}</a>)}<a className="nav-cta" href="/contact?purpose=consultation" onClick={() => setOpen(false)}>Start an enquiry <ArrowRight size={15} /></a></nav>}
    </header>
  </>;
}

function Footer() {
  return <footer className="footer">
    <div className="wrap">
      <div className="footer-grid">
        <div className="footer-brand"><img className="footer-logo" src="/__mockup/images/bamford-doors-footer-logo.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div>
        <div><h3>Explore</h3>{navItems.slice(1, 5).map(([label, path]) => <a key={path} href={path}>{label}</a>)}<a href="/news-insights">News &amp; insights</a></div>
        <div><h3>About</h3><a href="/about">About Bamford</a><a href="/faq">Frequently asked questions</a><a href="/downloads">Documents and downloads</a></div>
        <div><h3>Start a conversation</h3><p>Tell us what your building needs.</p><a href="/contact">Contact Bamford <ArrowRight size={13} /></a></div>
      </div>
      <div className="footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span></div>
    </div>
  </footer>;
}

export function AboutRedesign() {
  return <div className="site-shell about-redesign">
    <Header />
    <main className="main">
      <section className="ar-hero">
        <div className="ar-hero-copy">
          <p className="eyebrow"><span className="ar-mark" /> About Bamford</p>
          <h1>Made for<br />the <em>entrance.</em></h1>
          <p className="ar-hero-lead">Custom-made, vandal-resistant security doors and screens—designed, manufactured and installed for public and commercial buildings.</p>
          <div className="ar-hero-actions"><a className="button" href="/about/factory">Inside our factory <ArrowRight size={16} /></a><a className="ar-text-link" href="/contact">Talk to our team <MoveUpRight size={15} /></a></div>
          <div className="ar-hero-foot"><span>01 / ABOUT BAMFORD</span><span>Stockport, UK</span></div>
        </div>
        <div className="ar-hero-image">
          <img src="/__mockup/images/about-team-reviewing-workshop.jpg" alt="Bamford team members reviewing work together in the workshop" />
          <span className="ar-image-caption">People, process, and the work in between.</span>
          <span className="ar-image-index">A closer look <i /> Bamford Doors</span>
        </div>
      </section>

      <section className="ar-proof" aria-label="About Bamford at a glance">
        <div className="wrap ar-proof-inner">
          <span className="ar-proof-label">Built around the building</span>
          <p>Working with local authorities, housing associations, schools and other public and commercial building teams.</p>
          <a href="/about/meet-the-team">Meet the people behind the projects <ArrowRight size={14} /></a>
        </div>
      </section>

      <section className="ar-making">
        <div className="wrap ar-making-grid">
          <div className="ar-making-heading">
            <p className="eyebrow">Made in Stockport</p>
            <h2>From the first conversation to the finished entrance.</h2>
            <p className="ar-making-caption">Bespoke security doors and screens, made around your project.</p>
          </div>
          <div className="ar-making-story">
            <div className="ar-making-photo"><img src="/__mockup/images/about-workshop-production.jpg" alt="Materials and components arranged along the Bamford workshop production line" /><span>01 — Workshop production</span></div>
            <div className="ar-making-note"><span className="ar-note-rule" /><p>Bamford designs, manufactures and installs custom-made security doors and screens from its purpose-built 68,000 sq ft factory and office.</p><a className="ar-text-link" href="/about/factory">Explore the factory <MoveUpRight size={15} /></a></div>
          </div>
        </div>
      </section>

      <section className="ar-directory">
        <div className="wrap">
          <div className="ar-directory-head">
            <div><p className="eyebrow">Know us better</p><h2>More about Bamford.</h2></div>
            <p>Get to know the company, the people and the decisions behind a project. Start wherever your questions are.</p>
          </div>
          <div className="ar-directory-layout">
            <div className="ar-directory-aside">
              <div className="ar-profile-image"><img src="/__mockup/images/about-aluminium-profiles.jpg" alt="Aluminium profiles used in door and screen manufacture" /></div>
              <p className="ar-aside-count"><strong>10</strong><span>ways to find out more</span></p>
              <p className="ar-aside-copy">From company history to specific building settings, find the right detail for your next decision.</p>
            </div>
            <div className="ar-link-groups">
              {[
                { label: 'The story & the people', items: companyPages.filter(page => ['The story', 'The people'].includes(page.category)) },
                { label: 'How we work', items: companyPages.filter(page => ['How we make', 'Our responsibility'].includes(page.category)) },
                { label: 'Design decisions', items: companyPages.filter(page => page.category === 'Design decisions') },
              ].map(group => <section className="ar-link-group" key={group.label}>
                <h3>{group.label}</h3>
                {group.items.map((page, index) => <a className="ar-directory-link" href={page.href} key={page.href}>
                  <span className="ar-link-number">{String(index + 1).padStart(2, '0')}</span><span className="ar-link-copy"><strong>{page.title}</strong><small>{page.lead}</small></span><MoveUpRight size={17} className="ar-link-arrow" />
                </a>)}
              </section>)}
            </div>
          </div>
        </div>
      </section>

      <section className="ar-contact">
        <div className="wrap ar-contact-inner">
          <div><p className="eyebrow">Talk to Bamford</p><h2>Tell us about your building.</h2><p>Tell us about your building, entrance or project and our team can help with the next step.</p></div>
          <a href="/contact" className="button">Contact our team <ArrowRight size={16} /></a>
          <span className="ar-contact-index">BAMFORD / CONTACT</span>
        </div>
      </section>
    </main>
    <Footer />
  </div>;
}
