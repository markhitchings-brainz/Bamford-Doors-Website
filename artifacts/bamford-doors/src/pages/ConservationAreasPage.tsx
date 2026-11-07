import { ArrowDown, ArrowRight, Check, ChevronRight, CircleHelp, Landmark } from "lucide-react";
import { Link } from "wouter";
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import "./conservation-areas.css";

const settingExamples = [
  "Historic village and town centres",
  "Fishing and mining villages",
  "18th–20th century suburbs",
  "Model housing estates",
  "Country-house estates",
  "Historic transport settings",
  "Industrial heritage sites",
];

const designOptions = [
  {
    number: "01",
    title: "A design that belongs",
    detail: "Flexible bespoke design, with raised-and-fielded or woodgrain appearance options to respond to the building.",
  },
  {
    number: "02",
    title: "Finish and colour",
      detail: "Options include silver anodised or powder-coated finishes, woodgrain effect and BS/RAL colours, subject to product availability.",
  },
  {
    number: "03",
    title: "Glazing with purpose",
    detail: "Different glazing configurations can be considered around visibility, privacy and the character of the entrance.",
  },
  {
    number: "04",
    title: "Access and security",
    detail: "Door access can be integrated with mechanical or electromagnetic locking, as suited to the project specification.",
  },
];

export function ConservationAreasPage() {
  return (
    <main className="conservation-page" data-testid="page-conservation-areas">
      <section className="ca-hero" aria-labelledby="ca-page-title">
        <div className="ca-wrap">
          <nav className="ca-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-conservation-breadcrumb">
            <Link href="/" data-testid="link-conservation-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/about" data-testid="link-conservation-about">About Bamford</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Conservation areas</span>
          </nav>
          <div className="ca-hero-grid">
            <div className="ca-hero-copy">
              <p className="ca-eyebrow">A project guide · Heritage settings</p>
              <EditablePageHeadline id="ca-page-title">Character,<br /><span>considered.</span></EditablePageHeadline>
              <p className="ca-hero-lead">A communal entrance can feel secure and practical while responding carefully to the place it serves.</p>
              <a className="ca-scroll-link" href="#starting-point" data-testid="link-explore-conservation">
                Begin with the setting <ArrowDown size={15} aria-hidden="true" />
              </a>
            </div>
            <aside className="ca-hero-aside" aria-label="A note on conservation-area projects">
              <span className="ca-aside-number">A considered conversation</span>
              <p>Local requirements differ. Start by understanding the building and its setting, then confirm the project-specific position before specifying.</p>
              <span className="ca-aside-rule" />
              <span className="ca-aside-caption">Bamford Doors · Project guidance</span>
            </aside>
          </div>
          <div className="ca-hero-footer">
            <span>01 / Conservation areas</span>
            <span>For housing, local authorities & public buildings</span>
          </div>
        </div>
      </section>

      <section className="ca-intro ca-wrap" id="starting-point" aria-labelledby="ca-intro-title">
        <div className="ca-intro-heading">
          <p className="ca-eyebrow">Start with the place</p>
          <h2 id="ca-intro-title">A shared entrance is part of a wider story.</h2>
        </div>
        <div className="ca-intro-copy">
          <p className="ca-intro-emphasis">Conservation areas protect places with special architectural or historic interest.</p>
          <p>For a housing or council team, the task is to balance that character with the everyday needs of a secure, accessible communal entrance. The right conversation starts with the building, the people who use it and the local planning context—not a one-size-fits-all door.</p>
          <p>Additional planning controls can apply, but requirements vary by location. Confirm the position with your local planning authority and relevant project team before specifying or installing.</p>
          <div className="ca-intro-callout">
            <Landmark size={19} aria-hidden="true" />
            <span>Use this guide to prepare questions. It is not a substitute for project-specific planning advice.</span>
          </div>
        </div>
      </section>

      <section className="ca-settings" aria-labelledby="ca-settings-title">
        <div className="ca-wrap">
          <div className="ca-section-head">
            <div>
              <p className="ca-eyebrow">Many kinds of place</p>
              <h2 id="ca-settings-title">Heritage has more than one setting.</h2>
            </div>
            <p>Conservation areas may encompass a range of places and periods. These examples can help frame an early project conversation.</p>
          </div>
          <div className="ca-setting-layout">
            <div className="ca-setting-statement">
              <span className="ca-setting-index">A wider context</span>
              <p>Look beyond the doorway to the character of the street, estate or landscape around it.</p>
              <span className="ca-setting-rule" />
              <span className="ca-setting-caption">One entrance · Part of a place</span>
            </div>
            <ul className="ca-setting-list" data-testid="list-conservation-settings">
              {settingExamples.map((setting, index) => (
                <li key={setting} data-testid={`setting-example-${index + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>{setting}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="ca-examples" aria-labelledby="ca-examples-title">
        <div className="ca-wrap">
          <div className="ca-section-head ca-examples-head">
            <div>
              <p className="ca-eyebrow">Bespoke entrance examples</p>
              <h2 id="ca-examples-title">Different forms. A thoughtful response.</h2>
            </div>
            <p>These brochure images show raised-panel and woodgrain-effect entrance examples in brick settings. They are visual references, not evidence of project approval or certification.</p>
          </div>
          <div className="ca-gallery" data-testid="gallery-conservation-examples">
            <figure className="ca-photo ca-photo-panel" data-testid="figure-raised-panel-door">
              <div className="ca-photo-image">
                <img src="/media/conservation-areas/raised-panel-door.jpg" alt="Dark raised-panel door with an arched glazed fanlight, set into a red-brick wall." width="206" height="420" loading="lazy" />
              </div>
              <figcaption><span>01 / Raised-panel appearance</span><small>Individual entrance example</small></figcaption>
            </figure>
            <figure className="ca-photo ca-photo-woodgrain" data-testid="figure-woodgrain-entrance">
              <div className="ca-photo-image">
                <img src="/media/conservation-areas/woodgrain-entrance.jpg" alt="Woodgrain-effect communal entrance with glazed door leaves and side panels in a brick entrance recess." width="438" height="420" loading="lazy" />
              </div>
              <figcaption><span>02 / Woodgrain-effect entrance</span><small>Door and screen composition</small></figcaption>
            </figure>
            <figure className="ca-photo ca-photo-arched" data-testid="figure-arched-entrance">
              <div className="ca-photo-image">
                <img src="/media/conservation-areas/arched-entrance.jpg" alt="Dark glazed entrance set within a broad arched brick opening with contrasting brick detailing." width="209" height="420" loading="lazy" />
              </div>
              <figcaption><span>03 / Arched brick setting</span><small>Individual entrance example</small></figcaption>
            </figure>
            <p className="ca-gallery-note">Examples are shown to illustrate possible appearance only. The suitability of any design depends on the building, brief and local requirements.</p>
          </div>
        </div>
      </section>

      <section className="ca-design" aria-labelledby="ca-design-title">
        <div className="ca-wrap ca-design-grid">
          <div className="ca-design-heading">
            <p className="ca-eyebrow">Bamford design options</p>
            <h2 id="ca-design-title">Practical choices, shaped around the brief.</h2>
            <p>Robust aluminium construction can be configured in different ways. Agree appearance and performance needs together, as part of the complete doorset specification.</p>
            <div className="ca-design-marker"><i /> Bespoke does not mean one prescribed look</div>
          </div>
          <div className="ca-options" data-testid="list-design-options">
            {designOptions.map((option) => (
              <article className="ca-option" key={option.number} data-testid={`design-option-${option.number}`}>
                <span>{option.number}</span>
                <div><h3>{option.title}</h3><p>{option.detail}</p></div>
                <Check size={15} aria-hidden="true" />
              </article>
            ))}
          </div>
          <aside className="ca-security-note" data-testid="note-secured-by-design">
            <span>Product-specific qualification</span>
            <p>Some Bamford products have passed the necessary testing for Police Preferred Specification under Secured by Design. Confirm the scope for the selected product.</p>
          </aside>
        </div>
      </section>

      <section className="ca-planning" aria-labelledby="ca-planning-title">
        <div className="ca-wrap ca-planning-grid">
          <div className="ca-planning-heading">
            <p className="ca-eyebrow">Before the specification</p>
            <h2 id="ca-planning-title">A better brief begins with better questions.</h2>
            <p className="ca-planning-lead">Take these points into the conversation with your local planning authority and project team.</p>
          </div>
          <ol className="ca-checklist" data-testid="list-project-checklist">
            <li><span>01</span><div><strong>What makes this place distinctive?</strong><p>Ask which features, materials, proportions or details are important in this specific setting.</p></div></li>
            <li><span>02</span><div><strong>What planning controls apply here?</strong><p>Check directly with the local planning authority. Requirements and processes vary by location and project.</p></div></li>
            <li><span>03</span><div><strong>How will the complete entrance work?</strong><p>Review the door, frame, glazing, hardware, access control and locking as one coordinated doorset.</p></div></li>
            <li><span>04</span><div><strong>Does it meet current access needs?</strong><p>Check operating effort, threshold and access for the complete doorset against current project accessibility requirements.</p></div></li>
            <li><span>05</span><div><strong>Which product and terms are proposed?</strong><p>Confirm product-specific evidence and current warranty terms with the supplier before committing.</p></div></li>
          </ol>
          <div className="ca-planning-note">
            <CircleHelp size={17} aria-hidden="true" />
            <p><strong>Keep it project-specific.</strong> Planning context, product scope, warranty and accessibility checks should all relate to the actual building and selected doorset.</p>
          </div>
        </div>
      </section>

      <section className="ca-closing" aria-labelledby="ca-closing-title">
        <div className="ca-wrap ca-closing-inner">
          <div className="ca-closing-copy">
            <p className="ca-eyebrow">A clear next step</p>
            <h2 id="ca-closing-title">Bring the context. Build the brief together.</h2>
            <p>Share what you know about the building, planning conversation and day-to-day use. Bamford can help you explore a suitable entrance specification.</p>
            <p className="ca-project-note">Confirm local requirements with your planning authority and project team before specifying or installing.</p>
          </div>
          <Link href="/contact?purpose=consultation" className="ca-contact-button" data-testid="link-conservation-consultation">
            Discuss your project <ArrowRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
    </main>
  );
}
