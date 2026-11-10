import { ArrowDown, ArrowRight, Check, CirclePlay, Hammer, MapPin, ShieldCheck } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './forced-entry-demonstration.css';

const tools = [
  { name: 'Axe', image: '/media/forced-entry-demonstration/axe.webp', alt: 'Axe challenge during the Bamford Doors practical demonstration.', challenge: 'A forceful impact challenge against the door.' },
  { name: 'Pickaxe', image: '/media/forced-entry-demonstration/pickaxe.webp', alt: 'Pickaxe challenge during the Bamford Doors practical demonstration.', challenge: 'A concentrated impact challenge.' },
  { name: 'Hammer', image: '/media/forced-entry-demonstration/hammer.webp', alt: 'Hammer challenge during the Bamford Doors practical demonstration.', challenge: 'Repeated impact against the same door.' },
  { name: 'Sledgehammer', image: '/media/forced-entry-demonstration/sledgehammer.webp', alt: 'Sledgehammer challenge during the Bamford Doors practical demonstration.', challenge: 'A heavier impact challenge.' },
  { name: 'Power drill', image: '/media/forced-entry-demonstration/power-drill.webp', alt: 'Power drill challenge during the Bamford Doors practical demonstration.', challenge: 'A powered tool challenge.' },
];

export function ForcedEntryDemonstrationPage() {
  return (
    <main className="fed-page" data-testid="page-forced-entry-demonstration">
      <section className="fed-hero" aria-labelledby="fed-title">
        <div className="fed-wrap">
          <div className="fed-hero-top">
            <p className="fed-eyebrow">Bamford Doors / Practical demonstration</p>
            <span className="fed-hero-index">FIELD NOTE&nbsp; 01 <i aria-hidden="true" /></span>
          </div>
          <div className="fed-hero-grid">
            <div className="fed-hero-copy">
              <EditablePageHeadline id="fed-title">Axe. Pickaxe. Sledgehammer. Drill. Still No Way In.</EditablePageHeadline>
              <p className="fed-subheading">Five Tools. One Bamford Security Door. Zero Successful Break-ins.</p>
              <p className="fed-hero-intro">One door. Five tools, used one after another. No entry was achieved, and the door remained robust throughout the demonstration.</p>
              <a className="fed-text-link" href="#fed-footage" data-testid="link-fed-demonstration-footage">See the demonstration <ArrowDown size={15} aria-hidden="true" /></a>
            </div>
            <aside className="fed-hero-stamp" aria-label="Demonstration results">
              <span className="fed-stamp-label">Demonstration result</span>
              <strong>0</strong>
              <span className="fed-stamp-caption">successful entries</span>
              <span className="fed-stamp-rule" />
              <p>One door remained robust throughout.</p>
            </aside>
          </div>
          <div className="fed-hero-foot">
            <span>Five tools / One door / Zero entries</span>
            <span>Practical demonstration, not a formal accredited test</span>
          </div>
        </div>
      </section>

      <section className="fed-footage" id="fed-footage" aria-labelledby="fed-footage-title">
        <div className="fed-wrap">
          <div className="fed-section-kicker">
            <span>01 / The evidence</span>
            <span>Test footage slot</span>
          </div>
          <figure className="fed-video-slot" aria-labelledby="fed-footage-title">
            <div className="fed-video-frame" role="img" aria-label="Replaceable placeholder for supplied test footage; no video is currently available">
              <div className="fed-frame-grid" aria-hidden="true" />
              <div className="fed-frame-center">
                <span className="fed-play-mark"><CirclePlay size={31} strokeWidth={1.3} aria-hidden="true" /></span>
                <strong id="fed-footage-title">Test footage</strong>
                <span>Replaceable slot — footage to be supplied</span>
              </div>
              <span className="fed-frame-tag">No video currently available</span>
              <span className="fed-frame-corner" aria-hidden="true">BD / 01</span>
            </div>
            <figcaption><span>Practical demonstration</span><span>Same door · tools used one after another</span></figcaption>
          </figure>
          <p className="fed-footage-note"><strong>What this shows:</strong> an axe, pickaxe, hammer, sledgehammer and power drill were used one after another against the same door. No entry was achieved; the door remained robust throughout.</p>
        </div>
      </section>

      <section className="fed-results" aria-labelledby="fed-results-title">
        <div className="fed-wrap">
          <div className="fed-results-heading">
            <div><p className="fed-eyebrow">The result, plainly</p><h2 id="fed-results-title">Five tools.<br /><em>One door. Zero entries.</em></h2></div>
            <p>This demonstration shows how one Bamford security door responded to a sequence of challenges. It is a practical demonstration only—not a formal accredited test.</p>
          </div>
          <div className="fed-result-strip" aria-label="Results summary">
            <div><span>01</span><strong>Five tools</strong><small>Used one after another</small></div>
            <div><span>02</span><strong>One door</strong><small>The same door throughout</small></div>
            <div className="fed-result-zero"><span>03</span><strong>Zero entries</strong><small>No successful break-in</small></div>
          </div>
          <ol className="fed-tool-list" aria-label="Challenges represented by each tool">
            {tools.map((tool, index) => (
              <li key={tool.name}>
                <span className="fed-tool-number">0{index + 1}</span>
                <Hammer size={17} aria-hidden="true" />
                <strong>{tool.name}</strong>
                <p>{tool.challenge}</p>
                <Check size={16} aria-label="No entry achieved" />
              </li>
            ))}
          </ol>
          <p className="fed-tool-caveat">These are high-level descriptions of the challenges represented. No entry was achieved at any point in the sequence.</p>
        </div>
      </section>

      <section className="fed-communal" aria-labelledby="fed-communal-title">
        <div className="fed-wrap fed-communal-grid">
          <div className="fed-communal-copy">
            <p className="fed-eyebrow">Security at the shared entrance</p>
            <h2 id="fed-communal-title">A stronger first line for <em>communal spaces.</em></h2>
            <p>For housing providers, councils, schools and public-building teams, a communal entrance is part of the everyday experience of a building. Robust doors can be an important consideration when planning an entrance that needs to withstand demanding use.</p>
            <p>This demonstration offers one clear result for one door under the challenges shown. It does not establish performance for every door, installation, building or circumstance. Project suitability should be considered for the specific opening and requirements.</p>
          </div>
          <div className="fed-sequence-gallery" aria-label="Still images from the practical demonstration">
            <div className="fed-gallery-heading">
              <span>Sequence stills</span>
              <span>Five tools / one demonstration</span>
            </div>
            <div className="fed-gallery-grid">
              {tools.map((tool, index) => (
                <figure className="fed-gallery-card" key={tool.name}>
                  <ResponsiveImage
                    src={tool.image}
                    alt={tool.alt}
                    width={1279}
                    height={720}
                    loading="lazy"
                    sizes="(max-width: 680px) 50vw, (max-width: 1000px) 30vw, 25vw"
                  />
                  <figcaption><span>0{index + 1}</span><strong>{tool.name}</strong></figcaption>
                </figure>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fed-making" aria-labelledby="fed-making-title">
        <div className="fed-wrap">
          <div className="fed-making-top">
            <div><p className="fed-eyebrow">Made by Bamford</p><h2 id="fed-making-title">Design, manufacture<br />and installation.</h2></div>
            <p>The demonstration sits within Bamford’s wider work designing, making and installing custom-made security doors and screens.</p>
          </div>
          <div className="fed-making-facts">
            <article><span>01 / Made here</span><strong>Designed and hand-built in Britain.</strong></article>
            <article><span>02 / Stockport</span><strong>Purpose-built 68,000 sq ft factory and office.</strong><MapPin size={17} aria-hidden="true" /></article>
            <article><span>03 / Full process</span><strong>Design, manufacture and installation.</strong></article>
          </div>
          <div className="fed-making-note"><ShieldCheck size={20} aria-hidden="true" /><p><strong>Scope matters.</strong> This was a practical demonstration, not a formal accredited test. It should not be read as a certification or a guarantee of performance beyond the result shown.</p></div>
        </div>
      </section>

      <section className="fed-closing" aria-labelledby="fed-closing-title">
        <div className="fed-wrap fed-closing-inner">
          <div><p className="fed-eyebrow">For your building, not a template</p><h2 id="fed-closing-title">Let’s talk about the entrance you need.</h2><p>Tell us about your building and the project. We’ll help you start a conversation about a custom-made security door or screen.</p></div>
          <Link href="/contact?purpose=consultation" className="fed-cta" data-testid="link-fed-consultation">Discuss your requirements <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}

export default ForcedEntryDemonstrationPage;
