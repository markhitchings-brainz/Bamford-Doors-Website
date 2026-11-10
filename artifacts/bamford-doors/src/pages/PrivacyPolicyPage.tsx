import type { ReactNode } from 'react';
import { CookieSettingsButton } from '@/components/CookieConsent';
import './privacy-policy.css';

function PolicySection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="privacy-policy-section" id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function LegalNotice({ children }: { children: ReactNode }) {
  return (
    <aside className="privacy-policy-notice" role="note">
      <strong>About this notice</strong>
      <p>{children}</p>
    </aside>
  );
}

function PolicyHeader({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string;
  title: string;
  lead: string;
}) {
  return (
    <header className="page-heading">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-heading-lead">{lead}</p>
      </div>
    </header>
  );
}

export function PrivacyPolicyPage() {
  return (
    <main className="privacy-policy">
      <PolicyHeader
        eyebrow="Your information"
        title="Privacy Policy"
        lead="How F. Bamford (Engineering) Limited, trading as Bamford Doors, collects and uses personal information when you visit our website, contact us, request a quote, or work with us."
      />
      <div className="section">
        <article className="wrap privacy-policy-content">
          <LegalNotice>
            This notice explains how we handle personal information. It is general
            information, not legal advice. Contact us using the details below if
            you have a question about your information.
          </LegalNotice>

          <p className="privacy-policy-meta">Last updated: 10 November 2026</p>

          <p>
            In this policy, “we”, “us” and “our” mean F. Bamford (Engineering)
            Limited. We are the data controller for the personal information
            covered by this policy, and the company is incorporated in the
            United Kingdom.
          </p>

          <nav className="privacy-policy-contents" aria-label="Privacy policy contents">
            <strong>On this page</strong>
            <a href="#who-we-are">Who we are</a>
            <a href="#information-we-collect">Personal information we collect</a>
            <a href="#how-we-use-information">How we use personal information</a>
            <a href="#sharing-information">Who we share information with</a>
            <a href="#cookies-and-other-websites">Cookies and other websites</a>
            <a href="#international-transfers">International transfers</a>
            <a href="#retention">How long we keep information</a>
            <a href="#security">Keeping information secure</a>
            <a href="#rights">Your rights</a>
            <a href="#children">Children</a>
            <a href="#changes">Changes to this policy</a>
          </nav>

          <PolicySection id="who-we-are" title="Who we are">
            <address className="privacy-policy-address">
              <strong>F. Bamford (Engineering) Limited, trading as Bamford Doors</strong>
              <span>Ajax Works, Whitehill Street</span>
              <span>Whitehill Industrial Estate</span>
              <span>Stockport, SK4 1NT</span>
              <span>
                Email: <a href="mailto:sales@bamforddoors.com">sales@bamforddoors.com</a>
              </span>
              <span>
                Telephone: <a href="tel:+441614806500">0161 480 6500</a>
              </span>
            </address>
          </PolicySection>

          <PolicySection id="information-we-collect" title="Personal information we collect">
            <p>The information we collect depends on how you interact with us. It may include:</p>
            <ul>
              <li>
                <strong>Contact details</strong>, such as your name, job title,
                organisation, email address, telephone number and postal address.
              </li>
              <li>
                <strong>Enquiry and project details</strong>, such as your message,
                site address, project requirements, specifications, photographs,
                communications and meeting notes.
              </li>
              <li>
                <strong>Quote, contract and payment records</strong>, such as
                products or services discussed, invoices and transaction details.
              </li>
              <li>
                <strong>Website and device information</strong>, such as your IP
                address, browser type, device details, pages visited and website
                access logs.
              </li>
            </ul>
            <p>
              We receive information directly from you when you contact us or
              work with us. We may also receive relevant business contact details
              from clients, suppliers, project partners or publicly available
              business sources. Website technologies, such as cookies, may
              collect some technical information automatically.
            </p>
          </PolicySection>

          <PolicySection id="how-we-use-information" title="How we use personal information">
            <ul>
              <li>
                <strong>Respond to enquiries and prepare quotes.</strong> We do
                this to take steps you request before entering into a contract
                and, where relevant, to pursue our legitimate interests in
                responding to business enquiries.
              </li>
              <li>
                <strong>Provide and manage products, services and projects.</strong>{' '}
                We use the information needed to perform a contract or manage our
                working relationship with your organisation.
              </li>
              <li>
                <strong>Manage invoices and business records.</strong> We may do
                this to perform a contract, meet legal obligations and keep
                appropriate records.
              </li>
              <li>
                <strong>Operate, maintain and protect our website and business
                systems.</strong> We rely on our legitimate interests in running
                our business, keeping our systems secure and improving our
                services.
              </li>
              <li>
                <strong>Send relevant business updates or marketing</strong>{' '}
                where permitted by law. You can opt out at any time using the
                unsubscribe link in a message or by contacting us.
              </li>
            </ul>
            <p>
              We use personal information only where we have a lawful basis to
              do so, such as taking steps before a contract, performing a
              contract, meeting a legal obligation, pursuing legitimate
              interests or obtaining your consent where required.
            </p>
          </PolicySection>

          <PolicySection id="sharing-information" title="Who we share personal information with">
            <p>We may share personal information where necessary with:</p>
            <ul>
              <li>website, IT, email and business-system providers that help us run our operations;</li>
              <li>professional advisers, such as legal, accounting or insurance providers;</li>
              <li>door-entry, access-control, installation or other project partners involved in delivering work;</li>
              <li>payment, delivery or other service providers where needed for a project or transaction;</li>
              <li>regulators, law-enforcement bodies or other parties where we are legally required to do so;</li>
              <li>a prospective or actual buyer if our business is reorganised, sold or transferred.</li>
            </ul>
            <p>
              We require service providers who handle personal information on
              our behalf to protect it and use it only for the agreed purpose.
            </p>
          </PolicySection>

          <PolicySection id="cookies-and-other-websites" title="Cookies and other websites">
            <p>
              Our website may use cookies and similar technologies. Read our{' '}
              <a href="/cookie-policy/">Cookie Policy</a> for details of the
              cookies in use and how to manage your preferences.
            </p>
            <p>
              You can also change your optional external-media choice using Cookie
              settings in the website footer.
            </p>
            <p>
              Our website may link to websites operated by other organisations.
              Those websites have their own privacy policies, and we are not
              responsible for how they handle your information.
            </p>
          </PolicySection>

          <PolicySection id="international-transfers" title="International transfers">
            <p>
              Some of our service providers may process personal information
              outside the UK. Where a transfer is subject to data-protection
              rules, we use an appropriate transfer mechanism and safeguards as
              required by law.
            </p>
          </PolicySection>

          <PolicySection id="retention" title="How long we keep personal information">
            <p>
              We keep personal information only for as long as it is needed for
              the purpose it was collected for. This may include the time needed
              to respond to an enquiry, manage a customer or supplier
              relationship, complete a project, meet legal or accounting
              requirements, or resolve a dispute.
            </p>
            <p>
              When information is no longer needed, we securely delete it or
              remove details that identify you.
            </p>
          </PolicySection>

          <PolicySection id="security" title="Keeping information secure">
            <p>
              We use appropriate measures to protect personal information from
              loss, misuse and unauthorised access. No method of sending or
              storing information is completely secure, so please avoid sending
              sensitive information through unsecured channels.
            </p>
          </PolicySection>

          <PolicySection id="rights" title="Your rights">
            <p>
              Depending on the circumstances and the lawful basis we rely on,
              you may have the right to:
            </p>
            <ul>
              <li>request access to your personal information;</li>
              <li>ask us to correct inaccurate information or delete it;</li>
              <li>ask us to restrict or object to certain uses of your information;</li>
              <li>request a copy of information you provided, or ask us to transfer it where this right applies;</li>
              <li>withdraw your consent where we rely on consent;</li>
              <li>opt out of direct marketing at any time.</li>
            </ul>
            <p>
              To exercise a right, contact us using the details above. We may
              need to confirm your identity before responding.
            </p>
            <p>
              You can also raise a concern with the UK Information
              Commissioner’s Office (ICO) at{' '}
              <a href="https://ico.org.uk/" target="_blank" rel="noopener noreferrer">
                ico.org.uk
              </a>.
            </p>
          </PolicySection>

          <PolicySection id="children" title="Children">
            <p>
              Our website and services are intended for business customers. We
              do not knowingly collect personal information from children
              through our website.
            </p>
          </PolicySection>

          <PolicySection id="changes" title="Changes to this policy">
            <p>
              We may update this Privacy Policy to reflect changes in our
              practices or legal requirements. We will publish the latest
              version on our website and update the date at the top of this
              page.
            </p>
          </PolicySection>
        </article>
      </div>
    </main>
  );
}

export function CookiePolicyPage() {
  return (
    <main className="privacy-policy">
      <PolicyHeader
        eyebrow="Your information"
        title="Cookie Policy"
        lead="How cookies and similar technologies may be used on the Bamford Doors website."
      />
      <div className="section">
        <article className="wrap privacy-policy-content">
          <LegalNotice>
            This notice is general information, not legal advice. You can
            manage or remove cookies through your browser settings.
          </LegalNotice>
          <p className="privacy-policy-meta">Last updated: 10 November 2026</p>

          <PolicySection id="what-cookies-are" title="What cookies are">
            <p>
              Cookies are small text files stored by your browser. Similar
              technologies can store or access information on your device. They
              can help a website work, remember settings or provide information
              about how a service is used.
            </p>
          </PolicySection>

          <PolicySection id="cookies-used" title="Cookies used on this website">
            <p>
              The public website code does not currently include advertising
              pixels or analytics trackers. The content-management area and
              embedded media may use provider-specific storage or cookies when
              those features are used.
            </p>
            <p>
              The cookie banner stores your essential and optional external
              media choices in local storage on your device so we can remember
              and respect your selection.
            </p>
            <p>
              Some pages may contain video from YouTube or Vimeo. If you choose
              to play an embedded video, the provider may use cookies or similar
              technologies and receive technical information from your browser.
              Those providers have their own privacy and cookie policies.
            </p>
            <p>
              YouTube and Vimeo videos remain blocked until you enable external
              media through the consent banner or Cookie settings.
            </p>
            <p>
              The technologies used may change as the website and its services
              change. This policy will be updated if our use of cookies changes.
            </p>
          </PolicySection>

          <PolicySection id="manage-cookies" title="Managing cookies">
            <p>
              You can use your browser settings to view, block or delete
              cookies. If you block cookies, some third-party features or
              content-management functions may not work as intended.
            </p>
            <p>
              Use Cookie settings in the website footer to change whether
              embedded YouTube and Vimeo videos may load.
            </p>
            <CookieSettingsButton className="cookie-policy-settings-button">
              Open cookie preferences
            </CookieSettingsButton>
            <p>
              Where the law requires consent for non-essential cookies or
              similar technologies, we will request that consent before using
              them.
            </p>
          </PolicySection>

          <PolicySection id="cookie-contact" title="More information">
            <p>
              For questions about privacy, read our{' '}
              <a href="/privacy-policy/">Privacy Policy</a> or contact us at{' '}
              <a href="mailto:sales@bamforddoors.com">sales@bamforddoors.com</a>.
            </p>
          </PolicySection>
        </article>
      </div>
    </main>
  );
}
