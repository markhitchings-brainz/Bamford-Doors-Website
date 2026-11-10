import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import './security-door-forced-entry-test.css';

const media = '/media/forced-entry-test/';
const videoUrl =
  'https://cdn.sanity.io/files/ih9rxf6u/production/f0c89976b898ce49ac954ba9108beecfbbed0b40.mp4';

const demonstrationImages = [
  {
    src: `${media}axe.webp`,
    name: 'Axe',
    alt: 'Bamford aluminium security door during the axe stage of a practical demonstration',
  },
  {
    src: `${media}pickaxe.webp`,
    name: 'Pickaxe',
    alt: 'Bamford aluminium security door during the pickaxe stage of a practical demonstration',
  },
  {
    src: `${media}hammer.webp`,
    name: 'Hammer',
    alt: 'Bamford aluminium security door during the hammer stage of a practical demonstration',
  },
  {
    src: `${media}sledgehammer.webp`,
    name: 'Sledgehammer',
    alt: 'Bamford aluminium security door during the sledgehammer stage of a practical demonstration',
  },
  {
    src: `${media}drill.webp`,
    name: 'Power drill',
    alt: 'Bamford aluminium security door during the power drill stage of a practical demonstration',
  },
];

const designPriorities = [
  {
    number: '01',
    title: 'Robust construction',
    text: 'Durable materials selected for demanding applications.',
  },
  {
    number: '02',
    title: 'Long-term reliability',
    text: 'Door systems developed for frequent everyday use.',
  },
  {
    number: '03',
    title: 'Bespoke manufacturing',
    text: 'Entrance solutions tailored to individual buildings and project requirements.',
  },
  {
    number: '04',
    title: 'Access-control compatibility',
    text: 'Suitable entry and security systems can be considered as part of the specification.',
  },
  {
    number: '05',
    title: 'Manufacturing expertise',
    text: 'Specialist aluminium door-system experience brought to each project.',
  },
];

export function SecurityDoorForcedEntryTestPage() {
  return (
    <main className="fd-test-page" data-testid="page-security-door-forced-entry-test">
      <section className="fd-test-hero" aria-labelledby="fd-test-title">
        <div className="wrap">
          <nav className="fd-test-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Forced-entry test</span>
          </nav>

          <div className="fd-test-hero-grid">
            <div className="fd-test-hero-copy">
              <p className="eyebrow">Security, demonstrated</p>
              <EditablePageHeadline id="fd-test-title">
                Axe. Pickaxe. Sledgehammer. Drill. Still No Way In.
              </EditablePageHeadline>
              <p className="fd-test-hero-lead">
                Five tools. One Bamford security door. Zero successful break-ins.
              </p>
              <p className="fd-test-hero-description">
                At Bamford, we believe security should be demonstrated, not just promised. We put
                one of our aluminium security doors through a practical forced-entry demonstration.
                No entry was achieved and the door remained robust throughout the conditions shown.
              </p>
              <div className="fd-test-actions">
                <a className="button" href="#fd-test-video">
                  Watch the demonstration <ArrowRight size={15} aria-hidden="true" />
                </a>
                <Link className="fd-test-text-link" href="/products/aluminium-modular-doors">
                  Explore our security doors
                </Link>
              </div>
            </div>

            <figure className="fd-test-hero-image">
              <img
                src={`${media}axe.webp`}
                alt="A practical forced-entry demonstration against a Bamford aluminium security door"
                width="1672"
                height="941"
                fetchPriority="high"
              />
              <figcaption>
                <span>01 / Practical demonstration</span>
                <strong>No entry was achieved</strong>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="fd-test-proofline" aria-label="Demonstration summary">
        <div className="wrap fd-test-proofline-inner">
          <div><strong>05</strong><span>tools used</span></div>
          <div><strong>01</strong><span>door tested</span></div>
          <div><strong>00</strong><span>successful entries in the demonstration</span></div>
        </div>
      </section>

      <section className="fd-test-video-section" id="fd-test-video" aria-labelledby="fd-video-title">
        <div className="wrap">
          <div className="fd-test-section-heading">
            <div>
              <p className="eyebrow">Watch the full test</p>
              <h2 id="fd-video-title">Five tools. One objective. Could they break through?</h2>
            </div>
            <p>
              The recording shows the complete practical demonstration and its outcome. Press play
              when you’re ready to watch.
            </p>
          </div>
          <figure className="fd-test-video">
            <video
              controls
              playsInline
              preload="none"
              poster={`${media}axe.webp`}
              aria-label="Video of a Bamford aluminium security door practical forced-entry demonstration"
            >
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support HTML video. You can still view the demonstration
              photographs below.
            </video>
            <figcaption>
              Bamford aluminium security door / practical demonstration
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="fd-test-gallery" aria-labelledby="fd-gallery-title">
        <div className="wrap">
          <div className="fd-test-section-heading">
            <div>
              <p className="eyebrow">Five different challenges</p>
              <h2 id="fd-gallery-title">One door. One consistent outcome.</h2>
            </div>
            <p>
              A selection of moments from the demonstration, in the order shown.
            </p>
          </div>
          <div className="fd-test-gallery-grid">
            {demonstrationImages.map((image, index) => (
              <figure key={image.name}>
                <img
                  src={image.src}
                  alt={image.alt}
                  width="1672"
                  height="941"
                  loading="lazy"
                />
                <figcaption>
                  <span>0{index + 1} / TEST</span>
                  <strong>{image.name}</strong>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="fd-test-communal section" aria-labelledby="fd-communal-title">
        <div className="wrap fd-test-two-column">
          <div>
            <p className="eyebrow">Shared entrance security</p>
            <h2 id="fd-communal-title">Why communal entrance doors matter.</h2>
          </div>
          <div className="fd-test-copy">
            <p>
              For housing associations, local authorities and property managers, communal entrance
              security is a critical consideration. These doors protect the main access points to
              residential buildings and serve many households every day.
            </p>
            <p>
              Entrances need to withstand frequent use while helping manage unauthorised access,
              vandalism and deliberate damage. A compromised entrance can raise concerns for
              residents and lead to additional repair or replacement costs.
            </p>
            <p>
              Bamford’s bespoke aluminium door systems are made for demanding environments, bringing
              strength, durability and practical functionality together around each project.
            </p>
          </div>
        </div>
      </section>

      <section className="fd-test-priorities" aria-labelledby="fd-priorities-title">
        <div className="wrap">
          <div className="fd-test-section-heading fd-test-priorities-heading">
            <div>
              <p className="eyebrow">Beyond the demonstration</p>
              <h2 id="fd-priorities-title">Built for everyday life.</h2>
            </div>
            <p>
              Security is one part of an entrance door’s job. It also needs to work reliably in
              buildings where entrances are used day after day.
            </p>
          </div>
          <ol className="fd-test-priorities-list">
            {designPriorities.map((priority) => (
              <li key={priority.number}>
                <span>{priority.number}</span>
                <div>
                  <h3>{priority.title}</h3>
                  <p>{priority.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fd-test-qualification" aria-labelledby="fd-qualification-title">
        <div className="wrap fd-test-qualification-inner">
          <p className="eyebrow">About this demonstration</p>
          <h2 id="fd-qualification-title">A practical demonstration, not an accredited test.</h2>
          <p>
            This demonstration shows one door under the conditions shown; it is not a formal
            accredited security test. Project requirements and door configurations vary. Ask us to
            confirm the current test evidence and specification relevant to your building.
          </p>
        </div>
      </section>

      <section className="fd-test-cta">
        <div className="wrap fd-test-cta-inner">
          <div>
            <p className="eyebrow">Secure your building with Bamford</p>
            <h2>Tell us about your entrance.</h2>
            <p>
              Whether you’re replacing a communal entrance or planning doors for a new development,
              our team can discuss a bespoke aluminium entrance solution for your project.
            </p>
          </div>
          <div className="fd-test-cta-actions">
            <Link className="button" href="/contact?purpose=consultation">
              Speak to our team <ArrowRight size={15} aria-hidden="true" />
            </Link>
            <Link className="fd-test-cta-link" href="/products">
              Explore all products
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
