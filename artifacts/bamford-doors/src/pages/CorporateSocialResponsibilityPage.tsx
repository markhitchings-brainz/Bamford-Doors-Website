import { useRef, useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
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

const csrPhotos = [
  {
    image: 'community-garden-seating.webp',
    alt: 'Raised wooden planters and seating built in a community garden.',
    caption: 'A more welcoming community garden',
  },
  {
    image: 'garden-volunteers-at-work.webp',
    alt: 'Bamford colleagues assembling raised planters and arranging plants in a garden.',
    caption: 'Colleagues helping build the garden',
  },
  {
    image: 'christmas-toy-appeal.webp',
    alt: 'Bamford colleagues with donated toys and Christmas gifts.',
    caption: 'The annual Christmas toy appeal',
  },
  {
    image: 'community-garden-team.webp',
    alt: 'Bamford colleagues and local residents gathered in the completed community garden.',
    caption: 'Working together in the garden',
  },
  {
    image: 'girlguiding-leadership.webp',
    alt: 'A Girlguiding leadership achievement celebrated with a certificate and badge.',
    caption: 'Supporting young leaders',
  },
  {
    image: 'community-garden-volunteers.webp',
    alt: 'A Bamford colleague and community volunteers in a garden with new seating and planting.',
    caption: 'A community garden project',
  },
  {
    image: 'local-pantry-support.webp',
    alt: 'A local pantry volunteer beside donated groceries and a bicycle.',
    caption: 'Support for a local pantry',
  },
  {
    image: 'pantry-christmas-donations.webp',
    alt: 'Colleagues presenting Christmas food and gifts at a local pantry.',
    caption: 'Sharing Christmas donations',
  },
  {
    image: 'young-people-awards.webp',
    alt: 'Young people and local employers recognised at an awards event.',
    caption: 'Recognising young people',
  },
  {
    image: 'neighbourhood-clean-up.webp',
    alt: 'Bamford colleagues in high-visibility vests taking part in a neighbourhood clean-up.',
    caption: 'A neighbourhood clean-up',
  },
  {
    image: 'volunteer-litter-pick.webp',
    alt: 'Colleagues collecting litter along a path beside a green fence.',
    caption: 'Keeping shared spaces tidy',
  },
  {
    image: 'community-clean-up-team.webp',
    alt: 'Bamford volunteers gathering litter and clearing leaves from shared outdoor spaces.',
    caption: 'Volunteers out in the community',
  },
  {
    image: 'community-clean-up-collage.webp',
    alt: 'A collage of colleagues collecting litter during a community clean-up.',
    caption: 'A team effort outdoors',
  },
  {
    image: 'volunteer-street-clean-up.webp',
    alt: 'Volunteers collecting litter along a roadside and footpath.',
    caption: 'Caring for local streets',
  },
  {
    image: 'flintshire-toy-donations.webp',
    alt: 'Bamford colleagues delivering Christmas toys and gifts in Flintshire.',
    caption: 'Christmas donations in Flintshire',
  },
  {
    image: 'fresh-start-award.webp',
    alt: 'Two colleagues celebrating a Fresh Start award.',
    caption: 'Celebrating community partners',
  },
  {
    image: 'making-a-difference-award.webp',
    alt: 'Kathy Smart and Alexis Smith holding a Making a Difference award.',
    caption: 'Making a Difference award',
  },
  {
    image: 'competition-bench-plaque.webp',
    alt: 'An engraved Bamford Doors competition plaque fixed to a new wooden garden bench.',
    caption: 'Spring is in the Air competition',
  },
  {
    image: 'wellspring-christmas-donation.webp',
    alt: 'Bamford colleagues delivering backpacks outside the decorated entrance to The Wellspring.',
    caption: 'Backpack donation at The Wellspring',
  },
  {
    image: 'sanctuary-toy-appeal.webp',
    alt: 'Sanctuary staff and Bamford colleagues with donated toys beneath a Christmas tree.',
    caption: 'A Christmas toy appeal at Sanctuary',
  },
  {
    image: 'community-defibrillator-support.webp',
    alt: 'A community representative and Bamford colleague beside a public defibrillator.',
    caption: 'Supporting community defibrillators',
  },
  {
    image: 'clothing-donation.webp',
    alt: 'Bamford colleagues and a community partner beside donated clothing.',
    caption: 'Clothing donation',
  },
  {
    image: 'winter-community-donation.webp',
    alt: 'Volunteers in high-visibility vests sharing winter essentials at a community stall.',
    caption: 'Winter support in the community',
  },
  {
    image: 'christmas-toy-donation-display.webp',
    alt: 'A close-up of toys and gifts collected for a Christmas donation.',
    caption: 'Gifts for the Christmas appeal',
  },
  {
    image: 'toy-appeal-community-team.webp',
    alt: 'Community partners and Bamford colleagues with a large collection of donated toys.',
    caption: 'The toy appeal brings people together',
  },
  {
    image: 'christmas-toy-donation-team.webp',
    alt: 'Volunteers standing behind a display of donated toys for families.',
    caption: 'A generous community collection',
  },
  {
    image: 'community-toy-donation.webp',
    alt: 'Local partners sorting boxes and bags of donated toys.',
    caption: 'Preparing gifts for local families',
  },
  {
    image: 'team-christmas-toy-donations.webp',
    alt: 'Bamford colleagues and community volunteers with Christmas gifts and toys.',
    caption: 'Colleagues supporting the toy appeal',
  },
  {
    image: 'toy-donation-volunteers.webp',
    alt: 'A group of volunteers behind a table of donated toys.',
    caption: 'Volunteers make the appeal possible',
  },
  {
    image: 'wellspring-backpack-donation.webp',
    alt: 'The Wellspring team with donated backpacks and a Bamford colleague.',
    caption: 'Backpacks for The Wellspring',
  },
  {
    image: 'christmas-donation-gifts.webp',
    alt: 'Red Christmas gift boxes filled with donated toys and games.',
    caption: 'Christmas gifts ready to share',
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
  const galleryRef = useRef<HTMLDivElement>(null);
  const scrollGallery = (direction: -1 | 1) => {
    const gallery = galleryRef.current;
    if (gallery) gallery.scrollBy({ left: direction * gallery.clientWidth * 0.78, behavior: 'auto' });
  };

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
              <EditablePageHeadline>Corporate Social Responsibility</EditablePageHeadline>
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
      <section className="csr-gallery" aria-labelledby="csr-gallery-heading">
        <div className="wrap">
          <div className="csr-gallery-head">
            <div>
              <p className="eyebrow">People · projects · partnerships</p>
              <h2 id="csr-gallery-heading">A closer look at our community work.</h2>
              <p className="csr-gallery-intro">A few moments from the causes, colleagues and local partnerships we’re proud to support.</p>
            </div>
            <div className="csr-gallery-controls" aria-label="Gallery controls">
              <button
                type="button"
                aria-label="Scroll to earlier photos"
                data-testid="button-csr-gallery-previous"
                onClick={() => scrollGallery(-1)}
              >
                <ChevronLeft size={18} aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Scroll to later photos"
                data-testid="button-csr-gallery-next"
                onClick={() => scrollGallery(1)}
              >
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
          <div
            className="csr-gallery-track"
            ref={galleryRef}
            role="region"
            aria-label="Scrollable gallery of Bamford community projects"
            tabIndex={0}
            data-testid="gallery-csr-photos"
          >
            {csrPhotos.map((photo, index) => (
              <figure className="csr-gallery-card" key={photo.image} data-testid={`card-csr-photo-${index + 1}`}>
                <div className="csr-gallery-image">
                  <img
                    src={`${import.meta.env.BASE_URL}media/csr-gallery/${photo.image}`}
                    alt={photo.alt}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <figcaption>
                  <span>{String(index + 1).padStart(2, '0')} / {String(csrPhotos.length).padStart(2, '0')}</span>
                  <strong>{photo.caption}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
          <p className="csr-gallery-hint">Scroll or swipe to explore all {csrPhotos.length} photos</p>
        </div>
      </section>
      <section className="csr-closing">
        <div className="wrap csr-closing-inner">
          <div>
            <p className="eyebrow">Talk to Bamford</p>
            <h2>Talk to us about
            your new door project</h2>
            <p>Talk to our helpful team about your upcoming project</p>
          </div>
          <Link href="/contact?purpose=consultation" className="button" data-testid="link-csr-contact">
            Contact our team <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </main>
  );
}
