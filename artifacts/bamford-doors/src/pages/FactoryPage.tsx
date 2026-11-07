import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ChevronRight, Mail, Phone } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './factory-page.css';

const factoryHeroVideo =
  'https://cdn.sanity.io/files/ih9rxf6u/production/66878f6c0ca8cfed1259d697024cb7f8a125db78.mp4';
const factoryHeroPoster = `${import.meta.env.BASE_URL}media/factory-hero-poster.jpg`;
const factoryRenovationVideo =
  'https://cdn.sanity.io/files/ih9rxf6u/production/ab133e08a808ec532e60c2aa9399572753ebec10.mp4';

const factoryImages = [
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/7bda16eb48df16be95e463bf54f66684dca6ea2c-1500x998.webp', label: 'Entrance doors and screens', alt: 'Finished entrance door and screen system in the factory' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/5ce3eb80a01ff72183243a0ec86433258e7f3af3-1500x998.webp', label: 'Glazed door sets', alt: 'Glazed door sets prepared for production' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/7b448d2abb10f562253d4fbf5adfe2539ab1faad-1500x998.webp', label: 'Glass components', alt: 'Glass components arranged on a workbench' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/34bf1018e704551636f3a20dbdaa743a4d096464-998x1500.webp', label: 'Aluminium sections', alt: 'Aluminium profiles stored ready for manufacture' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/486421e9bc51e5ee91bef96f5e43b15bae021f22-998x1500.webp', label: 'Materials in stock', alt: 'Door and screen materials held in factory storage' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/45b43129c0afa235b82ee60c6ef03342ce18cac7-998x1500.webp', label: 'Door manufacture', alt: 'Bamford door components arranged for assembly' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/68b203ea700275b260c30ff9d6549ad112ab8609-1500x998.webp', label: 'Production hardware', alt: 'Hardware components prepared for door production' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/78a222352f0850ec29c200e9135d8418ad1df2ef-998x1500.webp', label: 'Factory machinery', alt: 'Production machinery within the factory' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/43eb8a918f1015d4c2e8b6f66c7ff1bd680f72ee-998x1500.webp', label: 'Made by our team', alt: 'Bamford team member working on a door component' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/c258930701bba76ef1e79e422c6bdfe472ff2170-1500x998.webp', label: 'Door assembly', alt: 'Team assembling a door in the factory' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/e5aa1ba2e4714a4795b1adb402088503587af387-1500x998.webp', label: 'Precision machining', alt: 'Precision machining of a door profile' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/5dbe67f7ed60e8db7cddfe343a8f100fea902408-998x1500.webp', label: 'Manufacturing equipment', alt: 'Equipment used to process door components' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/c97f3a28fcff2a6acde86ff17a1d7ea61be05640-1500x998.webp', label: 'CNC manufacturing', alt: 'CNC machinery used in the production process' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/e69f3618f22d1d0eced4fd6f380d31e7a040722f-1500x998.webp', label: 'Automated production', alt: 'Automated machinery processing a door section' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/f2561d9b4cb10bad5940864430e387c109ad903d-1500x844.webp', label: 'Inside the factory', alt: 'Wide view across the Bamford factory floor' },
  { url: 'https://cdn.sanity.io/images/ih9rxf6u/production/ae86741e8c8ad62c9bf8cb543c5aa15602915855-1920x1080.jpg', label: 'Renovated factory exterior', alt: 'Exterior of the renovated Bamford factory in Stockport, showing its new roof and side walling' },
].map((image, index) => {
  const dimensions = image.url.match(/-(\d+)x(\d+)\.(?:webp|jpe?g)$/i);
  if (!dimensions) {
    throw new Error(`Factory image is missing its source dimensions: ${image.url}`);
  }

  return {
    ...image,
    width: Number(dimensions[1]),
    height: Number(dimensions[2]),
    number: index + 1,
  };
});

const featuredImageNumbers = new Set([15, 16]);
const factoryGalleryImages = factoryImages.filter((image) => !featuredImageNumbers.has(image.number));
const factoryImageWidths = [320, 480, 640, 800, 960, 1200, 1440, 1600, 1920];

function getFactoryImageUrl(url: string, width: number) {
  return `${url}?w=${width}&fit=max&auto=format&q=82`;
}

function FactoryPhoto({
  image,
  className = '',
}: {
  image: (typeof factoryImages)[number];
  className?: string;
}) {
  const sizes = className.includes('factory-gallery-item')
    ? '(max-width: 635px) calc((100vw - 46px) / 2), (max-width: 700px) 295px, (max-width: 760px) 189px, (max-width: 1368px) calc((100vw - 120px) / 3), 416px'
    : '(max-width: 700px) min(600px, calc(100vw - 36px)), (max-width: 1368px) calc(100vw - 88px), 1280px';
  const srcSet = [...new Set([...factoryImageWidths, image.width])]
    .filter((width) => width <= image.width)
    .sort((a, b) => a - b)
    .map((width) => `${getFactoryImageUrl(image.url, width)} ${width}w`)
    .join(', ');

  return (
    <figure className={`factory-photo ${className}`}>
      <img
        src={getFactoryImageUrl(image.url, Math.min(640, image.width))}
        srcSet={srcSet}
        sizes={sizes}
        width={image.width}
        height={image.height}
        alt={image.alt}
        loading="lazy"
        decoding="async"
      />
      <figcaption>
        <span>{String(image.number).padStart(2, '0')}</span>
        <span>{image.label}</span>
      </figcaption>
    </figure>
  );
}

const productTypes = [
  {
    title: 'Doors',
    detail: 'Aluminium modular, thermally broken, woodgrain-effect and GRP doors.',
  },
  {
    title: 'Entrance systems',
    detail: 'Automatic operators, louvred doors and side screens.',
  },
  {
    title: 'Building envelope',
    detail: 'Curtain walling, with options for different designs, glazing and finishes.',
  },
  {
    title: 'Project details',
    detail: 'Access and locking systems, closers or automatic operation.',
  },
];

function getLondonDateKey(date: Date) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));

  return `${values.year}-${values.month}-${values.day}`;
}

function getDailyIllustrativeOutput(dateKey: string) {
  let hash = 2166136261;

  for (const character of dateKey) {
    hash ^= character.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }

  return 60 + ((hash >>> 0) % 25);
}

function useDailyIllustrativeOutput() {
  const [output, setOutput] = useState<number | null>(null);

  useEffect(() => {
    let activeDate = '';
    const updateOutput = () => {
      const dateKey = getLondonDateKey(new Date());
      if (dateKey === activeDate) return;

      activeDate = dateKey;
      setOutput(getDailyIllustrativeOutput(dateKey));
    };

    updateOutput();
    const interval = window.setInterval(updateOutput, 60_000);
    return () => window.clearInterval(interval);
  }, []);

  return output;
}

type NetworkInformation = EventTarget & {
  effectiveType?: string;
  saveData?: boolean;
};

function useFactoryHeroVideoPreference() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    const isConstrainedConnection = () =>
      Boolean(connection?.saveData) || ['slow-2g', '2g', '3g'].includes(connection?.effectiveType ?? '');
    const updatePreference = () => {
      setShouldLoadVideo(!preference?.matches && !isConstrainedConnection());
    };

    updatePreference();

    preference?.addEventListener?.('change', updatePreference);
    connection?.addEventListener?.('change', updatePreference);
    return () => {
      preference?.removeEventListener?.('change', updatePreference);
      connection?.removeEventListener?.('change', updatePreference);
    };
  }, []);

  return shouldLoadVideo;
}

export function FactoryPage() {
  const shouldLoadVideo = useFactoryHeroVideoPreference();
  const dailyIllustrativeOutput = useDailyIllustrativeOutput();
  const renovationVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = renovationVideoRef.current;
    if (!video || typeof IntersectionObserver === 'undefined') return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        void video.play().catch(() => {
          // Native controls remain available if the browser requires a user gesture.
        });
      } else {
        video.pause();
      }
    }, { threshold: 0.25 });

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <main className="factory-page">
      <section className="factory-hero" aria-labelledby="factory-hero-title">
        <div className="factory-hero-media" aria-hidden="true">
          <ResponsiveImage className="factory-hero-poster" src={factoryHeroPoster} alt="" sizes="100vw" />
          {shouldLoadVideo && (
            <video
              className="factory-hero-video"
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              poster={factoryHeroPoster}
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={factoryHeroVideo} type="video/mp4" />
            </video>
          )}
        </div>
        <div className="factory-hero-content">
          <nav className="factory-crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Our Factory</span>
          </nav>
          <div className="factory-hero-copy">
            <p className="eyebrow">Design · Manufacture · Install</p>
            <EditablePageHeadline id="factory-hero-title">Our Factory</EditablePageHeadline>
            <p className="factory-hero-subtitle">
              Made in Stockport, <em>built around your project.</em>
            </p>
            <Link className="button" href="/contact?purpose=consultation" data-testid="link-factory-hero-consultation">
              Plan a project <ArrowRight size={15} aria-hidden="true" />
            </Link>
          </div>
          <div className="factory-hero-bottom">
            <span>Purpose-built factory &amp; office · Stockport</span>
            <a className="factory-scroll-link" href="#factory-overview" data-testid="link-factory-explore">
              Explore our factory <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="factory-intro wrap" id="factory-overview" aria-labelledby="factory-overview-title">
        <div className="factory-intro-heading">
          <p className="eyebrow">Made around the requirement</p>
          <h2 id="factory-overview-title">Designed and made <em>in-house.</em></h2>
        </div>
        <div className="factory-intro-copy">
          <p>
            Bamford Doors designs, manufactures and installs security doors and screens for housing
            associations, local authorities, schools and other public buildings.
          </p>
          <p>
            From our purpose-built 68,000 sq ft factory and office in Stockport, our team produces
            bespoke solutions for communal entrances and other demanding settings.
          </p>
          <p>
            Because we manufacture in-house, each door set can be tailored to the building and the
            people who use it. That can include a particular style or finish, side screens, door
            entry, access control or automatic operation, as well as different entrance layouts and
            project requirements.
          </p>
          <div className="factory-factline" aria-label="Factory overview facts">
            <div className="factory-fact">
              <strong>68,000</strong>
              <span>sq ft factory &amp; office</span>
            </div>
            <div className="factory-fact">
              <strong>Stockport</strong>
              <span>Designed and made in Britain</span>
            </div>
          </div>
        </div>
      </section>

      <section className="factory-intro-showcase wrap" aria-label="Inside the Stockport factory">
        <FactoryPhoto image={factoryImages[14]} className="factory-overview-photo" />
      </section>

      <section className="factory-renovation" aria-labelledby="factory-renovation-title">
        <div className="wrap factory-renovation-grid">
          <div className="factory-renovation-copy">
            <p className="eyebrow">A recently renewed workspace</p>
            <h2 id="factory-renovation-title">A factory ready for the work ahead.</h2>
            <p>
              Recently renovated to high environmental standards, our factory now has a new roof
              and new side walling, creating a high-end, modern factory space.
            </p>
          </div>
          <div className="factory-renovation-aside" aria-label="Factory renovation details">
            <div className="factory-renovation-note">
              <span>01 / RENOVATION</span>
              <strong>New roof</strong>
            </div>
            <div className="factory-renovation-note">
              <span>02 / RENOVATION</span>
              <strong>New side walling</strong>
            </div>
            <figure className="factory-renovation-video">
              <video
                ref={renovationVideoRef}
                controls
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                poster={getFactoryImageUrl(factoryImages[15].url, 1200)}
                aria-label="Bamford factory renovation video"
              >
                <source src={factoryRenovationVideo} type="video/mp4" />
                Your browser does not support embedded video.
              </video>
              <figcaption>
                <span>03</span>
                <span>Factory renovation · Stockport</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="factory-capacity" aria-labelledby="factory-capacity-title">
        <div className="wrap">
          <div className="factory-section-heading">
            <div>
              <p className="eyebrow">Flexible production, made to order</p>
              <h2 id="factory-capacity-title">A responsive production rhythm.</h2>
            </div>
            <p>
              A flexible working capacity supports individual projects as well as larger programmes
              of work.
            </p>
          </div>
          <div className="factory-capacity-grid">
            <div className="factory-capacity-copy">
              <p>
                Our factory can produce around 60 doors and screens in a standard working week, with
                capacity to increase to around 90 when required.
              </p>
              <div className="factory-capacity-number" aria-live="polite">
                <strong>{dailyIllustrativeOutput ?? '—'}</strong>
                <span>doors and screens / standard working week</span>
              </div>
              <p className="factory-capacity-figure-note">
                Illustrative figure, not a live production count.
              </p>
              <div className="factory-capacity-scale" aria-hidden="true">
                <span
                  style={{
                    width: `${Math.round(((dailyIllustrativeOutput ?? 60) / 90) * 100)}%`,
                  }}
                />
              </div>
              <div className="factory-capacity-range">
                <span>Standard <strong>~60</strong></span>
                <span>When required <strong>~90</strong></span>
              </div>
              <p>
                Each project has practical considerations, from the shape of the opening to
                accessibility and equipment that needs to work with the door. We work with clients
                and project partners to understand those details and develop a solution that fits
                the site.
              </p>
            </div>
            <div className="factory-spec-list" aria-label="Product options made at our factory">
              {productTypes.map((product, index) => (
                <div key={product.title}>
                  <span>0{index + 1}</span>
                  <div>
                    <strong>{product.title}</strong>
                    <p>{product.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="factory-gallery wrap" aria-labelledby="factory-gallery-title">
        <div className="factory-gallery-head">
          <div>
            <p className="eyebrow">Inside the works</p>
            <h2 id="factory-gallery-title">Stockport, at work.</h2>
          </div>
          <p>Browse materials, machinery and finished work in a clear view of production.</p>
        </div>
        <div className="factory-gallery-grid">
          {factoryGalleryImages.map((image) => (
            <FactoryPhoto image={image} key={image.url} className="factory-gallery-item" />
          ))}
        </div>
      </section>

      <section className="factory-build" aria-labelledby="factory-build-title">
        <div className="wrap factory-build-grid">
          <div className="factory-build-copy">
            <p className="eyebrow">Built with care</p>
            <h2 id="factory-build-title">British-designed. <em>Hand-built.</em></h2>
            <p>
              Keeping design and manufacture together helps us respond to project requirements and
              maintain oversight through production.
            </p>
          </div>
          <div className="factory-build-details">
            <div className="factory-build-row">
              <span>01</span>
              <p><strong>Designed and hand-built in Britain.</strong> From initial requirements through manufacture and installation, we aim to make the process straightforward and deliver doors and screens that are right for the building and the people who use it.</p>
            </div>
            <div className="factory-build-row">
              <span>02</span>
              <p><strong>Spare parts are available for up to 20 years,</strong> depending on the product and specification.</p>
            </div>
            <div className="factory-build-row">
              <span>03</span>
              <p><strong>Made to suit the site.</strong> The team can help identify suitable options and coordinate designs, glazing, finishes, access and locking details, closers or automatic operation.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="factory-closing" aria-labelledby="factory-contact-title">
        <div className="wrap factory-closing-inner">
          <div className="factory-closing-copy">
            <p className="eyebrow">Plan a project with us</p>
            <h2 id="factory-contact-title">Tell us about your building.</h2>
            <p>Contact the Bamford Doors team to talk through your entrance and project requirements.</p>
            <div className="factory-contact-details">
              <a href="tel:+441614806500" data-testid="link-factory-phone"><Phone size={14} aria-hidden="true" />0161 480 6500</a>
              <a href="mailto:sales@bamforddoors.com" data-testid="link-factory-email"><Mail size={14} aria-hidden="true" />sales@bamforddoors.com</a>
            </div>
          </div>
          <Link className="button" href="/contact?purpose=consultation" data-testid="link-factory-consultation">
            Contact the team <ArrowRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
