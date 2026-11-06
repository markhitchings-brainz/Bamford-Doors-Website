import { ArrowRight, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import { ResponsiveImage } from '@/components/ResponsiveImage';
import './project-management.css';

export function ProjectManagementPage() {
  return (
    <main className="project-management">
      <section className="pm-hero">
        <div className="wrap">
          <nav className="crumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link><ChevronRight size={12} />
            <Link href="/services">Services</Link><ChevronRight size={12} />
            <span aria-current="page">Project Management</span>
          </nav>
          <div className="pm-hero-grid">
            <div className="pm-hero-copy">
              <p className="eyebrow">Services / Project Management</p>
              <h1>Project<br /><em>Management</em></h1>
              <p className="pm-hero-deck">A doorset solution shaped around your project</p>
              <span className="pm-rule" aria-hidden="true" />
              <p className="pm-intro">Every project has a nominated Project Manager who works closely with you and our Technical Team. Together, we develop doorset solutions tailored to the requirements of your building, its intended use and your project brief.</p>
              <p className="pm-intro">From the first discussions through design, manufacture and installation, your Project Manager helps coordinate the work and keeps communication clear as the project progresses.</p>
            </div>
            <figure className="pm-hero-image">
              <ResponsiveImage src="/media/bamford-project-team-reviewing-workshop.jpg" alt="Two Bamford colleagues reviewing work together at a factory bench" sizes="(max-width: 760px) 100vw, 50vw" fetchPriority="high" />
              <figcaption><span>01 / IN THE WORKSHOP</span>People, process and production.</figcaption>
            </figure>
          </div>
          <div className="pm-hero-index" aria-hidden="true"><span>PROJECT SUPPORT</span><span>DESIGNED · MADE · INSTALLED</span></div>
        </div>
      </section>

      <section className="pm-support">
        <div className="wrap pm-support-grid">
          <div className="pm-support-heading">
            <p className="eyebrow">Built around the brief</p>
            <h2>Support from an <em>experienced team</em></h2>
          </div>
          <div className="pm-support-copy">
            <p className="pm-large-copy">No two projects are the same.</p>
            <p>Our Project Managers and Technical Team take time to understand what you need, then work with you to develop a suitable doorset solution. We support projects for local authorities, housing associations, schools and other public-sector organisations, adapting our approach to each client and setting.</p>
            <p>Having a nominated Project Manager gives you a clear point of contact. They work alongside our Technical Team as the requirements are developed and the solution moves through the project stages.</p>
          </div>
        </div>
      </section>

      <section className="pm-production">
        <div className="wrap pm-production-grid">
          <figure className="pm-production-image">
            <ResponsiveImage src="/media/bamford-aluminium-profiles-workshop.jpg" alt="Aluminium profiles arranged on a workbench in the Bamford workshop" loading="lazy" sizes="(max-width: 760px) 100vw, 50vw" />
            <figcaption><span>02 / MATERIAL & DETAIL</span>Production begins with the project requirements.</figcaption>
          </figure>
          <div className="pm-production-copy">
            <p className="eyebrow">From discussion to installation</p>
            <h2>One clear point of contact. <em>All the way through.</em></h2>
            <div className="pm-stage-list" aria-label="Project stages">
              <div><span>01</span><strong>First discussions</strong></div>
              <div><span>02</span><strong>Design</strong></div>
              <div><span>03</span><strong>Manufacture</strong></div>
              <div><span>04</span><strong>Installation</strong></div>
            </div>
          </div>
        </div>
      </section>

      <section className="pm-safety">
        <div className="wrap pm-safety-inner">
          <div className="pm-safety-mark" aria-hidden="true">H&amp;S</div>
          <div className="pm-safety-copy">
            <p className="eyebrow">Responsible project oversight</p>
            <h2>Project management <em>and safety</em></h2>
            <p>Health and safety is part of our project oversight. Every project has a nominated Project Manager who holds CITB SMSTS or SSSTS certification, or works in conjunction with the Director responsible for health and safety.</p>
          </div>
          <div className="pm-safety-note">
            <span>PROJECT OVERSIGHT</span>
            <p>Health and safety stays part of the conversation as the project progresses.</p>
          </div>
        </div>
      </section>

      <section className="pm-contact">
        <div className="wrap pm-contact-inner">
          <div>
            <p className="eyebrow">Discuss your project</p>
            <h2>Start with the building.<br /><em>We’ll take it from there.</em></h2>
            <p>If you are planning a doorset project, speak to our team about your requirements and the support you need.</p>
          </div>
          <Link className="pm-contact-link" href="/contact?purpose=consultation">
            <span>Talk to Bamford Doors about your project</span><ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </main>
  );
}
