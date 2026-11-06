import { Suspense, lazy, useEffect, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateInquiry } from '@workspace/api-client-react';
import { Menu, X, ArrowRight, ChevronRight, MoveUpRight } from 'lucide-react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import { applyPageSeo, type PageSeo } from '@/lib/seo';
import { ReferenceLedHome } from '@/components/home/ReferenceLedHome';
import { AccreditationsPage } from '@/pages/AccreditationsPage';
import { OurHistoryPage } from '@/pages/OurHistoryPage';
import { SustainabilityPage } from '@/pages/SustainabilityPage';
import { MeetTheTeamPage } from '@/pages/MeetTheTeamPage';
import { CorporateSocialResponsibilityPage } from '@/pages/CorporateSocialResponsibilityPage';
import { ProjectManagementPage } from '@/pages/ProjectManagementPage';
import { ResidentInvolvementPage } from '@/pages/ResidentInvolvementPage';
import { StockConditionSurveysPage } from '@/pages/StockConditionSurveysPage';
import { WarrantiesPage } from '@/pages/WarrantiesPage';
import { FactoryPage } from '@/pages/FactoryPage';
import { AluminiumVsSteelPage } from '@/pages/AluminiumVsSteelPage';
import { ConservationAreasPage } from '@/pages/ConservationAreasPage';
import { CoastalApplicationsPage } from '@/pages/CoastalApplicationsPage';
import { AluminiumModularDoorsPage } from '@/pages/AluminiumModularDoorsPage';
import { ThermallyBrokenDoorsPage } from '@/pages/ThermallyBrokenDoorsPage';
import { WoodEffectDoorsPage } from '@/pages/WoodEffectDoorsPage';
import { HmoEntranceDoorsPage } from '@/pages/HmoEntranceDoorsPage';
import { GrpDoorsPage } from '@/pages/GrpDoorsPage';
import { AutomaticOperatorsPage } from '@/pages/AutomaticOperatorsPage';
import { DetailSkeleton } from '@/pages/case-studies/DetailSkeleton';
import { AboutOverviewPage } from '@/pages/AboutOverviewPage';
import { SectorsOverviewPage } from '@/pages/SectorsOverviewPage';
import { CASE_STUDIES_SEO } from '@/sanity/caseStudySeo';

const StudioPage = lazy(() => import('@/sanity/StudioPage'));
const NewsInsightsPage = lazy(() => import('@/pages/NewsInsightsPage'));
const CaseStudiesIndexPage = lazy(() => import('@/pages/CaseStudiesPage').then(
  (module) => ({ default: module.CaseStudiesPage }),
));
// Detail bodies are already client-only in entry-server.tsx. Keep their
// gallery/dialog dependencies off static pages without adding SSG boundaries.
const CaseStudyDetailPage = lazy(() => import('@/pages/CaseStudyDetailPage').then(
  (module) => ({ default: module.CaseStudyDetailPage }),
));
// Legacy URL metadata is needed only when a path misses the current routes.
// Keep its migration inventory out of the initial public JavaScript graph.
const LegacyRouteFallback = lazy(() => import('@/lib/legacy-route-inventory').then(
  ({ legacyEntries }) => ({
    default: function LegacyRouteFallback({ path }: { path: string }) {
      const legacyType = legacyEntries.get(path);
      if(legacyType==='news/article candidate') return <LegacyArticleDetail title={path.split('/').pop()!.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ')}/>;
      if(legacyType==='case study candidate') return <CaseStudies/>;
      if(legacyType==='team profile') return <LegacyInfo title="Bamford team"/>;
      if(legacyType==='testimonial') return <LegacyInfo title="Customer feedback"/>;
      if(legacyType==='page') return <LegacyInfo title={path.split('/').pop()!.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ')}/>;
      return <NotFound/>;
    },
  }),
));

type Product = { slug:string; title:string; summary:string; applications:string[]; features:string[]; image:string|null; cardImage?:string; legacyPath:string };
type Service = { slug:string; title:string; summary:string; howItWorks:string[]; legacyPath:string };
type Sector = { slug:string; title:string; summary:string; considerations:string[]; relatedProducts:string[] };

const products: Product[] = [
  {slug:'aluminium-modular-doors',title:'Aluminium modular doors',summary:'Bespoke modular aluminium doors and screens for communal, public and commercial buildings, with configurable glazing, access and finishes.',applications:['Communal entrances','Public and commercial buildings'],features:['Heavy-duty engineered aluminium sections','Bespoke door and screen combinations','Multiple glazing, access and finish options'],image:'/media/aluminium-modular/communal-entrance.jpg',legacyPath:'/aluminium-modular-doors/'},
  {slug:'thermally-broken-doors',title:'Thermally broken doors',summary:'A thermally broken entrance door option for buildings where this product type is required.',applications:['Communal entrances','Public and commercial buildings'],features:['Custom-made entrance systems','Available as a door and screen arrangement'],image:'/media/thermal.webp',legacyPath:'/thermally-broken-doors/'},
  {slug:'wood-effect-door',title:'Wood effect doors',summary:'Bespoke aluminium entrance doors with a woodgrain-effect finish, designed around the building and project requirements.',applications:['Communal entrances','Housing provider buildings'],features:['Woodgrain-effect powder-coated finish','Door and screen arrangements made to suit the opening'],image:'/media/wood-effect-product.jpg',legacyPath:'/wood-effect-door/'},
  {slug:'hmo',title:'HMO entrance doors',summary:'Made-to-measure entrance doors for houses in multiple occupation, planned around the building, its residents and the way access is managed.',applications:['Houses in multiple occupation','Shared residential entrances'],features:['Bespoke door and screen options','Discuss access, glazing and locking choices','Confirm current security evidence for the selected doorset'],image:'/media/hmo/entrance-03.jpg',legacyPath:'/hmo/'},
  {slug:'grp-doors',title:'Glass reinforced plastic (GRP) doors',summary:'Custom-made GRP entrance doors for communal, public and commercial buildings. Explore material properties and discuss the right specification for your project.',applications:['Shared residential entrances','Public and commercial buildings'],features:['Strong, lightweight GRP material','Versatile material for entrance designs','Discuss suitability and specification for your opening'],image:'/media/grp-doors/hero.webp',legacyPath:'/glass-reinforced-plastic-grp-doors/'},
  {slug:'automatic-operators',title:'Automatic door operators',summary:'Automatic door operators for public and shared building entrances. Discuss swing-door models, access options, energy settings, installation and maintenance with Bamford Doors.',applications:['Public and commercial building entrances','Shared residential entrances'],features:['Record DFA 127 swing-door operator may be specified, subject to current availability','Full-power or low-energy configurations','Push or pull operation and access-control options','Installation and maintenance packages to discuss'],image:'/media/automatic-operators-entrance.jpg',legacyPath:'/automatic-operators/'},
  {slug:'mailboxes',title:'Mailboxes',summary:'UK-manufactured mailboxes can be incorporated into door sets or installed on, in or through a wall or panel, planned alongside the wider entrance and access requirements.',applications:['Communal residential entrances','Door sets, walls and entrance panels','New entrance projects and existing buildings'],features:['Door-entry equipment can be considered alongside the mailbox layout','Options for specified security and fire requirements, subject to project suitability','Mailbox design coordinated with the wider entrance'],image:'/media/mailbox-entrance-01.jpg',cardImage:'/media/mailbox-product-card.jpg',legacyPath:'/mailboxes/'},
  {slug:'block-address-signs',title:'Block and address signs',summary:'Made-to-measure block and address signs for communal entrances, including signs designed to cover unused wall openings after door-entry equipment is relocated.',applications:['Communal entrances and residential blocks','Unused wall openings after door-entry alterations','Building identification and wayfinding'],features:['5 mm polycarbonate sign face','Stainless-steel vandal-resistant, anti-tamper screws','Made to order with your chosen size, font and logo'],image:'/media/block-address-signs-entrance.jpg',legacyPath:'/block-address-signs/'},
  {slug:'screens-and-curtain-walling',title:'Screens and curtain walling',summary:'Bespoke aluminium side screens and curtain walling, supplied and installed to suit building entrances and project requirements.',applications:['Building entrances','Public and commercial buildings'],features:['High-strength aluminium framing','Interchangeable glazed, GRP or louvred panels','Bespoke configurations for each application','Supply and installation available'],image:'/media/screens-curtain-walling.jpg',legacyPath:'/screens-and-curtain-walling/'},
  {slug:'door-entry-control-systems',title:'Door entry and control systems',summary:'Door entry and access control options for communal and public building entrances.',applications:['Communal entrances','Public buildings'],features:['System requirements discussed in the context of the building','Contact the team to discuss available options'],image:'/media/door-entry-control.jpg',legacyPath:'/door-entry-access-control-systems/'},
  {slug:'louvered-doors',title:'Louvered doors',summary:'Bespoke louvred doors and screens for service areas that need ventilation and privacy. Angled slats allow air to pass while the door is closed, with the layout and colour tailored to the opening.',applications:['Bin stores','Plant rooms','Boiler rooms and other service areas'],features:['Angled slats support airflow through the closed door','Louvred door and screen combinations','Made to suit the opening and project colour requirements'],image:'/media/louvered-doors.jpg',legacyPath:'/louvered-doors/'},
  {slug:'secondary-security-doors',title:'Secondary security doors',summary:'A second security door can create an additional access-controlled layer between an entrance and an internal waiting, reception or secure area. Plan the layout, glazing, access and operation around the building and its users.',applications:['Concierge and reception areas','Youth and community centres','Hospitals and healthcare buildings','Student accommodation','Offices and other spaces requiring controlled access'],features:['Bespoke door, screen and porch arrangements','Mechanical or electromagnetic locking and access-control options','Glazing, finishes, closers and threshold details selected for the project'],image:'/media/secondary-security-doors.jpg',legacyPath:'/secondary-security-doors/'},
];

const services: Service[] = [
  {slug:'project-management',title:'Project Management',summary:'Every project has a nominated Project Manager who works closely with you and our Technical Team to develop doorset solutions tailored to your building, intended use and project brief.',howItWorks:['Tell us about the building and the work being considered.','Our team can discuss the project scope and next steps with you.'],legacyPath:'/project-management/'},
  {slug:'maintenance-packages',title:'Maintenance packages',summary:'Planned inspections and minor adjustments for communal doors. Discuss visit frequency, current requirements and contract terms for your system.',howItWorks:['Share the type of entrance system and your requirements.','The team will discuss an appropriate next step.'],legacyPath:'/maintenance-packages/'},
  {slug:'stock-condition-surveys',title:'Stock Condition Surveys',summary:'Bamford Doors provides a free stock condition survey to give you a clearer picture of your communal door sets, door entry and access systems.',howItWorks:['Tell us about your buildings and survey requirements.','We will discuss scope and information needed.'],legacyPath:'/stock-condition-surveys/'},
  {slug:'warranties',title:'Warranties',summary:'Clear, project-specific warranty periods, technical-fault coverage and maintenance conditions for Bamford communal entrance doors and screens.',howItWorks:['Share the product reference or project details you have.','Confirm the written terms, eligibility and maintenance requirements for your doorset.'],legacyPath:'/warranties/'},
  {slug:'frameworks',title:'Frameworks',summary:'Speak to the team about framework-related enquiries and requirements.',howItWorks:['Share the framework or procurement context.','Our team will direct your enquiry to the right person.'],legacyPath:'/frameworks/'},
  {slug:'resident-involvement',title:'Resident Involvement',summary:'Keeping residents informed and reducing disruption. We agree with the client how residents will be kept informed, from a documented programme of works to letters at agreed intervals and, where requested, resident involvement meetings.',howItWorks:['Before work begins, we prepare a documented programme of works and issue it to the client for approval.','Where the client asks Bamfords to communicate directly with residents, we send letters at agreed intervals.'],legacyPath:'/resident-involvement/'},
  {slug:'door-entry-access-control',title:'Door entry and access control',summary:'Door entry and access control requirements for communal and public building entrances.',howItWorks:['Share the building and access requirements you are considering.','Our team can discuss the information needed to explore a suitable system.'],legacyPath:'/door-entry-access-control/'},
];

const sectors: Sector[] = [
  {slug:'local-authorities',title:'Local authorities',summary:'Bamford serves local authorities nationally with custom-made, vandal-resistant security doors and screens.',considerations:['Building use and entrance context','The requirements of the local authority','The product and project scope'],relatedProducts:['aluminium-modular-doors','thermally-broken-doors','screens-and-curtain-walling']},
  {slug:'housing-associations',title:'Housing associations',summary:'Entrance systems for housing providers, including housing associations serving communities nationally.',considerations:['Shared residential entrances','Building and resident context','Maintenance and project requirements'],relatedProducts:['aluminium-modular-doors','wood-effect-door','hmo','mailboxes']},
  {slug:'schools',title:'Schools',summary:'Bamford serves schools with custom-made security doors and screens.',considerations:['The school building and entrance','How the entrance is used','The project requirements'],relatedProducts:['aluminium-modular-doors','screens-and-curtain-walling','automatic-operators']},
  {slug:'public-commercial-buildings',title:'Public and commercial buildings',summary:'Bamford serves public-sector and other public and commercial buildings nationally.',considerations:['The building and entrance context','The intended use','The required product scope'],relatedProducts:['aluminium-modular-doors','grp-doors','screens-and-curtain-walling']},
  {slug:'social-housing',title:'Social housing',summary:'Bamford designs, manufactures and installs custom-made security doors and screens for housing providers.',considerations:['Shared entrances and resident use','The existing entrance and its condition','The organisation’s project and maintenance requirements'],relatedProducts:['aluminium-modular-doors','wood-effect-door','hmo','mailboxes']},
  {slug:'apartment-blocks',title:'Apartment blocks',summary:'Custom-made door and entrance system options for shared residential buildings.',considerations:['How residents and visitors use the entrance','The building layout and existing system','Project scope and access requirements'],relatedProducts:['aluminium-modular-doors','thermally-broken-doors','door-entry-control-systems']},
  {slug:'hmos',title:'HMOs',summary:'Door and entrance system options for houses in multiple occupation, designed around residents and shared access.',considerations:['Shared access for residents and visitors','The building layout and entrance requirements','Applicable fire safety, security and accessibility requirements'],relatedProducts:['hmo','aluminium-modular-doors','door-entry-control-systems']},
  {slug:'student-accommodation',title:'Student accommodation',summary:'Entrance system options for shared residential buildings, including student accommodation.',considerations:['The entrance and building context','How access is managed','The project requirements'],relatedProducts:['aluminium-modular-doors','hmo','door-entry-control-systems']},
  {slug:'healthcare',title:'Healthcare',summary:'Discuss door and entrance system requirements for healthcare buildings with the Bamford team.',considerations:['The building and entrance context','How the entrance is used','Applicable project and building requirements'],relatedProducts:['aluminium-modular-doors','automatic-operators','screens-and-curtain-walling']},
  {slug:'education',title:'Education',summary:'Bamford serves schools and other education settings with custom-made security doors and screens.',considerations:['The education setting and entrance','How the entrance is used','The project requirements'],relatedProducts:['aluminium-modular-doors','screens-and-curtain-walling','automatic-operators']},
  {slug:'commercial-property',title:'Commercial property',summary:'Door and entrance system requirements for commercial buildings can be discussed with Bamford.',considerations:['The building and entrance context','The intended use','The project scope'],relatedProducts:['aluminium-modular-doors','grp-doors','automatic-operators']},
  {slug:'public-government-buildings',title:'Public and government buildings',summary:'Bamford serves public-sector buildings with custom-made security doors and screens.',considerations:['The public-facing entrance','The building and operational context','The project requirements'],relatedProducts:['aluminium-modular-doors','screens-and-curtain-walling','door-entry-control-systems']},
];

const legacyAliases: Record<string,string> = {
  '/glass-reinforced-plastic-grp-doors':'/grp-doors',
  '/glass-reinforced-plastic-grp-doors/':'/grp-doors',
};
const legacyCompanyRoutes: Record<string,string> = {
  '/about-5':'/about',
  '/our-history':'/about/history',
  '/our-factory':'/about/factory',
  '/sustainability':'/about/sustainability',
  '/accreditations':'/about/accreditations',
  '/team-grid-style2':'/about/meet-the-team',
  '/steel-versus-aluminium':'/about/aluminium-versus-steel',
  '/corporate-social-responsibility':'/about/corporate-social-responsibility',
  '/social-value':'/about/corporate-social-responsibility',
};
const companyPages: Record<string,{title:string;lead:string;body:string[]}> = {
  '/about':{title:'About Bamford Doors',lead:'A UK door and entrance systems manufacturer serving public and commercial buildings.',body:['Bamford designs, manufactures and installs custom-made, vandal-resistant security doors and screens.','The company serves local authorities, housing associations, schools and other public-sector buildings nationally.']},
  '/about/history':{title:'Our history',lead:'From a small marine engine named Ajax to the security entrances we make today, Bamford’s story has always been shaped by engineering and family.',body:['Discover the people, engineering milestones and product changes that shaped Bamford Doors.']},
  '/about/factory':{title:'Our Factory',lead:'Made in Stockport, built around your project. Bespoke security doors and screens from our purpose-built 68,000 sq ft factory and office.',body:['Bamford Doors designs, manufactures and installs security doors and screens for housing associations, local authorities, schools and other public buildings.','Our factory can produce around 60 doors and screens in a standard working week, with capacity to increase to around 90 when required.','We manufacture aluminium modular, thermally broken, woodgrain-effect and GRP doors, alongside automatic operators, louvred doors, side screens and curtain walling.','Our products are designed and hand-built in Britain. Spare parts are available for up to 20 years, depending on the product and specification.']},
  '/about/sustainability':{title:'Sustainability',lead:'Bamford recognises its responsibility to procure and manufacture goods and services sustainably, protect the environment and work towards net zero.',body:['Explore Bamford’s environmental actions and the sustainability values built into its products.']},
  '/about/accreditations':{title:'Accreditations',lead:'Bamford Doors is committed to earning your trust through recognised standards and independent assessment.',body:['Share the tender criteria or certification information you need to check with the team.']},
  '/about/meet-the-team':{title:'Meet the team',lead:'Meet the people who coordinate Bamford’s projects, installations, production and regional client support.',body:['Find contact details for the team members who help manage project, manufacturing and installation enquiries.']},
  '/about/aluminium-versus-steel':{title:'Aluminium versus steel',lead:'Compare aluminium and steel doors for corrosion, maintenance, strength, weight and whole-project requirements.',body:['A practical guide to the material trade-offs that shape entrance design, operation and long-term care.']},
  '/about/corporate-social-responsibility':{title:'Corporate social responsibility',lead:'Bamford Doors contributes to the communities it works in through charitable giving, practical support, school and college partnerships, and work with housing associations.',body:['Our colleagues play an active part through our in-house charity team and monthly challenges, supporting causes that matter to our staff and our community.']},
  '/about/unique-environments':{title:'Unique environments',lead:'Some buildings have specific setting and exposure requirements.',body:['Discuss the building, location and relevant planning or environmental requirements with the Bamford team.']},
  '/about/conservation-areas':{title:'Conservation areas',lead:'Explore bespoke communal entrance design for conservation areas, with guidance on finishes, planning context and access.',body:['Review design options for heritage settings and confirm local planning requirements before specifying or installing.']},
  '/about/coastal-applications':{title:'Coastal applications',lead:'Plan communal entrances for salt-laden air, wind-driven rain and demanding coastal exposure.',body:['Compare material considerations, finishes and practical specification questions for coastal properties.']},
};
const aboutOverviewLinks = Object.entries(companyPages)
  .filter(([href]) => href !== '/about')
  .map(([href, page]) => ({ href, title: page.title, lead: page.lead }));
const navItems = [['Products','/products'],['Services','/services'],['Sectors','/sectors'],['Case studies','/case-studies'],['News','/news-insights'],['About','/about']] as const;
const productPath=(p:Product)=>`/products/${p.slug}`;
const servicePath=(s:Service)=>`/services/${s.slug}`;
const sectorPath=(s:Sector)=>`/sectors/${s.slug}`;
const normalizePath=(path:string)=>decodeURI(path).replace(/\/+$/,'')||'/';
const queryClient=new QueryClient();

function Header() {
  const [open,setOpen]=useState(false);
  const [location]=useLocation();
  return <><div className="topline"><span>DESIGNED · MANUFACTURED · INSTALLED</span><span>UK-wide service for public and commercial buildings</span></div><header className="header"><div className="header-inner">
    <Link href="/" className="brand" aria-label="Bamford Doors home" data-testid="link-home-logo"><img src="/media/bamford-doors-wordmark.png" alt="Bamford Doors" /></Link>
    <nav className="nav" aria-label="Main navigation"><Link href="/" data-testid="link-nav-home">Home</Link>{navItems.map(([label,path])=><Link key={path} href={path} aria-current={location===path?'page':undefined} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ','-')}`}>{label}</Link>)}</nav>
    <Link className="nav-cta" href="/contact?purpose=consultation" data-testid="link-contact-header">Start an enquiry <ArrowRight size={15}/></Link>
    <button className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)} data-testid="button-mobile-menu">{open?<X/>:<Menu/>}</button>
  </div>{open&&<nav className="mobile-nav" aria-label="Mobile navigation"><Link href="/" onClick={()=>setOpen(false)} data-testid="link-mobile-home">Home</Link>{navItems.map(([label,path])=><Link key={path} href={path} onClick={()=>setOpen(false)} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ','-')}`}>{label}</Link>)}<Link className="nav-cta" href="/contact?purpose=consultation" onClick={()=>setOpen(false)} data-testid="link-mobile-contact">Request a Consultation <ArrowRight size={15}/></Link></nav>}</header></>;
}

function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-grid"><div><img className="footer-logo" src="/media/bamford-doors-footer-logo.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div><div><h3>Explore</h3>{navItems.slice(0,4).map(([label,path])=><Link key={path} href={path}>{label}</Link>)}<Link href="/news-insights">News &amp; insights</Link></div><div><h3>About</h3><Link href="/about">About Bamford</Link><Link href="/faq">Frequently asked questions</Link><Link href="/downloads">Documents and downloads</Link></div><div><h3>Start a conversation</h3><p>Tell us what your building needs.</p><Link href="/contact">Contact Bamford <ArrowRight size={13}/></Link></div></div><div className="footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span></div></div></footer>;
}

function Breadcrumbs({items}:{items:{label:string;href?:string}[]}) {
  return <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link>{items.map((item,i)=><span key={`${item.label}-${i}`} style={{display:'contents'}}><ChevronRight size={12}/>{item.href?<Link href={item.href}>{item.label}</Link>:<span aria-current="page">{item.label}</span>}</span>)}</nav>;
}
function PageHeading({eyebrow,title,lead}:{eyebrow?:string;title:string;lead?:string}) {
  return <div className="page-hero"><div className="wrap"><p className="eyebrow">{eyebrow||'Bamford Doors'}</p><h1>{title}</h1>{lead&&<p className="lead">{lead}</p>}</div></div>;
}
function CTA({title='Discuss your requirements',text='Tell us about your building, entrance or project and our team can help with the next step.'}:{title?:string;text?:string}) {
  return <section className="feature-band"><div className="wrap" style={{display:'flex',alignItems:'center',justifyContent:'space-between',gap:30,flexWrap:'wrap'}}><div><p className="eyebrow">Talk to Bamford</p><h2 style={{fontSize:'clamp(28px,4vw,42px)'}}>{title}</h2><p style={{color:'#c5c5c5',maxWidth:610,marginBottom:0}}>{text}</p></div><Link href="/contact" className="button" data-testid="link-contact-cta">Contact our team <ArrowRight size={16}/></Link></div></section>;
}

function Home() {
  return (
    <><main className="main">
            <section className="text-[15px]"><div className="wrap hero-grid"><div className="hero-copy"><p className="eyebrow">Bamford Doors <span className="eyebrow-divider">/</span> Made for the entrance</p><h1>Quality Bespoke Security Doors for Social Housing Providers and Landlords</h1><p className="hero-question">Entrances matter. Make yours fit the building.</p><p>Bamford designs, manufactures and installs custom-made security doors and screens for housing providers, councils and building teams.</p><div className="hero-actions"><Link href="/contact?purpose=consultation" className="button" data-testid="link-request-consultation">Request a Consultation <ArrowRight size={16}/></Link><Link href="/products" className="button button-outline" data-testid="link-explore-products">Explore products</Link></div><span className="hero-note">For shared entrances and public buildings</span></div><div className="hero-photo"><ResponsiveImage src="/media/grp.webp" alt="Bamford security entrance door at a shared residential building" sizes="(max-width: 760px) 100vw, 50vw" fetchPriority="high" /><span className="hero-photo-index">01 <i/> ENTRANCE SYSTEMS</span></div></div></section>
            <section className="font-semibold text-[15px]"><div className="wrap audience-inner"><span>Built around the needs of</span><Link href="/sectors/social-housing">Social housing</Link><Link href="/sectors/local-authorities">Local authorities</Link><Link href="/sectors/housing-associations">Housing associations</Link><Link href="/sectors/apartment-blocks">Building teams</Link></div></section>
            <section className="section intro-section"><div className="wrap split"><div><p className="eyebrow">An entrance is a working part of the building</p><h2>One entrance.<br/><em>Many considerations.</em></h2></div><div className="intro-copy"><p className="section-lead">Every shared entrance has its own context: the building, the people who use it and the work planned around it.</p><p>Bamford can help you explore door and screen options, alongside services that support your project. Start with the requirement; the team can discuss what comes next.</p><Link className="text-link" href="/contact?purpose=consultation">Talk through your project <ArrowRight size={14}/></Link></div></div></section>
            <section className="section sector-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">Who we work with</p><h2>For buildings serving people.</h2></div><p>Explore information shaped around your building type and the entrance it needs.</p></div><div className="sector-feature-grid">{sectors.filter(s=>['social-housing','local-authorities','housing-associations','apartment-blocks'].includes(s.slug)).map((s,i)=><Link className={`sector-feature sector-feature-${i+1}`} key={s.slug} href={sectorPath(s)} data-testid={`card-sector-${s.slug}`}><span className="sector-number">0{i+1} / SECTOR</span><strong>{s.title}</strong><p>{s.summary}</p><span className="sector-arrow"><MoveUpRight size={18}/></span></Link>)}</div><Link className="text-link sector-all-link" href="/sectors">View all sectors <ArrowRight size={14}/></Link></div></section>
            <section className="section product-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">Product range</p><h2>Made for the entrance.</h2></div><p>Explore door and entrance system options, then talk with the team about your building and project requirements.</p></div><div className="product-grid">{products.slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div><div className="product-index-link"><span>Door systems, screens and entrance details.</span><Link className="text-link" href="/products">Explore all products <ArrowRight size={14}/></Link></div></div></section>
            <section className="service-spotlight"><div className="service-visual"><ResponsiveImage src="/media/wood-effect.webp" alt="Wood-effect entrance door in a residential building" loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" /><span>DETAIL / 02</span></div><div className="service-copy"><p className="eyebrow">More than a product</p><h2>Support for the work around the door.</h2><p>From project management to maintenance discussions and stock condition surveys, explore services for the wider entrance requirement.</p><Link className="button" href="/services">Explore services <ArrowRight size={15}/></Link><div className="service-links">{services.slice(0,3).map((s,i)=><Link key={s.slug} href={servicePath(s)}><span>0{i+1}</span>{s.title}<ArrowRight size={14}/></Link>)}</div></div></section>
            <section className="section process-section"><div className="wrap split"><div><p className="eyebrow">Start with a conversation</p><h2>Bring the building into focus.</h2><p className="process-intro">Share what you know. The team can discuss the building, the entrance and the details needed to explore a suitable next step.</p><Link className="text-link" href="/contact">What to include in an enquiry <ArrowRight size={14}/></Link></div><ol className="process-list">{['Tell us about the building','Discuss the requirement','Agree a way forward'].map((step,index)=><li key={step}><span>0{index+1}</span><strong>{step}</strong></li>)}</ol></div></section>
            <section className="feature-band home-cta"><div className="wrap"><p className="eyebrow">Start here</p><h2>Let’s talk about your entrance.</h2><p>Tell us what you are looking to discuss. Share only the project information you have to hand.</p><div className="hero-actions"><Link className="button" href="/contact?purpose=consultation">Request a Consultation <ArrowRight size={15}/></Link><Link className="button button-outline" href="/contact?purpose=stock-survey">Request a Stock Condition Survey</Link><Link className="text-link" href="/contact?purpose=product">Enquire about a product <ArrowRight size={14}/></Link><Link className="text-link" href="/contact?purpose=callback">Request a callback <ArrowRight size={14}/></Link></div></div></section>
          </main></>
  );
}

function ProductCard({product,imageOverride}:{product:Product;imageOverride?:string}) {
  const cardImage=imageOverride||product.cardImage||product.image;
  return <Link className="product-card" href={productPath(product)} data-testid={`card-product-${product.slug}`}>{cardImage?<ResponsiveImage src={cardImage} alt={product.title} loading="lazy" sizes="(max-width: 760px) 50vw, 33vw"/>:<div className="product-image-pending" aria-label={`Approved image not yet supplied for ${product.title}`}><span>Product image to be supplied</span></div>}<div className="product-card-copy"><h3>{product.title}</h3><p>{product.summary}</p><span className="text-link">Explore product <ArrowRight size={13}/></span></div></Link>;
}

function ProductIndex() {
  return <><PageHeading eyebrow="Products" title="Door and entrance systems" lead="Custom-made, vandal-resistant security doors and screens for housing providers, councils, schools and public and commercial buildings."/><section className="section"><div className="wrap"><div className="product-grid">{products.map(p=><ProductCard key={p.slug} product={p} imageOverride={p.slug==='thermally-broken-doors'?'/media/thermal-door-card.webp':undefined}/>)}</div></div></section><CTA/></>;
}
function MailboxesPageContent({product}:{product:Product}) {
  const photos = [
    {src:'/media/mailbox-entrance-02.jpg',alt:'Mailbox bank installed in a dark panel beside a communal entrance door',caption:'Mailbox bank integrated beside an entrance'},
    {src:'/media/mailbox-entrance-03.jpg',alt:'White communal entrance with a mailbox bank built into the side panel',caption:'Mailbox layout within a wider door set'},
    {src:'/media/mailbox-entrance-04.jpg',alt:'Freestanding bank of dark mailboxes arranged in rows',caption:'Freestanding mailbox arrangement'},
  ];
  return <>
    <section className="section mailbox-overview">
      <div className="wrap">
        <Breadcrumbs items={[{label:'Products',href:'/products'},{label:product.title}]}/>
        <div className="detail-layout mailbox-detail">
          <div className="detail-image"><ResponsiveImage src={product.image || ''} alt="Communal entrance door with an integrated mailbox bank and door-entry panel" width="751" height="1000" sizes="(max-width: 760px) 100vw, 50vw"/></div>
          <div className="detail-text">
            <p className="eyebrow">Complete entrance solutions</p>
            <h2 style={{fontSize:34}}>Mailboxes designed for complete entrance solutions.</h2>
            <p>Bamford offers UK-manufactured mailboxes that can be incorporated into door sets to complete an entrance. Plan the mailbox position and layout alongside the door and access requirements.</p>
            <p>Considering mailboxes as part of the wider entrance design helps shape an arrangement around the building and the people who live there.</p>
          </div>
        </div>
      </div>
    </section>

    <section className="section section-muted" aria-labelledby="mailbox-options-title">
      <div className="wrap">
        <div className="section-head">
          <div><p className="eyebrow">Flexible installation options</p><h2 id="mailbox-options-title">Plan the position around the entrance.</h2></div>
          <p>Every entrance is unique. Choose an arrangement to suit the building layout and residents’ needs.</p>
        </div>
        <div className="mailbox-options-grid">
          <article className="mailbox-option">
            <p className="mailbox-option-index">01 / PLACEMENT</p>
            <h3>Integrated or installed separately.</h3>
            <p>Mailboxes can be installed on, in or through a wall or panel, or incorporated into a door set. The location and layout can be planned around the entrance.</p>
          </article>
          <article className="mailbox-option">
            <p className="mailbox-option-index">02 / ACCESS</p>
            <h3>Post and visitor access, considered together.</h3>
            <p>Where required, mailboxes can accommodate door-entry systems. This allows post and visitor access equipment to be considered as part of the same entrance scheme.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="product-photo-gallery" aria-labelledby="mailbox-gallery-title">
      <div className="wrap">
        <div className="product-photo-gallery-heading">
          <div><p className="eyebrow">Mailbox arrangements</p><h2 id="mailbox-gallery-title">Planned with the entrance.</h2></div>
          <p>Examples of mailbox banks integrated into entrance layouts or installed as a separate unit.</p>
        </div>
        <div className="product-photo-gallery-grid mailbox-gallery-grid">
          {photos.map((photo,index)=><figure key={photo.src}><ResponsiveImage src={photo.src} alt={photo.alt} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw"/><figcaption><span>0{index+1} / PROJECT</span>{photo.caption}</figcaption></figure>)}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="mailbox-project-title">
      <div className="wrap">
        <div className="section-head">
          <div><p className="eyebrow">Options for security and fire requirements</p><h2 id="mailbox-project-title">Confirm the specification for your project.</h2></div>
          <p>Mailbox choice depends on the selected product and how it is incorporated into the overall entrance.</p>
        </div>
        <div className="mailbox-requirements-grid">
          <article className="mailbox-requirement">
            <h3>Security and fire performance</h3>
            <p>Options may be suitable for projects with Secured by Design or two-hour fire-rated requirements. Confirm current supporting evidence and suitability for the selected mailbox, door or panel, and installation.</p>
          </article>
          <article className="mailbox-requirement">
            <h3>Planned around your project</h3>
            <p>Bamford designs, manufactures and installs security doors and screens for local authorities, housing associations, schools and other public-sector buildings. Mailbox requirements can be considered alongside the door set, wall or panel, and access arrangements.</p>
            <p>Whether you are planning a new entrance or reviewing an existing one, our team can discuss the available mailbox options and their suitability for your project.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="mailbox-contact" aria-labelledby="mailbox-contact-title">
      <div className="wrap mailbox-contact-inner">
        <div>
          <p className="eyebrow">Talk to our team</p>
          <h2 id="mailbox-contact-title">Discuss mailboxes for your entrance project.</h2>
          <p>Tell us about the building and the entrance requirements you are planning around.</p>
        </div>
        <div className="mailbox-contact-links">
          <a href="tel:+441614806500">Call 0161 480 6500 <ArrowRight size={15}/></a>
          <a href="mailto:sales@bamforddoors.com">Email sales@bamforddoors.com <ArrowRight size={15}/></a>
        </div>
      </div>
    </section>
  </>;
}
function BlockAddressSignsContent({product}:{product:Product}) {
  return <>
    <section className="section signage-overview">
      <div className="wrap">
        <Breadcrumbs items={[{label:'Products',href:'/products'},{label:product.title}]}/>
        <div className="detail-layout signage-detail">
          <div className="detail-image"><ResponsiveImage src={product.image || ''} alt="Block address sign displayed beside a communal entrance door" width="758" height="1024" sizes="(max-width: 760px) 100vw, 50vw"/></div>
          <div className="detail-text">
            <p className="eyebrow">Entrance signage</p>
            <h2 style={{fontSize:34}}>Useful information. A considered entrance detail.</h2>
            <p>When door-entry equipment is relocated or incorporated into a new side screen, the work can leave an unused aperture in the wall or brickwork. A made-to-measure sign can cover that opening and keep building information clear.</p>
            <p>Bamford can supply and install a purpose-made sign, tailored with your chosen wording, dimensions, font or logo.</p>
            <Link className="button" href={`/contact?purpose=product&product=${encodeURIComponent(product.title)}`} data-testid="link-enquire-block-address-signs">Discuss a sign for your project <ArrowRight size={15}/></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section section-muted" aria-labelledby="signage-specification-title">
      <div className="wrap">
        <div className="section-head">
          <div><p className="eyebrow">Made to measure</p><h2 id="signage-specification-title">Built around your entrance and its requirements.</h2></div>
          <p>Discuss the opening, sign layout and visual details with the team.</p>
        </div>
        <div className="signage-spec-grid">
          <article className="signage-spec-card">
            <p className="signage-spec-index">01 / APPLICATION</p>
            <h3>Cover previous door-entry openings.</h3>
            <p>A purpose-made sign can cover an unused aperture after door-entry panels are moved or integrated into a replacement side screen. Dimensions can be tailored to the area.</p>
          </article>
          <article className="signage-spec-card">
            <p className="signage-spec-index">02 / SPECIFICATION</p>
            <h3>Choose the details that suit the building.</h3>
            <p>Signs are constructed from 5 mm polycarbonate and secured with stainless-steel vandal-resistant, anti-tamper screws. Size, font, logos and information can be set to your requirements; confirm the final specification for your project.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="section signage-detail-section" aria-labelledby="signage-detail-title">
      <div className="wrap signage-proof-layout">
        <div className="signage-proof-copy">
          <p className="eyebrow">Block and address signage</p>
          <h2 id="signage-detail-title">Clear identification at the entrance.</h2>
          <p>Block numbers, street names, logos and other required information can be combined in a layout designed for the sign’s position on the building.</p>
          <p>Share the opening dimensions and the wording you need, and the team can discuss a suitable sign and installation.</p>
        </div>
        <figure className="signage-proof-image">
          <ResponsiveImage src="/media/block-address-signs-detail.jpg" alt="Close-up of a block address sign showing building numbers and street name" width="758" height="1024" loading="lazy" sizes="(max-width: 760px) 100vw, 50vw"/>
          <figcaption>Block number and street name displayed on a made-to-measure sign.</figcaption>
        </figure>
      </div>
    </section>

    <section className="signage-contact" aria-labelledby="signage-contact-title">
      <div className="wrap signage-contact-inner">
        <div>
          <p className="eyebrow">Talk to our team</p>
          <h2 id="signage-contact-title">Discuss block and address signs for your entrance.</h2>
          <p>Tell us about the building, the sign location and the information you would like to include.</p>
        </div>
        <div className="signage-contact-links">
          <a href="tel:+441614806500">Call 0161 480 6500 <ArrowRight size={15}/></a>
          <a href="mailto:sales@bamforddoors.com">Email sales@bamforddoors.com <ArrowRight size={15}/></a>
        </div>
      </div>
    </section>
  </>;
}
function SecondarySecurityDoorsContent({product}:{product:Product}) {
  const photos = [
    {src:'/media/secondary-security-doors-brown.jpg',alt:'Brown secondary security door with glazed panels separating internal areas',caption:'Brown internal door arrangement'},
    {src:'/media/secondary-security-doors-blue.jpg',alt:'Blue security entrance door with glazed panels',caption:'Blue glazed door arrangement'},
  ];
  const specification = [
    {title:'Door, screen or porch',text:'Bespoke configurations can include a second door, a porch or a screen arrangement, planned around the opening and the way people use the space.'},
    {title:'Access, locking and operation',text:'Mechanical or electromagnetic locking and door-entry equipment can be considered. Closer, automatic operator and threshold options depend on the door and the wider access requirements.'},
    {title:'Aluminium frame and concealed details',text:'The door leaf can be rebated into the frame and hung on a continuous hinge. Aluminium offers a lightweight, recyclable framing option; confirm construction and fixing details for the selected design.'},
    {title:'Glazing and finish choices',text:'Laminated, toughened, double-glazed or polycarbonate glazing may be considered, with anodised or powder-coated finishes, including wood-effect options. Confirm current availability, suitability and applicable requirements for the chosen configuration.'},
  ];
  return <>
    <section className="section secondary-security-overview">
      <div className="wrap">
        <Breadcrumbs items={[{label:'Products',href:'/products'},{label:product.title}]}/>
        <div className="detail-layout secondary-security-detail">
          <div className="detail-image"><ResponsiveImage src={product.image || ''} alt="Secondary security doors and glazed screens in an internal entrance" width="983" height="1124" sizes="(max-width: 760px) 100vw, 50vw"/></div>
          <div className="detail-text">
            <p className="eyebrow">A second layer of access control</p>
            <h2 style={{fontSize:34}}>Separate the entrance from the space beyond.</h2>
            <p>A secondary security door can provide an additional controlled boundary between a public-facing entrance and an internal waiting room, reception area or other space.</p>
            <p>It may be configured as a second door, a porch or a door with bespoke screens. The layout and access options can be considered around the building, its users and the project requirements.</p>
            <p className="product-claim-note">Confirm access, glazing, threshold and hardware choices against current requirements and the exact door configuration.</p>
            <Link className="button" href={`/contact?purpose=product&product=${encodeURIComponent(product.title)}`} data-testid="link-enquire-secondary-security-doors">Discuss your entrance <ArrowRight size={15}/></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="section section-muted" aria-labelledby="secondary-security-applications-title">
      <div className="wrap">
        <div className="section-head">
          <div><p className="eyebrow">Where a second door may be considered</p><h2 id="secondary-security-applications-title">A further controlled transition inside the building.</h2></div>
          <p>Suitable applications depend on the building, how visitors enter and the level of access control required.</p>
        </div>
        <div className="secondary-security-app-grid">
          {product.applications.map((application,index)=><article className="secondary-security-app-card" key={application}><span>0{index+1} / APPLICATION</span><h3>{application}</h3></article>)}
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="secondary-security-spec-title">
      <div className="wrap">
        <div className="section-head">
          <div><p className="eyebrow">Designed around the project</p><h2 id="secondary-security-spec-title">Configure the door, access and finish together.</h2></div>
          <p>Each choice needs to work with the opening and the intended use of the space.</p>
        </div>
        <div className="secondary-security-spec-grid">
          {specification.map((item,index)=><article className="secondary-security-spec-card" key={item.title}><p className="secondary-security-spec-index">0{index+1} / SPECIFICATION</p><h3>{item.title}</h3><p>{item.text}</p></article>)}
        </div>
        <p className="secondary-security-suitability">Accessibility, security, glazing and operating requirements depend on the complete doorset and installation. Confirm current evidence and project suitability before specification.</p>
      </div>
    </section>

    <section className="product-photo-gallery" aria-labelledby="secondary-security-gallery-title">
      <div className="wrap">
        <div className="product-photo-gallery-heading">
          <div><p className="eyebrow">Door examples</p><h2 id="secondary-security-gallery-title">Different layouts for different spaces.</h2></div>
          <p>Examples of secondary door arrangements. Final design, glazing, finish and access equipment are project-specific.</p>
        </div>
        <div className="product-photo-gallery-grid secondary-security-gallery-grid">
          {photos.map((photo,index)=><figure key={photo.src}><ResponsiveImage src={photo.src} alt={photo.alt} loading="lazy" sizes="(max-width: 760px) 100vw, 33vw"/><figcaption><span>0{index+1} / EXAMPLE</span>{photo.caption}</figcaption></figure>)}
        </div>
      </div>
    </section>

    <section className="secondary-security-contact" aria-labelledby="secondary-security-contact-title">
      <div className="wrap secondary-security-contact-inner">
        <div>
          <p className="eyebrow">Talk to our team</p>
          <h2 id="secondary-security-contact-title">Discuss a secondary door for your building.</h2>
          <p>Share the building type, entrance arrangement and access requirements you are considering.</p>
        </div>
        <div className="secondary-security-contact-links">
          <a href="tel:+441614806500">Call 0161 480 6500 <ArrowRight size={15}/></a>
          <a href="mailto:sales@bamforddoors.com">Email sales@bamforddoors.com <ArrowRight size={15}/></a>
        </div>
      </div>
    </section>
  </>;
}
function ProductDetail({product}:{product:Product}) {
  if(product.slug==='mailboxes') return <><PageHeading eyebrow="Products" title={product.title} lead={product.summary}/><MailboxesPageContent product={product}/><section className="section section-muted"><div className="wrap"><p className="eyebrow">More to explore</p><h2 style={{marginBottom:28}}>Related products</h2><div className="product-grid">{products.filter(p=>p.slug!==product.slug).slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section></>;
  if(product.slug==='block-address-signs') return <><PageHeading eyebrow="Products" title={product.title} lead={product.summary}/><BlockAddressSignsContent product={product}/><section className="section section-muted"><div className="wrap"><p className="eyebrow">More to explore</p><h2 style={{marginBottom:28}}>Related products</h2><div className="product-grid">{products.filter(p=>p.slug!==product.slug).slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section></>;
  if(product.slug==='secondary-security-doors') return <><PageHeading eyebrow="Products" title={product.title} lead={product.summary}/><SecondarySecurityDoorsContent product={product}/><section className="section section-muted"><div className="wrap"><p className="eyebrow">More to explore</p><h2 style={{marginBottom:28}}>Related products</h2><div className="product-grid">{products.filter(p=>p.slug!==product.slug).slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section></>;
  const louveredDoor = product.slug === 'louvered-doors';
  const curtainWallingPhotos = product.slug === 'screens-and-curtain-walling' ? [
    { src: '/media/screens-curtain-walling-02.jpg', alt: 'Green entrance door within a tall aluminium-framed side screen with louvred panels', caption: 'Side screen with a mix of panel types' },
    { src: '/media/screens-curtain-walling-03.jpg', alt: 'Glazed aluminium entrance screen with a central communal door and access control', caption: 'Glazed entrance screen and door' },
    { src: '/media/screens-curtain-walling-04.jpg', alt: 'Brown aluminium curtain walling with glazed panels, louvres and an entrance door', caption: 'Curtain walling with glazing and louvres' },
  ] : null;
  return <><PageHeading eyebrow="Products" title={product.title} lead={product.summary}/><div className="wrap"><Breadcrumbs items={[{label:'Products',href:'/products'},{label:product.title}]}/><div className="detail-layout"><div className="detail-image">{product.image?<img src={product.image} alt={product.title}/>:<div className="product-image-pending product-detail-pending"><span>Approved product photography to be supplied</span></div>}</div><div className="detail-text"><p className="eyebrow">Product overview</p><h2 style={{fontSize:34}}>{curtainWallingPhotos ? 'A considered frame. A flexible finish.' : louveredDoor ? 'Ventilation for service spaces.' : 'Made to suit the entrance.'}</h2><p>{curtainWallingPhotos ? 'Bamford side screens and curtain walling use a high-strength aluminium frame with interchangeable panels selected around your project. Choose glazed, GRP or louvred panels, combined and made to suit each application.' : louveredDoor ? 'Louvred doors and screens are often used in bin stores, plant rooms and boiler rooms. Angled slats can allow air to pass through while the door is closed, while helping maintain privacy. The final balance of airflow and privacy depends on the louvre design and installation.' : `${product.summary} Discuss your building and requirements with our team.`}</p><h3 style={{fontSize:18,marginTop:30}}>Where this product may be considered</h3><ul className="info-list">{product.applications.map(x=><li key={x}>{x}</li>)}</ul><h3 style={{fontSize:18,marginTop:22}}>Product information</h3><ul className="info-list">{product.features.map(x=><li key={x}>{x}</li>)}</ul>{louveredDoor && <p className="product-claim-note">Ask us to confirm current ISO 9001 certification and the scope that applies to your project.</p>}<Link className="button" href={`/contact?purpose=product&product=${encodeURIComponent(product.title)}`} data-testid={`link-enquire-${product.slug}`}>Enquire about this product <ArrowRight size={15}/></Link></div></div></div>{curtainWallingPhotos && <section className="product-photo-gallery" aria-labelledby="product-photo-gallery-title"><div className="wrap"><div className="product-photo-gallery-heading"><div><p className="eyebrow">Project examples</p><h2 id="product-photo-gallery-title">Screens and curtain walling in context.</h2></div><p>Explore examples of bespoke aluminium frames with different panel combinations and entrance layouts.</p></div><div className="product-photo-gallery-grid">{curtainWallingPhotos.map((photo, index) => <figure key={photo.src}><img src={photo.src} alt={photo.alt} loading="lazy"/><figcaption><span>0{index + 2} / PROJECT</span>{photo.caption}</figcaption></figure>)}</div></div></section>}<section className="section section-muted"><div className="wrap"><p className="eyebrow">More to explore</p><h2 style={{marginBottom:28}}>Related products</h2><div className="product-grid">{products.filter(p=>p.slug!==product.slug).slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section></>;
}

function ServiceIndex() { return <><PageHeading eyebrow="Services" title="Support around the entrance" lead="Discuss the wider requirements of your entrance system project with the Bamford team."/><section className="section"><div className="wrap tile-grid">{services.map(s=><Link className="tile" href={servicePath(s)} key={s.slug}><strong>{s.title}</strong><p>{s.summary}</p><span className="arrow"><MoveUpRight size={18}/></span></Link>)}</div></section><CTA/></>; }
function MaintenancePackagesContent() {
  return <>
    <section className="section maintenance-overview">
      <div className="wrap">
        <Breadcrumbs items={[{label:'Services',href:'/services'},{label:'Maintenance packages'}]}/>
        <div className="maintenance-hero-grid">
          <div className="maintenance-hero-copy">
            <p className="eyebrow">Preventative maintenance</p>
            <h2>Planned checks for entrances used every day.</h2>
            <p>Communal doors see frequent use. Scheduled inspections and minor adjustments can help keep them operating reliably and support day-to-day access for residents and visitors.</p>
            <p>The right maintenance plan depends on the door, operator, how the entrance is used and the requirements that apply to the installation.</p>
            <Link className="button" href="/contact?purpose=maintenance" data-testid="link-maintenance-enquire">Discuss a maintenance plan <ArrowRight size={15}/></Link>
          </div>
          <figure className="maintenance-photo">
            <img src="/media/maintenance-van.jpg" alt="Bamford technical support vehicle outside a residential entrance" width="614" height="524"/>
            <figcaption>Technical support / Maintenance</figcaption>
          </figure>
        </div>
      </div>
    </section>

    <section className="section section-muted" aria-labelledby="maintenance-visits-title">
      <div className="wrap">
        <div className="section-head">
          <div><p className="eyebrow">Planned visit schedule</p><h2 id="maintenance-visits-title">Set a schedule for your doors.</h2></div>
          <p>A typical schedule includes one annual visit for manual doors and two for automatic doors. Confirm the appropriate frequency for your installed system and current requirements.</p>
        </div>
        <div className="maintenance-frequency-grid">
          <article className="maintenance-frequency-card">
            <p className="maintenance-card-index">01 / MANUAL DOORS</p>
            <h3>One scheduled visit per year.</h3>
            <p>A planned inspection and minor adjustments for manual communal entrances, subject to the agreed service scope.</p>
          </article>
          <article className="maintenance-frequency-card">
            <p className="maintenance-card-index">02 / AUTOMATIC DOORS</p>
            <h3>Two scheduled visits per year.</h3>
            <p>Automatic doors may have additional safety and servicing requirements. Confirm the current interval for the operator and its use.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="section" aria-labelledby="maintenance-includes-title">
      <div className="wrap maintenance-inclusions-grid">
        <div>
          <p className="eyebrow">What is included</p>
          <h2 id="maintenance-includes-title">A planned check of the entrance.</h2>
          <p className="maintenance-section-lead">The agreed preventative maintenance visit focuses on inspection and minor adjustments. Confirm any repair work, replacement parts or additional services separately.</p>
        </div>
        <div>
          <ul className="info-list maintenance-includes-list">
            <li>Inspection in line with the agreed preventative maintenance procedures</li>
            <li>Labour for the scheduled inspection</li>
            <li>Minor adjustments identified during the visit</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="section section-muted" aria-label="Maintenance terms and requirements">
      <div className="wrap">
        <div className="maintenance-advice-grid">
          <article className="maintenance-advice-card">
            <p className="eyebrow">Automatic door safety</p>
            <h3>Confirm current requirements.</h3>
            <p>Automatic doors may be subject to applicable safety standards, including BS EN 16005, and machinery-safety requirements. Ask us to confirm the current edition and maintenance interval for your installed system.</p>
          </article>
          <article className="maintenance-advice-card">
            <p className="eyebrow">Warranty terms</p>
            <h3>Check what applies to your door.</h3>
            <p>Ask whether a maintenance agreement can extend any applicable warranty. Eligibility, duration and coverage depend on the product and written agreement.</p>
          </article>
          <article className="maintenance-advice-card maintenance-advice-card--dark">
            <p className="eyebrow">Package exclusions</p>
            <h3>Know what is outside the scope.</h3>
            <p>Damage from vandalism, malicious damage, fire, theft or other perils is not included. Cosmetic damage is also excluded. Check the current agreement for full terms and any chargeable remedial work.</p>
          </article>
        </div>
      </div>
    </section>

    <section className="maintenance-cta" aria-labelledby="maintenance-cta-title">
      <div className="wrap maintenance-cta-inner">
        <div>
          <p className="eyebrow">Talk through your requirements</p>
          <h2 id="maintenance-cta-title">Plan maintenance around your building.</h2>
          <p>Tell us about the entrance, door type and how it is used. We can discuss the visit schedule and service scope to consider.</p>
        </div>
        <Link className="button" href="/contact?purpose=maintenance">Discuss maintenance <ArrowRight size={15}/></Link>
      </div>
    </section>
  </>;
}
function ServiceDetail({service}:{service:Service}) {
  if(service.slug==='project-management') return <ProjectManagementPage/>;
  if(service.slug==='resident-involvement') return <ResidentInvolvementPage/>;
  if(service.slug==='stock-condition-surveys') return <StockConditionSurveysPage/>;
  if(service.slug==='warranties') return <WarrantiesPage/>;
  if(service.slug==='maintenance-packages') return <><PageHeading eyebrow="Services" title={service.title} lead={service.summary}/><MaintenancePackagesContent/></>;
  return <><PageHeading eyebrow="Services" title={service.title} lead={service.summary}/><section className="section"><div className="wrap detail-layout"><div><Breadcrumbs items={[{label:'Services',href:'/services'},{label:service.title}]}/><h2 style={{fontSize:36}}>Let’s understand the requirement.</h2><p style={{color:'#555'}}>{service.summary}</p><h3 style={{marginTop:34}}>How to get started</h3><ul className="info-list">{service.howItWorks.map(x=><li key={x}>{x}</li>)}</ul><Link className="button" href={`/contact?purpose=${service.slug.includes('survey')?'stock-survey':service.slug==='maintenance-packages'?'maintenance':'consultation'}`}>Discuss this service <ArrowRight size={15}/></Link></div><div className="contact-aside"><p className="eyebrow">Next step</p><h3>Tell us about your building.</h3><p>Our team can discuss your requirements and the information needed to help move the enquiry forward.</p></div></div></section></>;
}
function SectorDetail({sector}:{sector:Sector}) {
  const related=products.filter(p=>sector.relatedProducts.includes(p.slug));
  return <><PageHeading eyebrow="Sectors" title={sector.title} lead={sector.summary}/><section className="section"><div className="wrap split"><div><Breadcrumbs items={[{label:'Sectors',href:'/sectors'},{label:sector.title}]}/><h2 style={{fontSize:36}}>Start with the building.</h2><p style={{color:'#555'}}>{sector.summary} The right entrance solution depends on the building and project requirements.</p><h3 style={{fontSize:18,marginTop:30}}>Points to discuss</h3><ul className="info-list">{sector.considerations.map(x=><li key={x}>{x}</li>)}</ul><Link className="button" href={`/contact?purpose=consultation`}>Discuss your project <ArrowRight size={15}/></Link></div><div><p className="eyebrow">Product options</p><h3>Explore related products</h3><ul className="info-list">{related.map(p=><li key={p.slug}><Link href={productPath(p)} className="text-link">{p.title} <ArrowRight size={13}/></Link></li>)}</ul></div></div></section></>;
}

function ContactPage() {
  const mutation=useCreateInquiry();
  const [location]=useLocation();
  const [values,setValues]=useState({name:'',email:'',phone:'',organization:'',enquiryType:'general',productInterest:'',projectLocation:'',projectSize:'',timescale:'',message:''});
  // Query-specific defaults are applied after hydration: every query URL shares
  // the same generated contact HTML.
  useEffect(()=>{
    const params=new URLSearchParams(window.location.search);
    const purpose=params.get('purpose')||'general';
    const enquiryType=['general','product','maintenance','stock-survey','callback','consultation'].includes(purpose)?purpose:'general';
    const project=params.get('project')||'';
    setValues(v=>({...v,enquiryType,productInterest:params.get('product')||'',message:project?`I’d like to discuss a project similar to "${project}".`:v.message}));
  },[]);
  const [errors,setErrors]=useState<Record<string,string>>({});
  const update=(key:string,value:string)=>setValues(v=>({...v,[key]:value}));
  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); const next:Record<string,string>={};
    if(!values.name.trim())next.name='Please enter your name.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))next.email='Please enter a valid email address.';
    if(!values.message.trim())next.message='Please tell us a little about your enquiry.';
    setErrors(next); if(Object.keys(next).length)return;
    mutation.mutate({data:{...values,enquiryType:values.enquiryType as 'general'|'product'|'maintenance'|'stock-survey'|'callback'|'consultation',sourcePage:normalizePath(location)}});
  };
  return <><PageHeading eyebrow="Contact" title="Talk to our team" lead="Tell us about your building, product interest or project. We’ll record your enquiry and provide an on-screen receipt when it is submitted."/><section className="wrap contact-grid"><aside className="contact-aside"><p className="eyebrow">Start a conversation</p><h3>What are you looking to discuss?</h3><p>Share the details you have. You can include information about the building, location and timing, but only fields marked required need to be completed.</p><p>For a product-specific question, choose “Product enquiry” and tell us which system you have in mind.</p></aside><div>{mutation.isSuccess?<div className="success-box" role="status" data-testid="status-enquiry-success"><p className="eyebrow">Enquiry recorded</p><h3>Thank you, {values.name}.</h3><p>{mutation.data.message}</p><p>Receipt reference: <strong>{mutation.data.id}</strong></p><button type="button" className="button button-outline" onClick={()=>{mutation.reset();setValues(v=>({...v,name:'',email:'',phone:'',organization:'',message:''}));}} data-testid="button-new-enquiry">Send another enquiry</button></div>:<form onSubmit={submit} noValidate><div className="form-grid">
      <div className="field"><label htmlFor="name">Name <span aria-hidden="true">*</span></label><input id="name" value={values.name} onChange={e=>update('name',e.target.value)} autoComplete="name" aria-invalid={!!errors.name} data-testid="input-name"/>{errors.name&&<span className="form-error">{errors.name}</span>}</div>
      <div className="field"><label htmlFor="email">Email <span aria-hidden="true">*</span></label><input id="email" type="email" value={values.email} onChange={e=>update('email',e.target.value)} autoComplete="email" aria-invalid={!!errors.email} data-testid="input-email"/>{errors.email&&<span className="form-error">{errors.email}</span>}</div>
      <div className="field"><label htmlFor="phone">Phone</label><input id="phone" value={values.phone} onChange={e=>update('phone',e.target.value)} autoComplete="tel" data-testid="input-phone"/></div>
      <div className="field"><label htmlFor="organization">Organisation</label><input id="organization" value={values.organization} onChange={e=>update('organization',e.target.value)} autoComplete="organization" data-testid="input-organization"/></div>
      <div className="field"><label htmlFor="enquiryType">Enquiry purpose</label><select id="enquiryType" value={values.enquiryType} onChange={e=>update('enquiryType',e.target.value)} data-testid="select-enquiry-type"><option value="general">General enquiry</option><option value="product">Product enquiry</option><option value="maintenance">Maintenance</option><option value="stock-survey">Stock survey</option><option value="callback">Request a callback</option><option value="consultation">Consultation</option></select></div>
      <div className="field"><label htmlFor="productInterest">Product or service interest</label><input id="productInterest" value={values.productInterest} onChange={e=>update('productInterest',e.target.value)} data-testid="input-product-interest"/></div>
      <div className="field"><label htmlFor="projectLocation">Project location</label><input id="projectLocation" value={values.projectLocation} onChange={e=>update('projectLocation',e.target.value)} data-testid="input-project-location"/></div>
      <div className="field"><label htmlFor="projectSize">Project size</label><input id="projectSize" value={values.projectSize} onChange={e=>update('projectSize',e.target.value)} data-testid="input-project-size"/></div>
      <div className="field full"><label htmlFor="timescale">Timescale</label><input id="timescale" value={values.timescale} onChange={e=>update('timescale',e.target.value)} data-testid="input-timescale"/></div>
      <div className="field full"><label htmlFor="message">How can we help? <span aria-hidden="true">*</span></label><textarea id="message" value={values.message} onChange={e=>update('message',e.target.value)} aria-invalid={!!errors.message} data-testid="input-message"/>{errors.message&&<span className="form-error">{errors.message}</span>}</div>
      {mutation.isError&&<div className="field full"><p className="form-error" role="alert" data-testid="status-enquiry-error">We couldn’t record your enquiry just now. Please check your details and try again.</p></div>}
      <div className="field full"><button type="submit" disabled={mutation.isPending} className="button" data-testid="button-submit-enquiry">{mutation.isPending?'Recording enquiry…':'Submit enquiry'} <ArrowRight size={15}/></button><small style={{color:'#666',fontSize:11}}>Submitting records your enquiry and displays a receipt. It does not confirm that an email has been sent.</small></div>
    </div></form>}</div></section></>;
}

function CaseStudies() {
  return <><PageHeading eyebrow="Case studies" title="Project experience" lead="Every building has its own entrance requirements. Tell us about yours and ask the team about relevant project experience."/><section className="service-spotlight"><div className="service-visual"><img src="/media/grp.webp" alt="Bamford entrance door at a shared residential building" /><span>ENTRANCE SYSTEMS</span></div><div className="service-copy"><p className="eyebrow">Your building. Your brief.</p><h2>Looking for a project like yours?</h2><p>Share the building type, entrance and work you are considering. The Bamford team can discuss relevant experience and the information needed for your project.</p><Link className="button" href="/contact?purpose=consultation">Discuss your project <ArrowRight size={15}/></Link></div></section></>;
}

function FAQPage() {
  const questions=[
    {q:'Which security door is right for my building?',a:'The answer depends on the entrance, how it is used and the project requirements. Share those details with the Bamford team to discuss the product options.'},
    {q:'What should I include in an enquiry?',a:'Include the building type, location, product or service of interest, and any project size or timing details you have. You can still get in touch if some details are not yet known.'},
    {q:'Which types of buildings does Bamford work with?',a:'Bamford serves local authorities, housing associations, schools and other public and commercial buildings.'},
    {q:'Can I ask about a stock condition survey?',a:'Yes. Share the buildings, locations and survey requirements you have in mind so the team can discuss the enquiry.'},
    {q:'Can I ask about maintenance for an existing entrance?',a:'Yes. Describe the entrance system and the maintenance support you are looking for. The team can discuss the information needed.'},
    {q:'Can door entry and access control be discussed with a door project?',a:'Yes. Include the access requirements and any existing door entry system details in your enquiry.'},
  ];
  return <><PageHeading eyebrow="FAQs" title="Questions about your entrance" lead="Start with the building and the work you are considering. These answers cover the information that helps begin a conversation."/><section className="section"><div className="wrap faq-list">{questions.map(({q,a})=><details key={q}><summary>{q}</summary><p>{a}</p></details>)}<div style={{marginTop:32}}><Link href="/contact" className="button">Ask the team <ArrowRight size={15}/></Link></div></div></section></>;
}
function AboutDetail({page,path}:{page:{title:string;lead:string;body:string[]};path:string}) {
  return <><PageHeading eyebrow="About Bamford" title={page.title} lead={page.lead}/><section className="section"><div className="wrap split"><div><Breadcrumbs items={[{label:'About',href:'/about'},{label:page.title}]}/><h2 style={{fontSize:36}}>Straightforward information.</h2></div><div>{page.body.map((line,i)=><p key={i} style={{color:'#555'}}>{line}</p>)}<p className="eyebrow" style={{marginTop:30}}>More about Bamford</p><div className="tile-grid" style={{gridTemplateColumns:'1fr 1fr'}}>{Object.entries(companyPages).filter(([p])=>p!==path).map(([href,data])=><Link key={href} href={href} className="tile" style={{minHeight:120,padding:20}}><strong>{data.title}</strong><span className="arrow"><MoveUpRight size={16}/></span></Link>)}</div></div></div></section><CTA/></>;
}
function LegacyArticleDetail({title}:{title:string}) { return <><PageHeading eyebrow="News & insights" title={title} lead="Information for teams planning, maintaining or improving a shared entrance."/><section className="section"><div className="wrap"><p>For current information about products, services or a project requirement, explore the relevant pages or contact the Bamford team.</p><div className="hero-actions"><Link href="/products" className="button button-outline">Explore products</Link><Link href="/contact" className="button">Ask the team <ArrowRight size={15}/></Link></div></div></section></>; }

function imageUrl(url:string, width:number) {
  const image = new URL(url);
  image.searchParams.set('w', String(width));
  image.searchParams.set('auto', 'format');
  image.searchParams.set('fit', 'max');
  return image.toString();
}

function imageSrcSet(url:string, widths:number[], maxWidth?:number) {
  const candidates = widths.filter((width) => !maxWidth || width <= maxWidth);
  if (maxWidth && !candidates.includes(maxWidth)) candidates.push(maxWidth);
  return candidates.sort((a,b) => a-b).map((width) => `${imageUrl(url, width)} ${width}w`).join(', ');
}

function LegacyInfo({title}:{title:string}) {
  return <><PageHeading eyebrow="Bamford Doors" title={title} lead="Talk to the Bamford team about your building, entrance or project requirements."/><section className="section"><div className="wrap split"><div><p className="eyebrow">Next step</p><h2 style={{fontSize:36}}>Start with your building.</h2></div><div><p style={{color:'#555'}}>Share the product, service or project information you have, and the team can discuss the requirements relevant to your enquiry.</p><Link href="/contact?purpose=consultation" className="button">Discuss your requirements <ArrowRight size={15}/></Link></div></div></section></>;
}
function NotFound() { return <section className="notfound"><div className="wrap"><p className="eyebrow">404 · Page not found</p><h1 style={{fontSize:58}}>Page not found.</h1><p>We couldn’t find the page you were looking for.</p><Link href="/" className="button">Return home <ArrowRight size={15}/></Link></div></section>; }

function RouteContent() {
  const [location]=useLocation();
  const path=normalizePath(location);
  if(path==='/') return <Home/>;
  if(path==='/products') return <ProductIndex/>;
  if(path==='/services') return <ServiceIndex/>;
  if(path==='/sectors') return <SectorsOverviewPage sectors={sectors}/>;
  if(path==='/case-studies') return <Suspense fallback={<PageHeading eyebrow="Case studies" title="Loading projects…"/>}><CaseStudiesIndexPage/></Suspense>;
  if(path==='/news-insights') return <Suspense fallback={<PageHeading eyebrow="News & insights" title="Loading stories…"/>}><NewsInsightsPage/></Suspense>;
  if(path==='/faq') return <FAQPage/>;
  if(path==='/contact'||path==='/contact-us') return <ContactPage/>;
  if(path==='/about'||path==='/about-5') return <AboutOverviewPage pages={aboutOverviewLinks}/>;
  const companyPath=legacyCompanyRoutes[path]||path;
  if(companyPath==='/about/meet-the-team') return <MeetTheTeamPage/>;
  if(companyPath==='/about/sustainability') return <SustainabilityPage/>;
  if(companyPath==='/about/corporate-social-responsibility') return <CorporateSocialResponsibilityPage/>;
  if(companyPath==='/about/history') return <OurHistoryPage/>;
  if(companyPath==='/about/accreditations') return <AccreditationsPage/>;
  if(companyPath==='/about/factory') return <FactoryPage/>;
  if(companyPath==='/about/aluminium-versus-steel') return <AluminiumVsSteelPage/>;
  if(companyPath==='/about/conservation-areas') return <ConservationAreasPage/>;
  if(companyPath==='/about/coastal-applications') return <CoastalApplicationsPage/>;
  if(companyPages[companyPath]) return <AboutDetail path={companyPath} page={companyPages[companyPath]}/>;
  if(path==='/blog'||path==='/blog-2-2'||path==='/more-news') return <Suspense fallback={<PageHeading eyebrow="News & insights" title="Loading stories…"/>}><NewsInsightsPage/></Suspense>;
  if(path==='/downloads') return <LegacyInfo title="Downloads and technical information"/>;
  const alias=legacyAliases[path];
  const product=products.find(p=>path===productPath(p)||path===p.legacyPath.replace(/\/$/,'')||path===alias);
  if(product?.slug==='aluminium-modular-doors') return <AluminiumModularDoorsPage/>;
  if(product?.slug==='thermally-broken-doors') return <ThermallyBrokenDoorsPage/>;
  if(product?.slug==='wood-effect-door') return <WoodEffectDoorsPage/>;
  if(product?.slug==='hmo') return <HmoEntranceDoorsPage/>;
  if(product?.slug==='grp-doors') return <GrpDoorsPage/>;
  if(product?.slug==='automatic-operators') return <AutomaticOperatorsPage/>;
  if(product) return <ProductDetail product={product}/>;
  const service=services.find(s=>path===servicePath(s)||path===s.legacyPath.replace(/\/$/,''));
  if(service) return <ServiceDetail service={service}/>;
  const sector=sectors.find(s=>path===sectorPath(s));
  if(sector) return <SectorDetail sector={sector}/>;
  if(path==='/door-entry-access-control') return <LegacyInfo title="Door entry and access control"/>;
  const article=path.match(/^\/news-insights\/(.+)$/);
  if(article) return <Suspense fallback={<PageHeading eyebrow="News & insights" title="Loading story…"/>}><NewsInsightsPage slug={article[1]}/></Suspense>;
  const caseDetail=path.match(/^\/case-studies\/(.+)$/);
  if(caseDetail) return <Suspense fallback={<DetailSkeleton/>}><CaseStudyDetailPage key={caseDetail[1]} slug={caseDetail[1]}/></Suspense>;
  return <Suspense fallback={<div className="wrap" role="status" aria-live="polite">Loading page…</div>}><LegacyRouteFallback path={path}/></Suspense>;
}

export function getPageSeo(path:string): PageSeo {
  const product=products.find(p=>path===productPath(p)||path===p.legacyPath.replace(/\/$/,''));
  const service=services.find(s=>path===servicePath(s)||path===s.legacyPath.replace(/\/$/,''));
  const sector=sectors.find(s=>path===sectorPath(s));
  const companyPath=legacyCompanyRoutes[path]||path;
  const company=companyPages[companyPath];
  if(path==='/admin'||path.startsWith('/admin/')) return {title:'Content editor',description:'Private content management area.',path,noindex:true};
  if(path==='/') return {title:'Quality Bespoke Security Doors',description:'Bamford Doors designs, manufactures and installs bespoke security doors and screens for housing providers, councils, schools and public buildings.',path:'/'};
  if(path==='/products') return {title:'Security Door Products',description:'Explore Bamford Doors’ custom-made security door and entrance system options for housing, public and commercial buildings.',path};
  if(path==='/services') return {title:'Door Project and Maintenance Services',description:'Discuss project management, maintenance, stock condition surveys and entrance-system services with Bamford Doors.',path};
  if(path==='/sectors') return {title:'Sectors We Serve',description:'Explore door and entrance system information for housing, local authorities, education, healthcare and public buildings.',path};
  if(path==='/contact'||path==='/contact-us') return {title:'Contact Bamford Doors',description:'Contact Bamford Doors about a security door, entrance system, project, maintenance requirement or stock condition survey.',path:'/contact',noindex:path==='/contact-us'};
  if(path==='/case-studies') return {...CASE_STUDIES_SEO,noindex:true};
  if(path==='/news-insights'||path==='/blog'||path==='/blog-2-2'||path==='/more-news') return {title:'News and Insights for Building Teams',description:'Practical starting points for teams planning, maintaining or improving a shared entrance.',path:'/news-insights',noindex:path!=='/news-insights'};
  if(path==='/faq') return {title:'Security Door and Entrance FAQs',description:'Practical answers about security door enquiries, product options and services from Bamford Doors.',path};
  if(product) return {title:product.title,description:product.summary,path:productPath(product),image:product.image||undefined,noindex:path!==productPath(product)};
  if(service) return {title:service.title,description:service.summary,path:servicePath(service),noindex:path!==servicePath(service)};
  if(sector) return {title:`Security Doors for ${sector.title}`,description:sector.summary,path:sectorPath(sector)};
  if(company) return {title:company.title,description:company.lead,path:companyPath,noindex:companyPath!==path||companyPath==='/about/unique-environments'};
  if(path.startsWith('/case-studies/')) return {title:'Project Experience',description:'Discuss building-specific entrance requirements and relevant project experience with Bamford Doors.',path,noindex:true};
  if(path.startsWith('/news-insights/')) return {title:path.split('/').pop()!.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' '),description:'Practical information for teams planning, maintaining or improving shared entrances.',path,noindex:true};
  return {title:'Bamford Doors',description:'Bamford Doors designs and manufactures custom-made security doors and entrance systems for shared buildings.',path,noindex:true};
}

export function getSeoRoutes(): Array<PageSeo & { requestPath: string }> {
  const canonicalPaths = [
    '/',
    '/products',
    ...products.map(productPath),
    '/services',
    ...services.map(servicePath),
    '/sectors',
    ...sectors.map(sectorPath),
    ...Object.keys(companyPages),
    '/news-insights',
    '/faq',
    '/contact',
    '/case-studies',
    '/admin',
    '/downloads',
    '/contact-us',
    '/blog',
    '/blog-2-2',
    '/more-news',
    ...products.map(product=>product.legacyPath.replace(/\/$/,'')),
    ...services.map(service=>service.legacyPath.replace(/\/$/,'')),
    ...Object.keys(legacyCompanyRoutes),
    ...Object.keys(legacyAliases),
  ];
  const normalizedPaths = canonicalPaths.map((routePath) => routePath.replace(/\/+$/, '') || '/');
  return [...new Set(normalizedPaths)].map((requestPath) => ({
    ...getPageSeo(requestPath),
    requestPath,
  }));
}

function Router() {
  const [location]=useLocation();
  const path=normalizePath(location);
  useEffect(()=>{
    const page=getPageSeo(path);
    applyPageSeo(page);
  },[path]);
  if(path==='/admin'||path.startsWith('/admin/')) return <ErrorBoundary resetKey={location}><Suspense fallback={<div className="studio-loading">Loading content editor…</div>}><StudioPage/></Suspense></ErrorBoundary>;
  if(path==='/') return <ErrorBoundary resetKey={location}><ReferenceLedHome/></ErrorBoundary>;
  return <ErrorBoundary resetKey={location}><div className="site-shell"><Header/><Switch><Route component={RouteContent}/></Switch><Footer/></div></ErrorBoundary>;
}
function App({ssrPath}:{ssrPath?:string}={}) {
  return <QueryClientProvider client={queryClient}><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')} ssrPath={ssrPath}><Router/></WouterRouter></QueryClientProvider>;
}
export default App;
