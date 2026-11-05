import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight, Layers3, Ruler, Scale, ShieldCheck, Thermometer, Waves, X } from 'lucide-react';
import { Link } from 'wouter';
import './grp-doors.css';

const materialProperties = [
  {
    icon: Thermometer,
    title: 'Thermal insulation',
    text: 'GRP can help limit the transfer of heat through the material.',
  },
  {
    icon: ShieldCheck,
    title: 'Anti-slip safety',
    text: 'Its surface and material characteristics can support anti-slip applications where relevant.',
  },
  {
    icon: Scale,
    title: 'Strong, with less weight',
    text: 'A high strength-to-weight ratio combines useful strength with a comparatively light material.',
  },
  {
    icon: Waves,
    title: 'Energy absorption',
    text: 'The material can absorb energy, depending on the form and construction.',
  },
  {
    icon: Layers3,
    title: 'Chemical and corrosion resistance',
    text: 'GRP is resistant to many chemical and corrosive environments.',
  },
  {
    icon: ShieldCheck,
    title: 'Potential for enclosed electrical spaces',
    text: 'GRP may be considered for some enclosed electrical environments, subject to project assessment.',
  },
  {
    icon: Waves,
    title: 'Heat and sound insulation',
    text: 'The material can offer heat and sound insulating properties.',
  },
  {
    icon: Ruler,
    title: 'Versatile shaping',
    text: 'It can be shaped into a range of forms to suit different design needs.',
  },
];

const gallery = [
  {
    src: '/media/grp-doors/entrance-01.webp',
    alt: 'Black communal entrance door with glazed side panel and entry system',
    caption: 'Black door with glazed side panel',
    detail: 'DOOR + SIDE PANEL',
  },
  {
    src: '/media/grp-doors/entrance-02.webp',
    alt: 'Blue double entrance doors with narrow vision panels in a brick opening',
    caption: 'Blue paired doors with vision panels',
    detail: 'PAIRED DOORS',
  },
  {
    src: '/media/grp-doors/entrance-03.webp',
    alt: 'Teal single entrance door with a small vision panel in a brick residential building',
    caption: 'Teal single entrance',
    detail: 'SINGLE DOOR',
  },
  {
    src: '/media/grp-doors/entrance-04.webp',
    alt: 'Bright blue entrance door with a narrow glazed side panel and overhead screen',
    caption: 'Blue entrance with side panel',
    detail: 'GLAZED SIDE PANEL',
  },
  {
    src: '/media/grp-doors/entrance-05.webp',
    alt: 'Teal entrance door with glazed sidelights and access control in a brick building',
    caption: 'Teal door with glazed sidelights',
    detail: 'DOOR + SIDELIGHTS',
  },
  {
    src: '/media/grp-doors/entrance-06.webp',
    alt: 'Grey entrance door within a glazed surround at a public building',
    caption: 'Grey entrance with glazed surrounds',
    detail: 'GLAZED SURROUND',
  },
];

const designTypes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K'];
const doorDesigns = designTypes.map((code, index) => ({
  code,
  index,
  src: `/media/grp-doors/designs/type-${code.toLowerCase()}.png`,
}));

const enquiryHref = '/contact?purpose=product&product=Glass%20reinforced%20plastic%20(GRP)%20doors';

export function GrpDoorsPage() {
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);
  const [designViewerOpen, setDesignViewerOpen] = useState(false);
  const designDialogRef = useRef<HTMLDialogElement>(null);
  const selectedDesign = doorDesigns[selectedDesignIndex];

  useEffect(() => {
    const dialog = designDialogRef.current;
    if (!dialog) return;
    if (designViewerOpen && !dialog.open) dialog.showModal();
    if (!designViewerOpen && dialog.open) dialog.close();
  }, [designViewerOpen]);

  const openDesign = (index: number) => {
    setSelectedDesignIndex(index);
    setDesignViewerOpen(true);
  };

  const moveDesign = (direction: -1 | 1) => {
    setSelectedDesignIndex(current => (current + direction + doorDesigns.length) % doorDesigns.length);
  };

  return (
    <main className="grp-page" data-testid="page-grp-doors">
      <section className="grp-hero" aria-labelledby="grp-title">
        <div className="grp-wrap">
          <nav className="grp-breadcrumbs" aria-label="Breadcrumb">
            <Link href="/" data-testid="link-grp-home">Home</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <Link href="/products" data-testid="link-grp-products">Products</Link>
            <ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">GRP doors</span>
          </nav>
          <div className="grp-hero-grid">
            <div className="grp-hero-copy">
              <p className="grp-eyebrow">Bamford Doors / Made-to-order entrances</p>
              <h1 id="grp-title">GRP doors.<br /><span>Material in focus.</span></h1>
              <p className="grp-hero-lead">A practical introduction to glass reinforced plastic—and the entrance designs it can help shape for communal and public buildings.</p>
              <div className="grp-actions">
                <Link className="grp-button" href={enquiryHref} data-testid="link-grp-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
                <a className="grp-text-action" href="#material">Explore GRP <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="grp-hero-meta"><span>01 / Glass reinforced plastic</span><span>Start with the opening</span></div>
            </div>
            <figure className="grp-hero-image">
              <img src="/media/grp-doors/hero.webp" alt="Brown textured communal entrance door and matching glazed side panel in a brick building" />
              <figcaption>Textured brown communal entrance</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="grp-intro grp-wrap" id="material" aria-labelledby="grp-intro-title">
        <div className="grp-intro-panel">
          <p className="grp-eyebrow">The material</p>
          <h2 id="grp-intro-title">Glass fibres.<br />Woven for versatility.</h2>
          <p>GRP means glass reinforced plastic. It is made from glass fibres woven into a flexible fabric, then combined with plastic to create a strong, lightweight and versatile material.</p>
          <p>Those general material qualities make GRP relevant to a wide range of applications. How they translate into a finished entrance depends on the design and specification.</p>
        </div>
        <aside className="grp-intro-side" aria-label="Project-specific considerations">
          <p className="grp-eyebrow">For your building</p>
          <h2>Material is one part<br /><em>of the decision.</em></h2>
          <ul className="grp-check-list">
            <li><Check size={16} aria-hidden="true" /><span>Opening dimensions and existing surrounds</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Building use and the entrance layout</span></li>
            <li><Check size={16} aria-hidden="true" /><span>Glazing, access and project requirements</span></li>
          </ul>
          <p className="grp-side-note">Suitability depends on the actual door design, opening and project. Talk to Bamford to confirm the details for your building.</p>
        </aside>
      </section>

      <section className="grp-properties" aria-labelledby="grp-properties-title">
        <div className="grp-wrap">
          <div className="grp-section-head">
            <div><p className="grp-eyebrow">General material properties</p><h2 id="grp-properties-title">What GRP can bring<br />to a specification.</h2></div>
            <p>These are characteristics associated with GRP as a material—not certifications or guaranteed performance claims for every finished door.</p>
          </div>
          <div className="grp-property-grid">
            {materialProperties.map((item, index) => {
              const Icon = item.icon;
              return (
                <article className="grp-property" key={item.title}>
                  <span className="grp-property-index">0{index + 1}</span>
                  <Icon size={21} aria-hidden="true" />
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              );
            })}
          </div>
          <p className="grp-property-note">The performance of a completed doorset depends on its design, components, installation and intended use. Confirm suitability and any project-specific requirements with Bamford.</p>
        </div>
      </section>

      <section className="grp-designs" aria-labelledby="grp-designs-title">
        <div className="grp-wrap">
          <div className="grp-section-head grp-designs-head">
            <div><p className="grp-eyebrow">Choose a door design</p><h2 id="grp-designs-title">Ten starting points.</h2></div>
            <p>Explore Types A–H, J and K. Final door and glazing arrangements are confirmed for the opening and project brief.</p>
          </div>
          <div className="grp-design-guide">
            <p><strong>Select a design</strong> to inspect its front elevation and type at a larger size.</p>
            <span>10 GRP DESIGNS</span>
          </div>
          <ul className="grp-design-grid" aria-label="GRP door designs" data-testid="list-grp-design-types">
            {doorDesigns.map(design => (
              <li key={design.code}>
                <button
                  type="button"
                  className={`grp-design-card${selectedDesignIndex === design.index ? ' is-selected' : ''}`}
                  aria-label={`View a larger drawing of GRP door Type ${design.code}`}
                  aria-haspopup="dialog"
                  aria-pressed={selectedDesignIndex === design.index}
                  data-testid={`button-grp-type-${design.code}`}
                  onClick={() => openDesign(design.index)}
                >
                  <span className="grp-design-thumb"><img src={design.src} alt="" width="300" height="500" /></span>
                  <span className="grp-design-meta">
                    <span className="grp-design-order">DESIGN {String(design.index + 1).padStart(2, '0')}</span>
                    <strong>Type {design.code}</strong>
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <dialog
            ref={designDialogRef}
            className="grp-design-dialog"
            aria-labelledby="grp-design-dialog-title"
            data-testid="dialog-grp-design"
            onClose={() => setDesignViewerOpen(false)}
            onClick={event => {
              if (event.target === designDialogRef.current) setDesignViewerOpen(false);
            }}
          >
            <div className="grp-design-dialog-content">
              <figure className="grp-design-dialog-visual">
                <img
                  src={selectedDesign.src}
                  alt={`Front elevation drawing of GRP door Type ${selectedDesign.code}`}
                  width="300"
                  height="500"
                />
              </figure>
              <div className="grp-design-dialog-copy">
                <div className="grp-design-dialog-heading">
                  <div>
                    <p className="grp-eyebrow">Selected door design</p>
                    <h3 id="grp-design-dialog-title">Type {selectedDesign.code}</h3>
                    <p className="grp-design-dialog-index">Design {String(selectedDesignIndex + 1).padStart(2, '0')} of 10 · Front elevation</p>
                  </div>
                  <button className="grp-design-close" type="button" aria-label="Close enlarged door design" onClick={() => setDesignViewerOpen(false)}><X size={20} aria-hidden="true" /></button>
                </div>
                <div className="grp-design-dialog-description">
                  <p>This illustration shows the panel and vision-panel arrangement for Type {selectedDesign.code}. Select another type to compare the available designs.</p>
                  <p>Final panel configuration, glazing, dimensions and hardware are confirmed for each project.</p>
                </div>
                <div className="grp-design-dialog-controls">
                  <button type="button" aria-label={`Previous design from Type ${selectedDesign.code}`} onClick={() => moveDesign(-1)}><ArrowLeft size={16} aria-hidden="true" /><span>Previous</span></button>
                  <span>{String(selectedDesignIndex + 1).padStart(2, '0')} / 10</span>
                  <button type="button" aria-label={`Next design from Type ${selectedDesign.code}`} onClick={() => moveDesign(1)}><span>Next</span><ArrowRight size={16} aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </section>

      <section className="grp-gallery" aria-labelledby="grp-gallery-title">
        <div className="grp-wrap">
          <div className="grp-section-head grp-gallery-head">
            <div><p className="grp-eyebrow">Entrance examples</p><h2 id="grp-gallery-title">Different openings.<br /><em>Different answers.</em></h2></div>
            <p>A selection of pictured entrance arrangements, colours and glazed details. Final options depend on the opening and project brief.</p>
          </div>
          <div className="grp-gallery-grid">
            {gallery.map((item, index) => (
              <figure className="grp-gallery-card" key={item.src}>
                <div className="grp-gallery-image"><img src={item.src} alt={item.alt} loading="lazy" /></div>
                <figcaption><small>0{index + 1} / {item.detail}</small><strong>{item.caption}</strong></figcaption>
              </figure>
            ))}
          </div>
          <p className="grp-image-note">Illustrative entrance photographs. Confirm the available design and specification for your project with Bamford.</p>
        </div>
      </section>

      <section className="grp-next" aria-labelledby="grp-next-title">
        <div className="grp-wrap grp-next-inner">
          <div>
            <p className="grp-eyebrow">Plan the fit</p>
            <h2 id="grp-next-title">Tell us about the opening.</h2>
            <p>Share the building type, opening dimensions and what the entrance needs to do. Bamford can help confirm whether a GRP door is suitable for the project.</p>
          </div>
          <Link className="grp-button" href={enquiryHref} data-testid="link-grp-closing-enquire">Talk to our team <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
      </section>
    </main>
  );
}
