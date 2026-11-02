import { useState } from 'react';
import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import './corporate-social-responsibility.css';

const videos = {
  general: {
    url: 'https://cdn.sanity.io/files/ih9rxf6u/production/6dfefc09a719311833e08f430853366d0c6b5c54.mp4',
    poster: 'csr-social-value-poster.jpg',
    title: 'Bamford Doors social value video',
  },
  defib: {
    url: 'https://cdn.sanity.io/files/ih9rxf6u/production/6fe23c8e67f654171d632593b6a3dcd3541240e6.mp4',
    poster: 'csr-defib-poster.jpg',
    title: 'Bamford Doors Defib Giveaway in Nottingham video',
  },
};

const sections = [
  {
    number: '01',
    id: 'local-causes',
    title: 'Supporting local causes',
    paragraphs: [
      'We make annual donations to charities and community organisations, and run a Christmas toy appeal each year to help bring some extra joy to families during the festive season. We also make monthly contributions to Your Local Pantry, helping support a service that provides local people with access to affordable food and a welcoming community space.',
      'Our support is not limited to donations. We aim to contribute in ways that respond to real needs and help strengthen the organisations and neighbourhoods around us.',
    ],
  },
  {
    number: '02',
    id: 'young-people',
    title: 'Creating opportunities for young people',
    paragraphs: [
      'We work with local schools and colleges to help young people prepare for the next stage of their working lives. This includes training, interview preparation, mentoring and apprenticeship opportunities.',
      'By sharing our experience and introducing students to the world of work, we hope to help them build confidence, explore potential career paths and take practical steps towards future employment. We value these partnerships and the chance to support local talent as it develops.',
    ],
  },
  {
    number: '03',
    id: 'housing-associations',
    title: 'Working with housing associations',
    paragraphs: [
      'We also work with housing associations to create opportunities that benefit residents and communities. Our quarterly giveaway competitions have included door giveaways and communal garden makeovers, helping improve shared spaces and the places people call home.',
      'These projects give us the chance to use our skills and resources in a practical way, while working alongside housing providers to support residents and improve their local surroundings.',
    ],
  },
  {
    number: '04',
    id: 'getting-involved',
    title: 'Getting involved together',
    paragraphs: [
      'From charity challenges and toy appeals to school mentoring and community projects, our social value work depends on people getting involved. We’re proud of the contribution our colleagues make and the relationships we continue to build with local organisations.',
      'We’ll keep looking for ways to support our community, share our skills and make a useful contribution through the work we do.',
    ],
  },
];

function DirectVideoPlayer({ video, testId }: { video: typeof videos.general; testId: string }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className="csr-video">
      <div className="csr-video-frame">
        <video
          controls
          playsInline
          preload="none"
          poster={`${import.meta.env.BASE_URL}media/${video.poster}`}
          aria-label={video.title}
          onError={() => setFailed(true)}
          data-testid={`video-${testId}`}
        >
          <source src={video.url} type="video/mp4" onError={() => setFailed(true)} />
          Your browser does not support embedded video. <a href={video.url}>Open the video file</a>.
        </video>
      </div>
      {failed && (
        <p className="csr-video-error" role="status">
          The video could not be loaded. <a href={video.url} target="_blank" rel="noopener noreferrer">Try opening the MP4 directly</a>.
        </p>
      )}
    </div>
  );
}

export function CorporateSocialResponsibilityPage() {
  return (
    <main className="csr-page">
      <section className="csr-hero">
        <div className="wrap">
          <nav className="csr-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Corporate Social Responsibility</span>
          </nav>
          <div className="csr-hero-grid">
            <div className="csr-hero-copy">
              <p className="eyebrow">Social value</p>
              <h1>Corporate Social Responsibility</h1>
            </div>
            <div className="csr-hero-intro">
              <p className="csr-hero-lead">
                At Bamford Doors, we believe being a responsible business means contributing to the communities we work in and creating opportunities for people to thrive. Our social value work brings together charitable giving, practical support and long-term relationships with local organisations.
              </p>
              <p>
                Our colleagues play an active part in this work through our in-house charity team and monthly challenges. Together, we support causes that matter to our staff and our community, and look for practical ways to make a positive difference throughout the year.
              </p>
              <a className="csr-scroll-link" href="#csr-sections" data-testid="link-csr-explore">
                How we contribute <ArrowRight size={15} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="csr-feature" aria-labelledby="csr-feature-heading">
        <div className="wrap">
          <div className="csr-feature-head">
            <p className="eyebrow">Watch</p>
            <h2 id="csr-feature-heading">Our social value <em>in practice.</em></h2>
          </div>
          <DirectVideoPlayer video={videos.general} testId="social-value" />
        </div>
      </section>
      <section className="csr-sections" id="csr-sections" aria-label="Our social value work">
        <div className="wrap">
          {sections.map((s) => (
            <article className="csr-row" key={s.id} id={s.id} aria-labelledby={`${s.id}-heading`} data-testid={`section-csr-${s.id}`}>
              <div className="csr-row-head">
                <span className="csr-number">{s.number}</span>
                <h2 id={`${s.id}-heading`}>{s.title}</h2>
              </div>
              <div className="csr-row-copy">
                {s.paragraphs.map((p) => <p key={p}>{p}</p>)}
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="csr-community" aria-labelledby="csr-defib-heading">
        <div className="wrap csr-community-grid">
          <div className="csr-community-copy">
            <p className="eyebrow">In the community</p>
            <h2 id="csr-defib-heading">Defib Giveaway in Nottingham</h2>
            <p>Watch the video from our Defib Giveaway in Nottingham.</p>
          </div>
          <DirectVideoPlayer video={videos.defib} testId="defib-nottingham" />
        </div>
      </section>
      <section className="csr-closing">
        <div className="wrap csr-closing-inner">
          <div>
            <p className="eyebrow">Talk to Bamford</p>
            <h2>Talk to us about
            your new door project</h2>
            <p>Tell the team which project criteria or information you need to discuss.</p>
          </div>
          <Link href="/contact?purpose=consultation" className="button" data-testid="link-csr-contact">
            Contact our team <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
