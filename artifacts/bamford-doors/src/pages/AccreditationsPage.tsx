import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import './accreditations.css';

const credentials = [
  {
    category: 'Quality management',
    title: 'BS EN ISO 9001:2015',
    image: '/media/accreditations/iso-9001.jpg',
    imageAlt: 'BSI ISO 9001:2015 Quality Management assurance mark',
    body: 'The quality management system operated by F. Bamford Engineering Ltd satisfies the requirements of BS EN ISO 9001:2015. This helps ensure that the product provided meets customer and regulatory requirements.',
  },
  {
    category: 'Design and security',
    title: 'Secured by Design',
    image: '/media/accreditations/secured-by-design.png',
    imageAlt: 'Secured by Design Police Preferred Specification mark',
    body: 'Secured by Design focuses on the design and security of new and refurbished homes. Bamford Doors is a member, and a number of our door entry and access control products have passed the required testing to be specified as “Police Preferred”.',
  },
  {
    category: 'Construction supplier',
    title: 'Constructionline Gold',
    mark: 'CONSTRUCTIONLINE',
    markNote: 'GOLD MEMBER',
    body: 'Constructionline is the UK register of local and national construction contractors. Gold membership means Bamford Doors has completed additional scrutiny and met the Gold-level pre-qualification standard.',
  },
  {
    category: 'Social value',
    title: 'Constructionline Social Value',
    mark: 'SOCIAL VALUE',
    markNote: 'CONSTRUCTIONLINE',
    body: 'Alongside Gold membership, the Social Value mark reflects equality, diversity and inclusion processes, equal opportunities, good working conditions, support for workers’ mental wellbeing and engagement with local communities.',
  },
  {
    category: 'Health and safety',
    title: 'CHAS',
    image: '/media/accreditations/chas.webp',
    imageAlt: 'CHAS health and safety mark',
    body: 'F. Bamford Engineering Ltd is CHAS approved. CHAS assesses an organisation’s health and safety policy, organisation and specific arrangements against strict criteria.',
  },
  {
    category: 'Health and safety',
    title: 'Safecontractor and Acclaim',
    image: '/media/accreditations/once-for-all-health-safety.webp',
    imageAlt: 'Once For All Health & Safety logo',
    body: 'Safecontractor is a recognised third-party health and safety assessment scheme. It reviews an organisation’s policies, procedures and supporting documents against industry standards. Bamford’s health and safety credentials also include Acclaim.',
  },
  {
    category: 'Certification',
    title: 'CertiSecure',
    image: '/media/accreditations/certisecure.jpg',
    imageAlt: 'CertiSecure logo',
    body: 'For current certification scope and the products or projects it applies to, please contact the Bamford team.',
  },
  {
    category: 'UK manufacturing',
    title: 'Made in the UK',
    image: '/media/accreditations/made-in-uk.jpeg',
    imageAlt: 'Made in the UK mark',
    body: 'Bamford Doors designs, manufactures and installs custom-made entrance systems for buildings across the UK.',
  },
  {
    category: 'People and site credentials',
    title: 'CSCS and Disability Confident',
    mark: 'PEOPLE',
    markNote: 'SITE READY · INCLUSIVE',
    body: 'Bamford site personnel hold current CSCS cards. Disability Confident Committed status reflects a commitment to inclusive recruitment and workplace practices.',
  },
];

export function AccreditationsPage() {
  return (
    <main className="accreditations-page">
      <section className="acc-hero">
        <div className="wrap">
          <nav className="acc-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Accreditations</span>
          </nav>
          <p className="eyebrow">Quality · Safety · Accountability</p>
          <h1>Accreditations</h1>
          <p className="acc-hero-lead">
            Recognised standards and independent assessment underpin the way we work.
          </p>
        </div>
      </section>

      <section className="acc-intro wrap" aria-labelledby="acc-intro-title">
        <div className="acc-intro-heading">
          <p className="eyebrow">The standards behind the work</p>
          <h2 id="acc-intro-title">Confidence, built on evidence.</h2>
        </div>
        <div className="acc-intro-copy">
          <p>
            Bamford Doors is committed to earning your trust through recognised standards and
            independent assessment. Our ISO 9001:2015 quality management system helps ensure our
            products and services meet customer and regulatory requirements, while Constructionline
            Gold membership reflects the additional scrutiny we have met as a construction supplier.
          </p>
          <p>
            Safety and security are central to our work. We’re a member of Secured by Design, and
            relevant products have passed the required testing to be specified as “Police Preferred.”
            Our health and safety practices are also assessed through schemes including CHAS,
            Safecontractor and Acclaim, and our site personnel hold current CSCS cards.
          </p>
          <p>
            These accreditations represent more than badges: they reflect our commitment to
            accountability, consistent quality and doing the job to a higher standard. Alongside our
            technical and safety credentials, our Constructionline Social Value mark and Disability
            Confident Committed status speak to our responsibilities to our people, our communities
            and inclusive workplaces.
          </p>
        </div>
      </section>

      <section className="acc-credentials" aria-labelledby="acc-credentials-title">
        <div className="wrap">
          <div className="acc-section-heading">
            <div>
              <p className="eyebrow">Recognised credentials</p>
              <h2 id="acc-credentials-title">Standards in practice.</h2>
            </div>
            <p>
              Each assessment and membership supports a more accountable approach to quality,
              safety and the communities our work serves.
            </p>
          </div>

          <div className="acc-card-grid">
            {credentials.map((credential) => (
              <article className="acc-card" key={credential.title}>
                <div className={`acc-card-mark${credential.image ? '' : ' acc-card-mark-text'}`}>
                  {credential.image ? (
                    <img src={credential.image} alt={credential.imageAlt} />
                  ) : (
                    <div className="acc-text-mark">
                      <strong>{credential.mark}</strong>
                      <span>{credential.markNote}</span>
                    </div>
                  )}
                </div>
                <div className="acc-card-copy">
                  <p className="acc-card-category">{credential.category}</p>
                  <h3>{credential.title}</h3>
                  <p>{credential.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="acc-contact-band">
        <div className="wrap acc-contact-inner">
          <div>
            <p className="eyebrow">Need more information?</p>
            <h2>Ask us about a standard or scheme.</h2>
            <p>
              Tell us which accreditation, policy or project requirement you need to verify, and
              we’ll help direct your enquiry.
            </p>
          </div>
          <Link href="/contact" className="button">
            Contact our team <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}
