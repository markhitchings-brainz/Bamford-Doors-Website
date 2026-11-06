import { ArrowRight, MoveUpRight } from 'lucide-react';
import { Link } from 'wouter';
import './aboutOverview.css';

type AboutOverviewLink = { href: string; title: string; lead: string };

const linkGroups = [
  { label: 'The story & the people', paths: ['/about/history', '/about/meet-the-team'] },
  { label: 'How we work', paths: ['/about/factory', '/about/sustainability', '/about/accreditations', '/about/corporate-social-responsibility'] },
  { label: 'Design decisions', paths: ['/about/aluminium-versus-steel', '/about/unique-environments', '/about/conservation-areas', '/about/coastal-applications'] },
];

export function AboutOverviewPage({ pages }: { pages: AboutOverviewLink[] }) {
  const groups = linkGroups.map((group) => ({
    ...group,
    items: group.paths
      .map((href) => pages.find((page) => page.href === href))
      .filter((page): page is AboutOverviewLink => Boolean(page)),
  })).filter((group) => group.items.length > 0);
  let linkNumber = 0;

  return (
    <main className="main about-redesign">
      <section className="ar-hero">
        <div className="ar-hero-copy">
          <p className="eyebrow"><span className="ar-mark" /> About Bamford</p>
          <h1>Made for<br />the <em>entrance.</em></h1>
          <p className="ar-hero-lead">Custom-made, vandal-resistant security doors and screens—designed, manufactured and installed for public and commercial buildings.</p>
          <div className="ar-hero-actions">
            <Link className="button" href="/about/factory">Inside our factory <ArrowRight size={16} /></Link>
            <Link className="ar-text-link" href="/contact">Talk to our team <MoveUpRight size={15} /></Link>
          </div>
          <div className="ar-hero-foot"><span>01 / ABOUT BAMFORD</span><span>Stockport, UK</span></div>
        </div>
        <div className="ar-hero-image">
          <img src="/media/bamford-project-team-reviewing-workshop.jpg" alt="Bamford team members reviewing work together in the workshop" />
          <span className="ar-image-caption">People, process, and the work in between.</span>
          <span className="ar-image-index">A closer look <i /> Bamford Doors</span>
        </div>
      </section>

      <section className="ar-proof" aria-label="About Bamford at a glance">
        <div className="wrap ar-proof-inner">
          <span className="ar-proof-label">Built around the building</span>
          <p>Working with local authorities, housing associations, schools and other public and commercial building teams.</p>
          <Link href="/about/meet-the-team">Meet the people behind the projects <ArrowRight size={14} /></Link>
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
            <div className="ar-making-photo">
              <img src="/media/factory-hero-poster.jpg" alt="Materials and components arranged along the Bamford workshop production line" loading="lazy" />
              <span>01 — Workshop production</span>
            </div>
            <div className="ar-making-note">
              <span className="ar-note-rule" />
              <p>Bamford designs, manufactures and installs custom-made security doors and screens from its purpose-built 68,000 sq ft factory and office.</p>
              <Link className="ar-text-link" href="/about/factory">Explore the factory <MoveUpRight size={15} /></Link>
            </div>
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
              <div className="ar-profile-image">
                <img src="/media/bamford-aluminium-profiles-workshop.jpg" alt="Aluminium profiles used in door and screen manufacture" loading="lazy" />
              </div>
              <p className="ar-aside-count"><strong>{pages.length}</strong><span>ways to find out more</span></p>
              <p className="ar-aside-copy">From company history to specific building settings, find the right detail for your next decision.</p>
            </div>
            <div className="ar-link-groups">
              {groups.map((group) => (
                <section className="ar-link-group" key={group.label}>
                  <h3>{group.label}</h3>
                  {group.items.map((page) => (
                    <Link className="ar-directory-link" href={page.href} key={page.href}>
                      <span className="ar-link-number">{String(++linkNumber).padStart(2, '0')}</span>
                      <span className="ar-link-copy"><strong>{page.title}</strong><small>{page.lead}</small></span>
                      <MoveUpRight size={17} className="ar-link-arrow" />
                    </Link>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ar-contact">
        <div className="wrap ar-contact-inner">
          <div>
            <p className="eyebrow">Talk to Bamford</p>
            <h2>Tell us about your building.</h2>
            <p>Tell us about your building, entrance or project and our team can help with the next step.</p>
          </div>
          <Link href="/contact" className="button">Contact our team <ArrowRight size={16} /></Link>
          <span className="ar-contact-index">BAMFORD / CONTACT</span>
        </div>
      </section>
    </main>
  );
}
