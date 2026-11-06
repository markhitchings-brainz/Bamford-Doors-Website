import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './resident-involvement.css';

export function ResidentInvolvementPage() {
  return (
    <main className="resident-involvement">
      <section className="ri-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={12} />
            <Link href="/services">Services</Link><ChevronRight size={12} />
            <span aria-current="page">Resident Involvement</span>
          </nav>
          <div className="ri-hero-grid">
            <div className="ri-hero-copy ri-rise">
              <p className="eyebrow">Services / Resident Involvement</p>
              <h1>Resident<br /><em>Involvement</em></h1>
              <p className="ri-hero-deck">Keeping residents informed and reducing disruption</p>
              <span className="ri-rule" aria-hidden="true" />
            </div>
            <figure className="ri-hero-image ri-rise ri-rise-2">
              <ResponsiveImage
                src="/media/resident-involvement/resident-man-pink-jumper-outdoors.jpg"
                alt="A smiling man in a pink jumper standing outdoors"
                sizes="(max-width: 760px) 100vw, 55vw"
                loading="eager"
                fetchPriority="high"
                data-testid="img-resident-hero"
              />
              <figcaption><span>01 / AT HOME</span>Work planned around daily routines.</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="ri-why">
        <div className="wrap ri-why-grid">
          <p className="ri-large-copy">Works can affect people’s homes and daily routines, so resident involvement is an important part of planning and delivering a project.</p>
          <div className="ri-why-copy">
            <p>Our aim is to keep residents informed, give them a clear understanding of what to expect and reduce disruption wherever possible.</p>
          </div>
        </div>
      </section>

      <section className="ri-process" aria-labelledby="ri-process-title">
        <div className="wrap">
          <div className="ri-process-head">
            <p className="eyebrow">How it works</p>
            <h2 id="ri-process-title">Agreed with the client. <em>Clear for residents.</em></h2>
          </div>
          <ol className="ri-steps">
            <li>
              <span className="ri-step-no">01</span>
              <div>
                <p className="ri-step-label">Before work begins</p>
                <p>Before work begins, we prepare a documented programme of works and issue it to the client for approval.</p>
                <p>We agree with the client how residents will be kept informed and what project-specific instructions they need.</p>
              </div>
            </li>
            <li>
              <span className="ri-step-no">02</span>
              <div>
                <h3>Clear, timely communication</h3>
                <p>Where the client asks Bamfords to communicate directly with residents, we send letters at agreed intervals. This can include an introductory letter, a 21-day letter and a 7-day reminder, alongside any specific instructions for residents. These updates help residents prepare for the work and understand when it may affect them.</p>
                <ul className="ri-letters" aria-label="Letters that can be sent at agreed intervals">
                  <li><strong>Introductory</strong><span>letter</span></li>
                  <li><strong>21-day</strong><span>letter</span></li>
                  <li><strong>7-day</strong><span>reminder</span></li>
                  <li><strong>Specific</strong><span>instructions</span></li>
                </ul>
              </div>
            </li>
          </ol>
        </div>
      </section>

      <section className="ri-listen">
        <div className="wrap ri-listen-grid">
          <figure className="ri-listen-image">
            <ResponsiveImage
              src="/media/resident-involvement/resident-woman-outside-building.jpg"
              alt="A smiling woman standing outside a building"
              sizes="(max-width: 760px) 100vw, 45vw"
              loading="lazy"
              data-testid="img-resident-listening"
            />
            <figcaption><span>02 / IN CONVERSATION</span>Questions answered, feedback heard.</figcaption>
          </figure>
          <div className="ri-listen-copy">
            <p className="eyebrow">Where requested</p>
            <h2>Listening to <em>residents</em></h2>
            <p>Where requested, we can hold resident involvement meetings to explain the planned work, answer questions and hear residents’ feedback. Residents’ comments and practical needs can be shared with the client and considered as the programme is coordinated.</p>
          </div>
        </div>
      </section>

      <section className="ri-close">
        <div className="wrap ri-close-inner">
          <p className="ri-close-statement">By involving residents and keeping communication clear, we can help the work run smoothly and make the experience more manageable for the people affected.</p>
          <Link className="ri-contact-link" href="/contact?purpose=consultation" data-testid="link-resident-contact">
            <span>Talk to Bamford Doors about your project</span><ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
