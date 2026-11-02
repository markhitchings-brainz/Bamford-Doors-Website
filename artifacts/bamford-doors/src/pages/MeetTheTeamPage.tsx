import { useState } from 'react';
import { ArrowRight, ChevronRight, Linkedin, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';
import './meet-the-team.css';

const mediaBase = 'https://bamforddoors.com/wp-content/uploads';

type TeamMember = {
  name: string;
  initials: string;
  role: string;
  bio?: string;
  image?: string;
  imagePosition?: string;
  phone?: string;
  email?: string;
  linkedin?: string;
};

const team: TeamMember[] = [
  {
    name: 'Alexis Smith',
    initials: 'AS',
    role: 'Managing Director',
    bio: 'Leads Bamford Doors and oversees decision-making across the business.',
    image: `${mediaBase}/2021/04/Alexis-Smith-1.jpg`,
    email: 'alexis@bamforddoors.com',
    linkedin: 'https://linkedin.com/in/alexis-smith-24317918',
    imagePosition: 'center 24%',
  },
  {
    name: 'Tracey Leigh',
    initials: 'TL',
    role: 'Installation Manager',
    bio: 'Project manages orders and installations from planning through to delivery.',
    phone: '07917 415109',
    email: 'tracey@bamforddoors.com',
    linkedin: 'https://linkedin.com/in/tracey-leigh-baa24b1a5',
  },
  {
    name: 'Mark Rodway',
    initials: 'MR',
    role: 'South England Operations Manager',
    bio: 'Works with clients across the South of England on communal entrance solutions.',
    image: `${mediaBase}/2021/04/mark.jpg`,
    phone: '07557 969845',
    email: 'mark@bamforddoors.com',
    linkedin: 'https://linkedin.com/in/mark-rodway-52a7ba25',
    imagePosition: 'center 26%',
  },
  {
    name: 'Simon Miehe',
    initials: 'SM',
    role: 'Production Manager',
    bio: 'Controls and manages the production schedules.',
    phone: '01614 806500',
    email: 'simon@bamforddoors.com',
  },
  {
    name: 'Steve Harris',
    initials: 'SH',
    role: 'Business Development Manager, South East',
    bio: 'Supports clients in the South East with their communal entrance requirements.',
    image: `${mediaBase}/2023/05/steve-harris-300x300-1.jpg`,
    phone: '07436 406863',
    email: 'steve@bamforddoors.com',
    imagePosition: 'center 24%',
  },
  {
    name: 'Tony Bopko',
    initials: 'TB',
    role: 'Business Development Manager, South West',
    bio: 'Works with clients across the South West on communal entrance solutions.',
    image: `${mediaBase}/2021/04/tony-1.jpg`,
    phone: '07884 333884',
    email: 'tony@bamforddoors.com',
    linkedin: 'https://linkedin.com/in/tony-bopko-b0ba1a38',
    imagePosition: 'center 24%',
  },
  {
    name: 'Stuart Mee',
    initials: 'StM',
    role: 'Business Development Manager, Midlands',
    bio: 'Works with clients across the Midlands on communal entrance solutions.',
    image: `${mediaBase}/2021/04/stuart-mee-1.jpg`,
    phone: '07879 333923',
    email: 'stuart@bamforddoors.com',
    linkedin: 'https://linkedin.com/in/stuart-mee-396aba19',
    imagePosition: 'center 24%',
  },
  {
    name: 'Gary Eastham',
    initials: 'GE',
    role: 'Purchasing Manager',
    bio: 'Leads purchasing for Bamford Doors.',
    image: `${mediaBase}/2021/03/gary-new.jpg`,
    email: 'gary@bamfordajax.com',
    imagePosition: 'center 22%',
  },
  {
    name: 'Michelle Thomson',
    initials: 'MT',
    role: 'Sales and Marketing Co-ordinator',
    bio: 'Supports sales and marketing for Bamford Doors.',
    image: `${mediaBase}/2022/05/Photo-Me-1.png`,
    phone: '07799 2896127',
    email: 'michelle@bamforddoors.com',
    linkedin: 'https://linkedin.com/in/michelle-thomson-83716627',
    imagePosition: 'center 22%',
  },
  {
    name: 'Dan Heighway',
    initials: 'DH',
    role: 'Operations Manager',
    image: `${mediaBase}/2021/03/dan-new.jpg`,
    email: 'dan@bamforddoors.com',
    imagePosition: 'center 24%',
  },
];

function TeamPortrait({ member, index }: { member: TeamMember; index: number }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="team-card-photo">
      {member.image && !imageFailed ? (
        <img
          src={member.image}
          alt={`Portrait of ${member.name}`}
          style={{ objectPosition: member.imagePosition }}
          referrerPolicy="no-referrer"
          loading="eager"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="team-photo-placeholder" role="img" aria-label={`Portrait placeholder for ${member.name}`}>
          <span>{member.initials}</span>
          <small>{member.image ? 'Photo unavailable' : 'Portrait coming soon'}</small>
        </div>
      )}
      <span className="team-card-index">{String(index + 1).padStart(2, '0')}</span>
    </div>
  );
}

export function MeetTheTeamPage() {
  return (
    <main className="team-page">
      <section className="team-hero">
        <div className="wrap">
          <nav className="team-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Meet the team</span>
          </nav>
          <div className="team-hero-copy">
            <p className="eyebrow">The people behind the work</p>
            <h1>Meet the team</h1>
            <p>
              From production and installation to regional project support, meet the people who help
              deliver Bamford’s entrance solutions.
            </p>
          </div>
          <div className="team-hero-note">
            <span>01 — 10</span>
            <p>One team, from first conversation to finished entrance.</p>
          </div>
        </div>
      </section>

      <section className="team-section wrap" aria-labelledby="team-grid-heading">
        <div className="team-section-heading">
          <div>
            <p className="eyebrow">People and responsibilities</p>
            <h2 id="team-grid-heading">Here to help your project move forward.</h2>
          </div>
          <p>
            Contact the relevant team member directly, or speak with us about your building and we’ll
            help connect you with the right person.
          </p>
        </div>

        <div className="team-grid">
          {team.map((member, index) => (
            <article className="team-card" key={member.name}>
              <TeamPortrait member={member} index={index} />
              <div className="team-card-body">
                <p className="team-role">{member.role}</p>
                <h3>{member.name}</h3>
                {member.bio && <p className="team-bio">{member.bio}</p>}
                <div className="team-card-links">
                  {member.phone && (
                    <a href={`tel:${member.phone.replace(/\s+/g, '')}`} aria-label={`Call ${member.name} at ${member.phone}`}>
                      <Phone size={14} aria-hidden="true" />
                      <span>{member.phone}</span>
                    </a>
                  )}
                  {member.email && (
                    <a href={`mailto:${member.email}`} aria-label={`Email ${member.name}`}>
                      <Mail size={14} aria-hidden="true" />
                      <span>Email</span>
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${member.name} on LinkedIn`}
                    >
                      <Linkedin size={14} aria-hidden="true" />
                      <span>LinkedIn</span>
                    </a>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="team-factory" aria-labelledby="team-factory-heading">
        <div className="wrap">
          <div className="team-factory-heading">
            <p className="eyebrow">The factory</p>
            <h2 id="team-factory-heading">A purpose-built home for making.</h2>
            <p>
              Bamford operates from a purpose-built factory and office in Stockport, bringing
              manufacturing and project teams together.
            </p>
          </div>
          <div className="team-factory-stats">
            <div><strong>68,000</strong><span>square foot factory<br />and office</span></div>
            <div><strong>60</strong><span>doors and screens<br />per standard week</span></div>
            <div><strong>90</strong><span>doors and screens per week<br />when required</span></div>
          </div>
        </div>
      </section>

      <section className="team-contact">
        <div className="wrap team-contact-inner">
          <div>
            <p className="eyebrow">Start a conversation</p>
            <h2>Tell us what your building needs.</h2>
          </div>
          <Link href="/contact" className="button">
            Contact Bamford <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
