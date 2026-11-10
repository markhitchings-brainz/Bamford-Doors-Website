import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, Check, ChevronRight, Cog, Layers3, LockKeyhole, Palette, ScanLine, X } from 'lucide-react';
import { Link } from 'wouter';
import { EditablePageHeadline } from '@/components/EditablePageHeadline';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './aluminium-modular-doors.css';

const media = '/media/aluminium-modular/';

const types = ['1000', '1100', '1110', '1111', '2000', '2200', '2220', '2222', '2100', '2210', '3000', '3300', '3100', '4000', '4400', '4100'];
const colorVisualizerTypes = new Set(['2100', '4400']);
const installedExamples: Partial<Record<string, { src: string; alt: string; description: string }>> = {
  '4100': {
    src: `${media}designs/type-4100-installed-example.webp`,
    alt: 'Dark aluminium communal entrance with a multi-pane door, glazed side screens and solid infill panels',
    description: 'See a real entrance example associated with the Type 4100 layout, with a multi-pane door and glazed side screens.',
  },
};
const doorDesigns = types.map((code, index) => ({
  code,
  index,
  src: `${media}designs/type-${code}.png`,
  example: installedExamples[code],
}));

const finishes = [
  { code: 'RAL 5005', name: 'Signal blue', color: '#174889' },
  { code: 'RAL 6005', name: 'Moss green', color: '#114232' },
  { code: 'RAL 3003', name: 'Ruby red', color: '#8d1b27' },
  { code: 'RAL 7016', name: 'Anthracite grey', color: '#383e42' },
  { code: 'RAL 8016', name: 'Mahogany brown', color: '#4b2c25' },
  { code: 'RAL 9010', name: 'Pure white', color: '#f1eee5' },
  { code: 'RAL 9011', name: 'Graphite black', color: '#202326' },
];

const features = [
  { icon: Layers3, title: 'Engineered sections', text: 'Heavy-duty aluminium sections, engineered and hardened for communal entrance use.' },
  { icon: ScanLine, title: 'Made to the opening', text: 'Bespoke door and screen combinations, planned around the building and entrance.' },
  { icon: LockKeyhole, title: 'Security in the detail', text: 'Designed to resist vandalism and forced entry. Specify the complete doorset to suit the project.' },
  { icon: Cog, title: 'Access options', text: 'Mechanical or electromagnetic access control can be considered as part of the entrance specification.' },
];

const checklist = [
  ['Leaf & hinge', 'A rebated door leaf with a continuous piano hinge.'],
  ['Closing', 'Concealed closer and automatic operator options can be discussed.'],
  ['Glazing', 'Options may include laminated, toughened, double-glazed, polycarbonate and Georgian wired glass. Ask us to confirm current availability, compliance and suitability for your project.'],
  ['Threshold', 'Low-threshold access may be a project requirement. Confirm the achievable threshold and full accessibility performance for the selected configuration.'],
  ['Maintenance', 'Some components, including glazing, can be removed to support servicing. Ask us to confirm the maintenance options for your selected configuration.'],
  ['Material', 'Aluminium is relatively light and recyclable. End-of-life outcomes depend on collection and processing routes.'],
];

export function AluminiumModularDoorsPage() {
  const [selectedDesignIndex, setSelectedDesignIndex] = useState(0);
  const [designViewerOpen, setDesignViewerOpen] = useState(false);
  const [showInstalledExample, setShowInstalledExample] = useState(false);
  const [selectedFinishCode, setSelectedFinishCode] = useState<string | null>(null);
  const designDialogRef = useRef<HTMLDialogElement>(null);
  const selectedDesign = doorDesigns[selectedDesignIndex];
  const selectedFinish = selectedFinishCode ? finishes.find(finish => finish.code === selectedFinishCode) ?? null : null;
  const selectedFinishImage = selectedFinish
    ? `${media}colour-visualiser/type-${selectedDesign.code}-${selectedFinish.code.toLowerCase().replace(' ', '-')}.jpg`
    : selectedDesign.src;
  const isColorVisualizer = colorVisualizerTypes.has(selectedDesign.code);
  const showingInstalledExample = Boolean(selectedDesign.example && showInstalledExample);

  useEffect(() => {
    const dialog = designDialogRef.current;
    if (!dialog) return;
    if (designViewerOpen && !dialog.open) dialog.showModal();
    if (!designViewerOpen && dialog.open) dialog.close();
  }, [designViewerOpen]);

  const openDesign = (index: number) => {
    setSelectedDesignIndex(index);
    setShowInstalledExample(false);
    setSelectedFinishCode(null);
    setDesignViewerOpen(true);
  };

  const moveDesign = (direction: -1 | 1) => {
    setShowInstalledExample(false);
    setSelectedFinishCode(null);
    setSelectedDesignIndex(current => (current + direction + doorDesigns.length) % doorDesigns.length);
  };

  return (
    <main className="amd-page" data-testid="page-aluminium-modular-doors">
      <section className="amd-hero" aria-labelledby="amd-title">
        <div className="amd-wrap">
          <nav className="amd-breadcrumbs" aria-label="Breadcrumb" data-testid="nav-amd-breadcrumb">
            <Link href="/" data-testid="link-amd-home">Home</Link><ChevronRight size={13} aria-hidden="true" />
            <Link href="/products" data-testid="link-amd-products">Products</Link><ChevronRight size={13} aria-hidden="true" />
            <span aria-current="page">Aluminium modular doors</span>
          </nav>
          <div className="amd-hero-grid">
            <div className="amd-hero-copy amd-reveal">
              <p className="amd-eyebrow">Bamford Doors / Aluminium entrance systems</p>
              <EditablePageHeadline id="amd-title">Built around<br />the <span>entrance.</span></EditablePageHeadline>
              <p className="amd-lead">Bespoke aluminium doors and screens for communal buildings, public spaces and the people who use them every day.</p>
              <div className="amd-actions">
                <Link href="/contact?purpose=product&product=Aluminium%20modular%20doors" className="amd-button" data-testid="link-amd-enquire">Discuss your project <ArrowRight size={16} aria-hidden="true" /></Link>
                <a className="amd-text-action" href="#configurations" data-testid="link-amd-configurations">Explore configurations <ArrowDown size={15} aria-hidden="true" /></a>
              </div>
              <div className="amd-hero-meta"><span>01 / Modular aluminium</span><span>For housing, education & public buildings</span></div>
            </div>
            <figure className="amd-hero-image amd-reveal amd-reveal-later">
              <img src={`${media}communal-entrance.jpg`} alt="Anthracite aluminium communal entrance with glazed door, fanlights and matching side screens" width="528" height="456" />
              <figcaption>Door + screen composition / Anthracite finish</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="amd-intro amd-wrap" aria-labelledby="amd-intro-title">
        <div className="amd-intro-title">
          <p className="amd-eyebrow">One system. Many possibilities.</p>
          <h2 id="amd-intro-title">A considered fit<br />for <em>shared spaces.</em></h2>
        </div>
        <div className="amd-intro-copy">
          <p className="amd-intro-emphasis">A communal entrance has to work hard: welcoming residents, managing access and standing up to daily use.</p>
          <p>Bamford’s modular aluminium system brings door, screen, glazing and access choices together in a bespoke arrangement. Start with the opening and the way the building is used; then confirm the details that matter to your project.</p>
          <Link href="/about/aluminium-versus-steel" className="amd-inline-link" data-testid="link-amd-material-guide">Compare aluminium and steel <ArrowRight size={14} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="amd-capabilities" aria-labelledby="amd-capabilities-title">
        <div className="amd-wrap">
          <div className="amd-section-head">
            <div><p className="amd-eyebrow">Made for the demands of the entrance</p><h2 id="amd-capabilities-title">Engineering you can specify.</h2></div>
            <p>Explore the system’s key considerations, then confirm the selected product configuration with Bamford.</p>
          </div>
          <div className="amd-feature-list" data-testid="list-amd-capabilities">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return <article className="amd-feature" key={feature.title} data-testid={`card-amd-feature-${index + 1}`}>
                <span className="amd-feature-index">0{index + 1}</span><Icon size={22} aria-hidden="true" />
                <div><h3>{feature.title}</h3><p>{feature.text}</p></div>
              </article>;
            })}
          </div>
        </div>
      </section>

      <section className="amd-config-section" id="configurations" aria-labelledby="amd-config-title">
        <div className="amd-wrap">
          <div className="amd-section-head amd-config-head">
            <div><p className="amd-eyebrow">Choose a door design</p><h2 id="amd-config-title">The Bamford Doors Visualiser</h2></div>
            <p>Explore sixteen door designs. The drawings show example panel layouts; your final door and screen arrangement is made to suit the opening.</p>
          </div>
          <div className="amd-design-guide">
            <p><strong>Select a design</strong> to inspect its front elevation and type code at a larger size.</p>
            <span>16 MODULAR DESIGNS</span>
          </div>
          <ul className="amd-design-grid" aria-label="Aluminium modular door designs" data-testid="list-amd-design-types">
            {doorDesigns.map(design => (
              <li key={design.code}>
                <button
                  type="button"
                  className={`amd-design-card${selectedDesignIndex === design.index ? ' is-selected' : ''}`}
                  aria-label={colorVisualizerTypes.has(design.code) ? `Open Type ${design.code} colour visualiser` : `View a larger drawing of modular door Type ${design.code}`}
                  aria-haspopup="dialog"
                  aria-pressed={selectedDesignIndex === design.index}
                  data-testid={`button-amd-type-${design.code}`}
                  onClick={() => openDesign(design.index)}
                >
                  <span className="amd-design-thumb"><img src={design.src} alt="" width="300" height="500" /></span>
                  <span className="amd-design-meta">
                    <span className="amd-design-order">DESIGN {String(design.index + 1).padStart(2, '0')}</span>
                    <strong>Type {design.code}</strong>
                    <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </button>
              </li>
            ))}
          </ul>
          <dialog
            ref={designDialogRef}
            className="amd-design-dialog"
            aria-labelledby="amd-design-dialog-title"
            data-testid="dialog-amd-design"
            onClose={() => {
              setDesignViewerOpen(false);
              setShowInstalledExample(false);
            }}
            onClick={event => {
              if (event.target === designDialogRef.current) setDesignViewerOpen(false);
            }}
          >
            <div className="amd-design-dialog-content">
              <figure className={`amd-design-dialog-visual${isColorVisualizer ? ' is-color-visualizer' : ''}`}>
                {isColorVisualizer ? (
                  <img
                    src={selectedFinishImage}
                    alt={selectedFinish
                      ? `Artistic colour mock-up of Type ${selectedDesign.code} aluminium entrance in ${selectedFinish.code} ${selectedFinish.name}`
                      : `Front elevation drawing of aluminium modular door Type ${selectedDesign.code}`}
                    width={selectedFinish ? selectedDesign.code === '2100' ? 1086 : 1104 : 300}
                    height={selectedFinish ? selectedDesign.code === '2100' ? 1448 : 1425 : 500}
                    data-testid={`image-amd-type-${selectedDesign.code}-color-preview`}
                  />
                ) : selectedDesign.example ? (
                  <button
                    type="button"
                    className="amd-design-image-toggle"
                    aria-label={showingInstalledExample ? `Show Type ${selectedDesign.code} door drawing` : `Show installed Type ${selectedDesign.code} example`}
                    aria-pressed={showingInstalledExample}
                    data-testid={`button-amd-type-${selectedDesign.code}-photo`}
                    onClick={() => setShowInstalledExample(current => !current)}
                  >
                    <img
                      src={showingInstalledExample ? selectedDesign.example.src : selectedDesign.src}
                      alt={showingInstalledExample
                        ? selectedDesign.example.alt
                        : `Front elevation drawing of aluminium modular door Type ${selectedDesign.code}`}
                      width={showingInstalledExample ? 480 : 300}
                      height={showingInstalledExample ? 640 : 500}
                    />
                    <span>{showingInstalledExample ? 'Back to the drawing' : 'See the door in reality'}</span>
                  </button>
                ) : (
                  <img src={selectedDesign.src} alt={`Front elevation drawing of aluminium modular door Type ${selectedDesign.code}`} width="300" height="500" />
                )}
              </figure>
              <div className="amd-design-dialog-copy">
                <div className="amd-design-dialog-heading">
                  <div>
                    <p className="amd-eyebrow">{isColorVisualizer ? 'Door colour visualiser' : 'Selected door design'}</p>
                    <h3 id="amd-design-dialog-title">Type {selectedDesign.code}</h3>
                    <p className={`amd-design-dialog-index${isColorVisualizer ? ' is-color-visualizer-index' : ''}`}>Design {String(selectedDesignIndex + 1).padStart(2, '0')} of 16 · {isColorVisualizer ? 'Colour visualiser' : showingInstalledExample ? 'Installed example' : 'Front elevation'}</p>
                  </div>
                  <button className="amd-design-close" type="button" aria-label="Close enlarged door design" onClick={() => setDesignViewerOpen(false)}><X size={20} aria-hidden="true" /></button>
                </div>
                <div className={`amd-design-dialog-description${isColorVisualizer ? ' is-color-visualizer-copy' : ''}`}>
                  {isColorVisualizer ? (
                    <>
                      <p className="amd-visualizer-intro">Choose a door sketch or one of seven RAL colours to compare the Type {selectedDesign.code} entrance.</p>
                      <div className="amd-visualizer-options" role="group" aria-label={`Choose a Type ${selectedDesign.code} view or RAL colour`}>
                        <button
                          type="button"
                          className={`amd-visualizer-option${selectedFinish === null ? ' is-selected' : ''}`}
                          aria-label={`Show Type ${selectedDesign.code} door sketch`}
                          aria-pressed={selectedFinish === null}
                          data-testid={`button-amd-visualizer-sketch-${selectedDesign.code}`}
                          onClick={() => setSelectedFinishCode(null)}
                        >
                          <span className="amd-visualizer-sketch-icon"><ScanLine size={15} aria-hidden="true" /></span>
                          <span className="amd-visualizer-option-label"><strong>Door sketch</strong><small>Original design</small></span>
                          {selectedFinish === null && <Check size={15} aria-hidden="true" />}
                        </button>
                        {finishes.map(finish => (
                          <button
                            key={finish.code}
                            type="button"
                            className={`amd-visualizer-option${selectedFinishCode === finish.code ? ' is-selected' : ''}`}
                            aria-label={`Show Type ${selectedDesign.code} in ${finish.code} ${finish.name}`}
                            aria-pressed={selectedFinishCode === finish.code}
                            data-testid={`button-amd-visualizer-${finish.code.toLowerCase().replace(' ', '-')}`}
                            onClick={() => setSelectedFinishCode(finish.code)}
                          >
                            <span className="amd-visualizer-swatch" style={{ backgroundColor: finish.color }} aria-hidden="true" />
                            <span className="amd-visualizer-option-label"><strong>{finish.code}</strong><small>{finish.name}</small></span>
                            {selectedFinishCode === finish.code && <Check size={15} aria-hidden="true" />}
                          </button>
                        ))}
                      </div>
                      <p className="amd-visualizer-note">
                        Colour previews are artistic mock-ups to help with colour decisions, not guaranteed colour matches. Screen settings and lighting can affect appearance; confirm the final finish with Bamford.
                      </p>
                    </>
                  ) : showingInstalledExample ? (
                    <>
                      <p>{selectedDesign.example?.description}</p>
                      <p>Final door, screen, glazing and hardware details are confirmed for each project.</p>
                    </>
                  ) : (
                    <>
                      <p>This illustration shows the panel layout for Type {selectedDesign.code}. Select another type to compare the modular door designs.</p>
                      <p>Door and screen combinations, dimensions, glazing and hardware are confirmed for each project.</p>
                    </>
                  )}
                </div>
                <div className="amd-design-dialog-controls">
                  <button type="button" aria-label={`Previous design from Type ${selectedDesign.code}`} onClick={() => moveDesign(-1)}><ArrowLeft size={16} aria-hidden="true" /><span>Previous</span></button>
                  <span>{String(selectedDesignIndex + 1).padStart(2, '0')} / 16</span>
                  <button type="button" aria-label={`Next design from Type ${selectedDesign.code}`} onClick={() => moveDesign(1)}><span>Next</span><ArrowRight size={16} aria-hidden="true" /></button>
                </div>
              </div>
            </div>
          </dialog>
        </div>
      </section>

      <section className="amd-gallery" aria-label="Aluminium entrance examples">
        <div className="amd-wrap">
          <div className="amd-gallery-top"><div><p className="amd-eyebrow">See the system in context</p><h2>Different openings.<br /><em>One bespoke approach.</em></h2></div><p>Examples of modular aluminium entrances. Images illustrate appearance only, not certification or project suitability.</p></div>
          <div className="amd-gallery-grid" data-testid="gallery-amd-examples">
            <figure className="amd-gallery-main"><ResponsiveImage src={`${media}context-entrance-01.jpg`} alt="Blue-grey aluminium door and glazed side screen within a stone-faced entrance" width="794" height="838" loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" /><figcaption>01 / Blue-grey modular entrance <small>Door, glazed sidelights and infill panels</small></figcaption></figure>
            <figure><ResponsiveImage src={`${media}context-entrance-02.jpg`} alt="Dark blue aluminium communal entrance in a yellow-brick lobby with side screens and access controls" width="793" height="918" loading="lazy" sizes="(max-width: 760px) 100vw, 25vw" /><figcaption>02 / Shared residential entrance <small>Door, glazed side panels and access control</small></figcaption></figure>
            <figure><ResponsiveImage src={`${media}context-entrance-03.jpg`} alt="Green aluminium door and glazed screen set into a brick communal entrance" width="795" height="893" loading="lazy" sizes="(max-width: 760px) 100vw, 25vw" /><figcaption>03 / Green door and screen <small>Contrasting door and glazed side panels</small></figcaption></figure>
          </div>
        </div>
      </section>

      <section className="amd-finish-section" aria-labelledby="amd-finish-title">
        <div className="amd-wrap amd-finish-layout">
          <div className="amd-finish-copy">
            <p className="amd-eyebrow">Standard colour options</p>
            <h2 id="amd-finish-title">A finish that<br />belongs <em>there.</em></h2>
            <p>Seven standard powder-coat colours provide a clear starting point for a building’s palette. Bespoke finishes may be discussed for your project.</p>
            <div className="amd-swatch-warning"><Palette size={18} aria-hidden="true" /><span>Screen swatches are indicative only. Check a physical powder-coat sample before selection.</span></div>
          </div>
          <div className="amd-swatches" data-testid="list-amd-finishes">
            {finishes.map(finish => <article className="amd-swatch" key={finish.code} data-testid={`swatch-amd-${finish.code.toLowerCase().replace(' ', '-')}`}>
              <span className="amd-swatch-color" style={{ backgroundColor: finish.color }} aria-hidden="true" />
              <div><strong>{finish.code}</strong><small>{finish.name}</small></div><Check size={15} aria-hidden="true" />
            </article>)}
          </div>
        </div>
      </section>

      <section className="amd-spec-section" aria-labelledby="amd-spec-title">
        <div className="amd-wrap amd-spec-grid">
          <div className="amd-spec-intro">
            <p className="amd-eyebrow">Details to resolve in the brief</p>
            <h2 id="amd-spec-title">Specify the whole entrance.</h2>
            <p>Performance depends on the selected configuration and project requirements. Use these points to frame a conversation with your team.</p>
            <Link href="/contact?purpose=consultation" className="amd-spec-link" data-testid="link-amd-spec-enquiry">Talk through your specification <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <ol className="amd-checklist" data-testid="list-amd-specification">
            {checklist.map(([title, text], index) => <li key={title} data-testid={`spec-amd-item-${index + 1}`}><span>0{index + 1}</span><div><strong>{title}</strong><p>{text}</p></div></li>)}
          </ol>
        </div>
      </section>

      <section className="amd-evidence" aria-labelledby="amd-evidence-title">
        <div className="amd-wrap amd-evidence-inner">
          <div className="amd-evidence-mark"><LockKeyhole size={24} aria-hidden="true" /><span>Evidence<br />to confirm</span></div>
          <div><p className="amd-eyebrow">Security and certification</p><h2 id="amd-evidence-title">Confirm what applies to your entrance.</h2><p>Security approvals and test results apply only to the product and configuration assessed. If you need Secured by Design approval or testing to STS 202 BR2, ask Bamford to confirm the current status, evidence and scope for your chosen entrance before specifying.</p></div>
          <Link href="/about/accreditations" className="amd-evidence-link" data-testid="link-amd-accreditations">Accreditations <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="amd-related" aria-labelledby="amd-related-title">
        <div className="amd-wrap">
          <div className="amd-section-head"><div><p className="amd-eyebrow">Related product</p><h2 id="amd-related-title">Keep exploring.</h2></div><p>Access, automation and complementary entrance systems are part of the wider brief.</p></div>
          <div className="amd-related-row">
            <Link href="/products/door-entry-control-systems" className="amd-related-link" data-testid="link-amd-related-access"><span>01 / Access</span><strong>Door entry and control systems</strong><ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/products/automatic-operators" className="amd-related-link" data-testid="link-amd-related-operators"><span>02 / Operation</span><strong>Automatic operators</strong><ArrowRight size={18} aria-hidden="true" /></Link>
            <Link href="/products/screens-and-curtain-walling" className="amd-related-link" data-testid="link-amd-related-screens"><span>03 / Screens</span><strong>Screens and curtain walling</strong><ArrowRight size={18} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="amd-closing" aria-labelledby="amd-closing-title">
        <div className="amd-wrap amd-closing-inner">
          <div><p className="amd-eyebrow">Bring us the opening</p><h2 id="amd-closing-title">Let’s make the brief specific.</h2><p>Tell us about the building, the entrance and what the project needs to achieve. Bamford can help you establish the next step.</p></div>
          <div className="amd-closing-actions">
            <Link href="/contact?purpose=product&product=Aluminium%20modular%20doors" className="amd-button" data-testid="link-amd-contact">Enquire about aluminium modular doors <ArrowRight size={16} aria-hidden="true" /></Link>
            <Link href="/products" className="amd-button amd-button-ghost" data-testid="link-amd-all-products">Explore all products <ArrowRight size={16} aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </main>
  );
}
