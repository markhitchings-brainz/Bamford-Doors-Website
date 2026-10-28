import { useEffect, useState, type FormEvent } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useCreateInquiry } from '@workspace/api-client-react';
import { Menu, X, ArrowRight, ChevronRight, MoveUpRight } from 'lucide-react';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { applyPageSeo } from '@/lib/seo';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import migrationInventory from '../content/migration-inventory.csv?raw';

type Product = { slug:string; title:string; summary:string; applications:string[]; features:string[]; image:string|null; legacyPath:string };
type Service = { slug:string; title:string; summary:string; howItWorks:string[]; legacyPath:string };
type Sector = { slug:string; title:string; summary:string; considerations:string[]; relatedProducts:string[] };

const products: Product[] = [
  {slug:'aluminium-modular-doors',title:'Aluminium modular doors',summary:'Custom-made aluminium entrance doors and screens for shared and public buildings.',applications:['Communal entrances','Public and commercial buildings'],features:['Designed and manufactured to suit the entrance','Door and screen systems'],image:'/media/aluminium.webp',legacyPath:'/aluminium-modular-doors/'},
  {slug:'thermally-broken-doors',title:'Thermally broken doors',summary:'A thermally broken entrance door option for buildings where this product type is required.',applications:['Communal entrances','Public and commercial buildings'],features:['Custom-made entrance systems','Available as a door and screen arrangement'],image:'/media/thermal.webp',legacyPath:'/thermally-broken-doors/'},
  {slug:'wood-effect-door',title:'Wood effect doors',summary:'A wood-effect finish option for a custom-made entrance door.',applications:['Communal entrances','Housing provider buildings'],features:['Wood-effect appearance','Made to suit the entrance'],image:'/media/wood-effect.webp',legacyPath:'/wood-effect-door/'},
  {slug:'hmo',title:'HMO entrance doors',summary:'Custom-made entrance doors for houses in multiple occupation.',applications:['Houses in multiple occupation','Shared residential entrances'],features:['Designed for the entrance','Can be discussed with our team'],image:'/media/hmo.webp',legacyPath:'/hmo/'},
  {slug:'grp-doors',title:'Glass reinforced plastic (GRP) doors',summary:'A GRP door option within Bamford’s range of custom-made entrance systems.',applications:['Communal entrances','Public and commercial buildings'],features:['Custom-made door option','Discuss suitability with our team'],image:'/media/grp.webp',legacyPath:'/glass-reinforced-plastic-grp-doors/'},
  {slug:'automatic-operators',title:'Automatic operators',summary:'Automatic operators for entrance doors. Please contact the team to discuss the requirements of your building.',applications:['Building entrances','Shared access points'],features:['Operator options for entrance doors','Project requirements discussed with our team'],image:'/media/automatic.webp',legacyPath:'/automatic-operators/'},
  {slug:'mailboxes',title:'Mailboxes',summary:'Mailbox options for shared residential entrances.',applications:['Communal entrances','Housing provider buildings'],features:['Mailbox options','Discuss layout and requirements with our team'],image:'/media/mailboxes.webp',legacyPath:'/mailboxes/'},
  {slug:'block-address-signs',title:'Block and address signs',summary:'Entrance signage options for residential blocks and addresses.',applications:['Residential blocks','Building entrances'],features:['Block and address signage','Discuss details with our team'],image:'/media/signage.webp',legacyPath:'/block-address-signs/'},
  {slug:'screens-and-curtain-walling',title:'Screens and curtain walling',summary:'Custom-made security screens for building entrances and public-facing environments.',applications:['Building entrances','Public and commercial buildings'],features:['Made to suit the entrance','Discuss the project with our team'],image:'/media/aluminium.webp',legacyPath:'/screens-and-curtain-walling/'},
  {slug:'door-entry-control-systems',title:'Door entry and control systems',summary:'Door entry and access control options for communal and public building entrances.',applications:['Communal entrances','Public buildings'],features:['System requirements discussed in the context of the building','Contact the team to discuss available options'],image:null,legacyPath:'/door-entry-access-control-systems/'},
  {slug:'louvered-doors',title:'Louvered doors',summary:'A louvered door option within the security door range. Suitability depends on the building and project requirements.',applications:['Building service areas','Project-specific applications'],features:['Discuss the application and specification with the team'],image:null,legacyPath:'/louvered-doors/'},
  {slug:'secondary-security-doors',title:'Secondary security doors',summary:'Secondary security door options for project-specific building requirements.',applications:['Project-specific building applications'],features:['Discuss the existing entrance and requirements with the team'],image:null,legacyPath:'/secondary-security-doors/'},
];

const services: Service[] = [
  {slug:'project-management',title:'Project management',summary:'A coordinated point of contact for door and entrance system projects.',howItWorks:['Tell us about the building and the work being considered.','Our team can discuss the project scope and next steps with you.'],legacyPath:'/project-management/'},
  {slug:'maintenance-packages',title:'Maintenance packages',summary:'Discuss maintenance requirements for entrance doors and systems with the Bamford team.',howItWorks:['Share the type of entrance system and your requirements.','The team will discuss an appropriate next step.'],legacyPath:'/maintenance-packages/'},
  {slug:'stock-condition-surveys',title:'Stock condition surveys',summary:'A service to discuss the condition of door and entrance assets across a building or portfolio.',howItWorks:['Tell us about your buildings and survey requirements.','We will discuss scope and information needed.'],legacyPath:'/stock-condition-surveys/'},
  {slug:'warranties',title:'Warranties',summary:'For information about warranty terms for a specific project or product, contact our team.',howItWorks:['Provide the project or product details you have.','Our team can confirm the relevant information.'],legacyPath:'/warranties/'},
  {slug:'frameworks',title:'Frameworks',summary:'Speak to the team about framework-related enquiries and requirements.',howItWorks:['Share the framework or procurement context.','Our team will direct your enquiry to the right person.'],legacyPath:'/frameworks/'},
  {slug:'resident-involvement',title:'Resident involvement',summary:'Resident involvement can form part of conversations about entrance improvements.',howItWorks:['Tell us about your project and how residents are involved.','We can discuss the information and engagement needed.'],legacyPath:'/resident-involvement/'},
  {slug:'door-entry-access-control',title:'Door entry and access control',summary:'Door entry and access control requirements for communal and public building entrances.',howItWorks:['Share the building and access requirements you are considering.','Our team can discuss the information needed to explore a suitable system.'],legacyPath:'/door-entry-access-control/'},
];

const sectors: Sector[] = [
  {slug:'local-authorities',title:'Local authorities',summary:'Bamford serves local authorities nationally with custom-made, vandal-resistant security doors and screens.',considerations:['Building use and entrance context','The requirements of the local authority','The product and project scope'],relatedProducts:['aluminium-modular-doors','thermally-broken-doors','screens-and-curtain-walling']},
  {slug:'housing-associations',title:'Housing associations',summary:'Entrance systems for housing providers, including housing associations serving communities nationally.',considerations:['Shared residential entrances','Building and resident context','Maintenance and project requirements'],relatedProducts:['aluminium-modular-doors','wood-effect-door','hmo','mailboxes']},
  {slug:'schools',title:'Schools',summary:'Bamford serves schools with custom-made security doors and screens.',considerations:['The school building and entrance','How the entrance is used','The project requirements'],relatedProducts:['aluminium-modular-doors','screens-and-curtain-walling','automatic-operators']},
  {slug:'public-commercial-buildings',title:'Public and commercial buildings',summary:'Bamford serves public-sector and other public and commercial buildings nationally.',considerations:['The building and entrance context','The intended use','The required product scope'],relatedProducts:['aluminium-modular-doors','grp-doors','screens-and-curtain-walling']},
  {slug:'social-housing',title:'Social housing',summary:'Bamford designs, manufactures and installs custom-made security doors and screens for housing providers.',considerations:['Shared entrances and resident use','The existing entrance and its condition','The organisation’s project and maintenance requirements'],relatedProducts:['aluminium-modular-doors','wood-effect-door','hmo','mailboxes']},
  {slug:'apartment-blocks',title:'Apartment blocks',summary:'Custom-made door and entrance system options for shared residential buildings.',considerations:['How residents and visitors use the entrance','The building layout and existing system','Project scope and access requirements'],relatedProducts:['aluminium-modular-doors','thermally-broken-doors','door-entry-control-systems']},
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
  '/about/history':{title:'Our history',lead:'Learn about the company behind Bamford Doors.',body:['For information about Bamford’s company history, contact the team.']},
  '/about/factory':{title:'Our factory',lead:'Bamford designs and manufactures custom-made door and entrance systems.',body:['Tell us about your building and project requirements so the team can discuss the manufacturing and entrance options relevant to your enquiry.']},
  '/about/sustainability':{title:'Sustainability',lead:'Ask us about current sustainability information relevant to your project or procurement.',body:['Share the policy or project information you need, and the Bamford team can discuss the details available for your enquiry.']},
  '/about/accreditations':{title:'Accreditations',lead:'Ask about the current accreditation or framework requirements relevant to your project.',body:['Share the tender criteria or certification information you need to check with the team.']},
  '/about/meet-the-team':{title:'Meet the team',lead:'Contact Bamford about your building, product or project.',body:['Use the enquiry form to direct your question to the team. Include the product or service you are considering, if known.']},
  '/about/aluminium-versus-steel':{title:'Aluminium versus steel',lead:'Material choice depends on the entrance, specification and project requirements.',body:['Share the building and project requirements with the team to discuss relevant door options.']},
  '/about/corporate-social-responsibility':{title:'Corporate social responsibility',lead:'Ask about social value information relevant to your project or procurement.',body:['Tell the team which project criteria or information you need to discuss.']},
  '/about/unique-environments':{title:'Unique environments',lead:'Some buildings have specific setting and exposure requirements.',body:['Discuss the building, location and relevant planning or environmental requirements with the Bamford team.']},
  '/about/conservation-areas':{title:'Conservation areas',lead:'Doors in conservation areas may need to respond to the character and requirements of the place.',body:['Project-specific planning and conservation requirements should be confirmed with the relevant authority and project team.']},
  '/about/coastal-applications':{title:'Coastal applications',lead:'The project location and exposure should be considered when specifying an entrance.',body:['Discuss the site and project requirements, including any environmental criteria specified for the project, with the team.']},
};
const navItems = [['Products','/products'],['Services','/services'],['Sectors','/sectors'],['Case studies','/case-studies'],['About','/about']] as const;
const productPath=(p:Product)=>`/products/${p.slug}`;
const servicePath=(s:Service)=>`/services/${s.slug}`;
const sectorPath=(s:Sector)=>`/sectors/${s.slug}`;
const pathNow=()=>decodeURI(window.location.pathname).replace(/\/+$/,'')||'/';
const queryClient=new QueryClient();
const legacyEntries = new Map<string,string>(
  migrationInventory
    .split(/\r?\n/)
    .slice(1)
    .filter(Boolean)
    .map((row): [string,string] => {
      const [url,type] = row.split(',',2);
      try {
        return [new URL(url).pathname.replace(/\/+$/,'')||'/', type];
      } catch {
        return ['', ''];
      }
    })
    .filter(([path]) => Boolean(path)),
);

function Header() {
  const [open,setOpen]=useState(false);
  const [location]=useLocation();
  return <><div className="topline"><span>DESIGNED · MANUFACTURED · INSTALLED</span><span>UK-wide service for public and commercial buildings</span></div><header className="header"><div className="header-inner">
    <Link href="/" className="brand" aria-label="Bamford Doors home" data-testid="link-home-logo"><img src="/media/bamford-doors-wordmark.png" alt="Bamford Doors" /></Link>
    <nav className="nav" aria-label="Main navigation">{navItems.map(([label,path])=><Link key={path} href={path} aria-current={location===path?'page':undefined} data-testid={`link-nav-${label.toLowerCase().replaceAll(' ','-')}`}>{label}</Link>)}</nav>
    <Link className="nav-cta" href="/contact?purpose=consultation" data-testid="link-contact-header">Start an enquiry <ArrowRight size={15}/></Link>
    <button className="menu-button" aria-label={open?'Close menu':'Open menu'} aria-expanded={open} onClick={()=>setOpen(!open)} data-testid="button-mobile-menu">{open?<X/>:<Menu/>}</button>
  </div>{open&&<nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label,path])=><Link key={path} href={path} onClick={()=>setOpen(false)} data-testid={`link-mobile-${label.toLowerCase().replaceAll(' ','-')}`}>{label}</Link>)}<Link className="nav-cta" href="/contact?purpose=consultation" onClick={()=>setOpen(false)} data-testid="link-mobile-contact">Request a Consultation <ArrowRight size={15}/></Link></nav>}</header></>;
}

function Footer() {
  return <footer className="footer"><div className="wrap"><div className="footer-grid"><div><img className="footer-logo" src="/media/bamford-doors-wordmark.png" alt="Bamford Doors" /><p>Custom-made security doors and screens for public and commercial buildings.</p></div><div><h3>Explore</h3>{navItems.slice(0,4).map(([label,path])=><Link key={path} href={path}>{label}</Link>)}<Link href="/news-insights">News &amp; insights</Link></div><div><h3>About</h3><Link href="/about">About Bamford</Link><Link href="/faq">Frequently asked questions</Link><Link href="/downloads">Documents and downloads</Link></div><div><h3>Start a conversation</h3><p>Tell us what your building needs.</p><Link href="/contact">Contact Bamford <ArrowRight size={13}/></Link></div></div><div className="footer-bottom"><span>© Bamford Doors</span><span>Door and entrance systems for buildings across the UK</span></div></div></footer>;
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
            <section className="text-[15px]"><div className="wrap hero-grid"><div className="hero-copy"><p className="eyebrow">Bamford Doors <span className="eyebrow-divider">/</span> Made for the entrance</p><h1>Quality Bespoke Security Doors for Social Housing Providers and Landlords</h1><p className="hero-question">Entrances matter. Make yours fit the building.</p><p>Bamford designs, manufactures and installs custom-made security doors and screens for housing providers, councils and building teams.</p><div className="hero-actions"><Link href="/contact?purpose=consultation" className="button" data-testid="link-request-consultation">Request a Consultation <ArrowRight size={16}/></Link><Link href="/products" className="button button-outline" data-testid="link-explore-products">Explore products</Link></div><span className="hero-note">For shared entrances and public buildings</span></div><div className="hero-photo"><img src="/media/grp.webp" alt="Bamford security entrance door at a shared residential building" /><span className="hero-photo-index">01 <i/> ENTRANCE SYSTEMS</span></div></div></section>
            <section className="font-semibold text-[15px]"><div className="wrap audience-inner"><span>Built around the needs of</span><Link href="/sectors/social-housing">Social housing</Link><Link href="/sectors/local-authorities">Local authorities</Link><Link href="/sectors/housing-associations">Housing associations</Link><Link href="/sectors/apartment-blocks">Building teams</Link></div></section>
            <section className="section intro-section"><div className="wrap split"><div><p className="eyebrow">An entrance is a working part of the building</p><h2>One entrance.<br/><em>Many considerations.</em></h2></div><div className="intro-copy"><p className="section-lead">Every shared entrance has its own context: the building, the people who use it and the work planned around it.</p><p>Bamford can help you explore door and screen options, alongside services that support your project. Start with the requirement; the team can discuss what comes next.</p><Link className="text-link" href="/contact?purpose=consultation">Talk through your project <ArrowRight size={14}/></Link></div></div></section>
            <section className="section sector-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">Who we work with</p><h2>For buildings serving people.</h2></div><p>Explore information shaped around your building type and the entrance it needs.</p></div><div className="sector-feature-grid">{sectors.filter(s=>['social-housing','local-authorities','housing-associations','apartment-blocks'].includes(s.slug)).map((s,i)=><Link className={`sector-feature sector-feature-${i+1}`} key={s.slug} href={sectorPath(s)} data-testid={`card-sector-${s.slug}`}><span className="sector-number">0{i+1} / SECTOR</span><strong>{s.title}</strong><p>{s.summary}</p><span className="sector-arrow"><MoveUpRight size={18}/></span></Link>)}</div><Link className="text-link sector-all-link" href="/sectors">View all sectors <ArrowRight size={14}/></Link></div></section>
            <section className="section product-section"><div className="wrap"><div className="section-head"><div><p className="eyebrow">Product range</p><h2>Made for the entrance.</h2></div><p>Explore door and entrance system options, then talk with the team about your building and project requirements.</p></div><div className="product-grid">{products.slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div><div className="product-index-link"><span>Door systems, screens and entrance details.</span><Link className="text-link" href="/products">Explore all products <ArrowRight size={14}/></Link></div></div></section>
            <section className="service-spotlight"><div className="service-visual"><img src="/media/wood-effect.webp" alt="Wood-effect entrance door in a residential building" /><span>DETAIL / 02</span></div><div className="service-copy"><p className="eyebrow">More than a product</p><h2>Support for the work around the door.</h2><p>From project management to maintenance discussions and stock condition surveys, explore services for the wider entrance requirement.</p><Link className="button" href="/services">Explore services <ArrowRight size={15}/></Link><div className="service-links">{services.slice(0,3).map((s,i)=><Link key={s.slug} href={servicePath(s)}><span>0{i+1}</span>{s.title}<ArrowRight size={14}/></Link>)}</div></div></section>
            <section className="section process-section"><div className="wrap split"><div><p className="eyebrow">Start with a conversation</p><h2>Bring the building into focus.</h2><p className="process-intro">Share what you know. The team can discuss the building, the entrance and the details needed to explore a suitable next step.</p><Link className="text-link" href="/contact">What to include in an enquiry <ArrowRight size={14}/></Link></div><ol className="process-list">{['Tell us about the building','Discuss the requirement','Agree a way forward'].map((step,index)=><li key={step}><span>0{index+1}</span><strong>{step}</strong></li>)}</ol></div></section>
            <section className="feature-band home-cta"><div className="wrap"><p className="eyebrow">Start here</p><h2>Let’s talk about your entrance.</h2><p>Tell us what you are looking to discuss. Share only the project information you have to hand.</p><div className="hero-actions"><Link className="button" href="/contact?purpose=consultation">Request a Consultation <ArrowRight size={15}/></Link><Link className="button button-outline" href="/contact?purpose=stock-survey">Request a Stock Condition Survey</Link><Link className="text-link" href="/contact?purpose=product">Enquire about a product <ArrowRight size={14}/></Link><Link className="text-link" href="/contact?purpose=callback">Request a callback <ArrowRight size={14}/></Link></div></div></section>
          </main></>
  );
}

function ProductCard({product}:{product:Product}) {
  return <Link className="product-card" href={productPath(product)} data-testid={`card-product-${product.slug}`}>{product.image?<img src={product.image} alt={product.title}/>:<div className="product-image-pending" aria-label={`Approved image not yet supplied for ${product.title}`}><span>Product image to be supplied</span></div>}<div className="product-card-copy"><h3>{product.title}</h3><p>{product.summary}</p><span className="text-link">Explore product <ArrowRight size={13}/></span></div></Link>;
}

function ProductIndex() {
  return <><PageHeading eyebrow="Products" title="Door and entrance systems" lead="Custom-made, vandal-resistant security doors and screens for housing providers, councils, schools and public and commercial buildings."/><section className="section"><div className="wrap"><div className="product-grid">{products.map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section><CTA/></>;
}
function ProductDetail({product}:{product:Product}) {
  return <><PageHeading eyebrow="Products" title={product.title} lead={product.summary}/><div className="wrap"><Breadcrumbs items={[{label:'Products',href:'/products'},{label:product.title}]}/><div className="detail-layout"><div className="detail-image">{product.image?<img src={product.image} alt={product.title}/>:<div className="product-image-pending product-detail-pending"><span>Approved product photography to be supplied</span></div>}</div><div className="detail-text"><p className="eyebrow">Product overview</p><h2 style={{fontSize:34}}>Made to suit the entrance.</h2><p>{product.summary} Discuss your building and requirements with our team.</p><h3 style={{fontSize:18,marginTop:30}}>Where this product may be considered</h3><ul className="info-list">{product.applications.map(x=><li key={x}>{x}</li>)}</ul><h3 style={{fontSize:18,marginTop:22}}>Product information</h3><ul className="info-list">{product.features.map(x=><li key={x}>{x}</li>)}</ul><Link className="button" href={`/contact?purpose=product&product=${encodeURIComponent(product.title)}`} data-testid={`link-enquire-${product.slug}`}>Enquire about this product <ArrowRight size={15}/></Link></div></div></div><section className="section section-muted"><div className="wrap"><p className="eyebrow">More to explore</p><h2 style={{marginBottom:28}}>Related products</h2><div className="product-grid">{products.filter(p=>p.slug!==product.slug).slice(0,4).map(p=><ProductCard key={p.slug} product={p}/>)}</div></div></section></>;
}

function ServiceIndex() { return <><PageHeading eyebrow="Services" title="Support around the entrance" lead="Discuss the wider requirements of your entrance system project with the Bamford team."/><section className="section"><div className="wrap tile-grid">{services.map(s=><Link className="tile" href={servicePath(s)} key={s.slug}><strong>{s.title}</strong><p>{s.summary}</p><span className="arrow"><MoveUpRight size={18}/></span></Link>)}</div></section><CTA/></>; }
function ServiceDetail({service}:{service:Service}) {
  return <><PageHeading eyebrow="Services" title={service.title} lead={service.summary}/><section className="section"><div className="wrap detail-layout"><div><Breadcrumbs items={[{label:'Services',href:'/services'},{label:service.title}]}/><h2 style={{fontSize:36}}>Let’s understand the requirement.</h2><p style={{color:'#555'}}>{service.summary}</p><h3 style={{marginTop:34}}>How to get started</h3><ul className="info-list">{service.howItWorks.map(x=><li key={x}>{x}</li>)}</ul><Link className="button" href={`/contact?purpose=${service.slug.includes('survey')?'stock-survey':service.slug==='maintenance-packages'?'maintenance':'consultation'}`}>Discuss this service <ArrowRight size={15}/></Link></div><div className="contact-aside"><p className="eyebrow">Next step</p><h3>Tell us about your building.</h3><p>Our team can discuss your requirements and the information needed to help move the enquiry forward.</p></div></div></section></>;
}
function SectorIndex() { return <><PageHeading eyebrow="Sectors" title="For buildings with a public purpose" lead="Bamford serves local authorities, housing associations, schools and other public-sector buildings nationally."/><section className="section"><div className="wrap tile-grid">{sectors.map(s=><Link className="tile" href={sectorPath(s)} key={s.slug}><strong>{s.title}</strong><p>{s.summary}</p><span className="arrow"><MoveUpRight size={18}/></span></Link>)}</div></section><CTA/></>; }
function SectorDetail({sector}:{sector:Sector}) {
  const related=products.filter(p=>sector.relatedProducts.includes(p.slug));
  return <><PageHeading eyebrow="Sectors" title={sector.title} lead={sector.summary}/><section className="section"><div className="wrap split"><div><Breadcrumbs items={[{label:'Sectors',href:'/sectors'},{label:sector.title}]}/><h2 style={{fontSize:36}}>Start with the building.</h2><p style={{color:'#555'}}>{sector.summary} The right entrance solution depends on the building and project requirements.</p><h3 style={{fontSize:18,marginTop:30}}>Points to discuss</h3><ul className="info-list">{sector.considerations.map(x=><li key={x}>{x}</li>)}</ul><Link className="button" href={`/contact?purpose=consultation`}>Discuss your project <ArrowRight size={15}/></Link></div><div><p className="eyebrow">Product options</p><h3>Explore related products</h3><ul className="info-list">{related.map(p=><li key={p.slug}><Link href={productPath(p)} className="text-link">{p.title} <ArrowRight size={13}/></Link></li>)}</ul></div></div></section></>;
}

function ContactPage() {
  const mutation=useCreateInquiry();
  const params=new URLSearchParams(window.location.search);
  const purposeValue=params.get('purpose')||'general';
  const initialType=['general','product','maintenance','stock-survey','callback','consultation'].includes(purposeValue)?purposeValue:'general';
  const initialProduct=params.get('product')||'';
  const [values,setValues]=useState({name:'',email:'',phone:'',organization:'',enquiryType:initialType,productInterest:initialProduct,projectLocation:'',projectSize:'',timescale:'',message:''});
  const [errors,setErrors]=useState<Record<string,string>>({});
  const update=(key:string,value:string)=>setValues(v=>({...v,[key]:value}));
  const submit=(e:FormEvent<HTMLFormElement>)=>{
    e.preventDefault(); const next:Record<string,string>={};
    if(!values.name.trim())next.name='Please enter your name.';
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email))next.email='Please enter a valid email address.';
    if(!values.message.trim())next.message='Please tell us a little about your enquiry.';
    setErrors(next); if(Object.keys(next).length)return;
    mutation.mutate({data:{...values,enquiryType:values.enquiryType as 'general'|'product'|'maintenance'|'stock-survey'|'callback'|'consultation',sourcePage:pathNow()}});
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

function NewsPage() {
  return <><PageHeading eyebrow="News & insights" title="Useful starting points" lead="Clear information for teams planning, maintaining or improving a shared entrance."/><section className="section"><div className="wrap"><div className="tile-grid"><Link href="/products" className="tile"><strong>Explore door and entrance systems</strong><p>Compare the product categories and discuss which details matter for your building.</p><span className="arrow"><MoveUpRight size={18}/></span></Link><Link href="/services/stock-condition-surveys" className="tile"><strong>Plan a stock condition enquiry</strong><p>Share the building types, locations and survey requirements you already know.</p><span className="arrow"><MoveUpRight size={18}/></span></Link><Link href="/contact?purpose=consultation" className="tile"><strong>Prepare for a project conversation</strong><p>Include the entrance, intended use, location and timing if those details are available.</p><span className="arrow"><MoveUpRight size={18}/></span></Link></div></div></section></>;
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
function AboutIndex() {
  return <><PageHeading eyebrow="About Bamford" title="Made for the entrance" lead="Bamford designs, manufactures and installs custom-made, vandal-resistant security doors and screens."/><section className="section"><div className="wrap split"><div><p className="eyebrow">Who we serve</p><h2 style={{fontSize:38}}>For public buildings across the UK.</h2></div><div><p style={{color:'#555'}}>Bamford works with local authorities, housing associations, schools and other public and commercial building teams.</p><div className="tile-grid" style={{gridTemplateColumns:'1fr 1fr'}}>{Object.entries(companyPages).filter(([href])=>href!=='/about').map(([href,page])=><Link className="tile" key={href} href={href} style={{minHeight:130,padding:22}}><strong>{page.title}</strong><p>{page.lead}</p></Link>)}</div></div></div></section><CTA/></>;
}
function ArticleDetail({title}:{title:string}) { return <><PageHeading eyebrow="News & insights" title={title} lead="Information for teams planning, maintaining or improving a shared entrance."/><section className="section"><div className="wrap"><p>For current information about products, services or a project requirement, explore the relevant pages or contact the Bamford team.</p><div className="hero-actions"><Link href="/products" className="button button-outline">Explore products</Link><Link href="/contact" className="button">Ask the team <ArrowRight size={15}/></Link></div></div></section></>; }

function LegacyInfo({title}:{title:string}) {
  return <><PageHeading eyebrow="Bamford Doors" title={title} lead="Talk to the Bamford team about your building, entrance or project requirements."/><section className="section"><div className="wrap split"><div><p className="eyebrow">Next step</p><h2 style={{fontSize:36}}>Start with your building.</h2></div><div><p style={{color:'#555'}}>Share the product, service or project information you have, and the team can discuss the requirements relevant to your enquiry.</p><Link href="/contact?purpose=consultation" className="button">Discuss your requirements <ArrowRight size={15}/></Link></div></div></section></>;
}
function NotFound() { return <section className="notfound"><div className="wrap"><p className="eyebrow">404 · Page not found</p><h1 style={{fontSize:58}}>Page not found.</h1><p>We couldn’t find the page you were looking for.</p><Link href="/" className="button">Return home <ArrowRight size={15}/></Link></div></section>; }

function RouteContent() {
  const path=pathNow();
  if(path==='/') return <Home/>;
  if(path==='/products') return <ProductIndex/>;
  if(path==='/services') return <ServiceIndex/>;
  if(path==='/sectors') return <SectorIndex/>;
  if(path==='/case-studies') return <CaseStudies/>;
  if(path==='/news-insights') return <NewsPage/>;
  if(path==='/faq') return <FAQPage/>;
  if(path==='/contact'||path==='/contact-us') return <ContactPage/>;
  if(path==='/about'||path==='/about-5') return <AboutIndex/>;
  const companyPath=legacyCompanyRoutes[path]||path;
  if(companyPages[companyPath]) return <AboutDetail path={companyPath} page={companyPages[companyPath]}/>;
  if(path==='/blog'||path==='/blog-2-2'||path==='/more-news') return <NewsPage/>;
  if(path==='/downloads') return <LegacyInfo title="Downloads and technical information"/>;
  const alias=legacyAliases[path];
  const product=products.find(p=>path===productPath(p)||path===p.legacyPath.replace(/\/$/,'')||path===alias);
  if(product) return <ProductDetail product={product}/>;
  const service=services.find(s=>path===servicePath(s)||path===s.legacyPath.replace(/\/$/,''));
  if(service) return <ServiceDetail service={service}/>;
  const sector=sectors.find(s=>path===sectorPath(s));
  if(sector) return <SectorDetail sector={sector}/>;
  if(path==='/door-entry-access-control') return <LegacyInfo title="Door entry and access control"/>;
  const article=path.match(/^\/news-insights\/(.+)$/);
  if(article) return <ArticleDetail title={article[1].split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ')}/>;
  const caseDetail=path.match(/^\/case-studies\/(.+)$/);
  if(caseDetail) return <CaseStudies/>;
  const legacyType=legacyEntries.get(path);
  if(legacyType==='news/article candidate') return <ArticleDetail title={path.split('/').pop()!.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ')}/>;
  if(legacyType==='case study candidate') return <CaseStudies/>;
  if(legacyType==='team profile') return <LegacyInfo title="Bamford team"/>;
  if(legacyType==='testimonial') return <LegacyInfo title="Customer feedback"/>;
  if(legacyType==='page') return <LegacyInfo title={path.split('/').pop()!.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' ')}/>;
  return <NotFound/>;
}

function getPageSeo(path:string) {
  const product=products.find(p=>path===productPath(p)||path===p.legacyPath.replace(/\/$/,''));
  const service=services.find(s=>path===servicePath(s)||path===s.legacyPath.replace(/\/$/,''));
  const sector=sectors.find(s=>path===sectorPath(s));
  const companyPath=legacyCompanyRoutes[path]||path;
  const company=companyPages[companyPath];
  if(path==='/') return {title:'Quality Bespoke Security Doors',description:'Bamford Doors designs, manufactures and installs bespoke security doors and screens for housing providers, councils, schools and public buildings.',path:'/'};
  if(path==='/products') return {title:'Security Door Products',description:'Explore Bamford Doors’ custom-made security door and entrance system options for housing, public and commercial buildings.',path};
  if(path==='/services') return {title:'Door Project and Maintenance Services',description:'Discuss project management, maintenance, stock condition surveys and entrance-system services with Bamford Doors.',path};
  if(path==='/sectors') return {title:'Sectors We Serve',description:'Explore door and entrance system information for housing, local authorities, education, healthcare and public buildings.',path};
  if(path==='/contact'||path==='/contact-us') return {title:'Contact Bamford Doors',description:'Contact Bamford Doors about a security door, entrance system, project, maintenance requirement or stock condition survey.',path:'/contact'};
  if(path==='/case-studies') return {title:'Project Experience',description:'Discuss building-specific entrance requirements and relevant project experience with Bamford Doors.',path,noindex:true};
  if(path==='/news-insights'||path==='/blog'||path==='/blog-2-2'||path==='/more-news') return {title:'News and Insights for Building Teams',description:'Practical starting points for teams planning, maintaining or improving a shared entrance.',path:'/news-insights'};
  if(path==='/faq') return {title:'Security Door and Entrance FAQs',description:'Practical answers about security door enquiries, product options and services from Bamford Doors.',path};
  if(product) return {title:product.title,description:product.summary,path:productPath(product)};
  if(service) return {title:service.title,description:service.summary,path:servicePath(service)};
  if(sector) return {title:`Security Doors for ${sector.title}`,description:sector.summary,path:sectorPath(sector)};
  if(company) return {title:company.title,description:company.lead,path:companyPath,noindex:companyPath!=='/about'};
  if(path.startsWith('/case-studies/')) return {title:'Project Experience',description:'Discuss building-specific entrance requirements and relevant project experience with Bamford Doors.',path,noindex:true};
  if(path.startsWith('/news-insights/')) return {title:path.split('/').pop()!.split('-').map(w=>w[0]?.toUpperCase()+w.slice(1)).join(' '),description:'Practical information for teams planning, maintaining or improving shared entrances.',path,noindex:true};
  return {title:'Bamford Doors',description:'Bamford Doors designs, manufactures and installs custom-made security doors and screens.',path,noindex:legacyEntries.has(path)||path==='/downloads'};
}

function Router() {
  const [location]=useLocation();
  useEffect(()=>{
    const page=getPageSeo(pathNow());
    applyPageSeo(page);
  },[location]);
  return <ErrorBoundary resetKey={location}><div className="site-shell"><Header/><Switch><Route path="/" component={Home}/><Route component={RouteContent}/></Switch><Footer/></div></ErrorBoundary>;
}
function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/,'')}><Router/></WouterRouter><Toaster/></TooltipProvider></QueryClientProvider>;
}
export default App;
