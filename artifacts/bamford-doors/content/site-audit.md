# Bamford Doors website — initial audit

Audit date: 21 October 2026  
Source: `https://bamforddoors.com/`, the supplied website redevelopment specification, and the supplied October 2026 brand book.

## Findings

- The live WordPress XML sitemap yielded 202 URL entries across pages, posts, portfolio records, team profiles and testimonials. A row-by-row inventory is in `migration-inventory.csv`.
- The homepage confirms the company describes its work as designing, manufacturing and installing custom-made, vandal-resistant security doors and screens. It names local authorities, housing associations, schools and other public-sector buildings as audiences.
- Product and service information is present on the live homepage, with existing paths for aluminium modular doors, thermally broken doors, wood-effect doors, HMO doors, GRP doors, automatic operators, mailboxes, block address signs, door entry/access control, project management, maintenance, stock condition surveys, warranties, frameworks and resident involvement.
- The case-study index lists real project candidates including Mansfield Council, Clarion Housing Group, Saffron Housing Trust, Welwyn Hatfield, Mansfield District Council, Great Yarmouth and Charnwood. Each needs page-level fact, image and permission review before migration.
- Inner-page fetches and the visual homepage capture were interrupted by reCAPTCHA. This is therefore an initial sitemap/content audit, not a verified crawl of every page, PDF, image, metadata field or redirect.
- The WordPress portfolio sitemap contains 46 records with unrelated generic/demo titles. These are quarantined for review and are not represented as Bamford case studies.
- The archive contains 46 news/article candidates, 10 team profiles and 4 testimonials. Dates, current staff details, testimonial wording and publication permissions need verification.
- The brand book confirms the original logo's proportions and clear-space guidance, Montserrat Bold/Light and a white-led palette. Its supporting-colour entries conflict with the master specification. The site therefore uses the master specification's web red `#C21B20`, black and white only; no supporting brand colour is treated as approved.
- The website's published claims about certifications, product performance, fire ratings, warranties, customer relationships and service commitments are not automatically carried forward. See the verification list below.

## Initial URL migration approach

Preserve existing product, service, case-study and useful editorial paths when practical. New sector, FAQs and content-library pages will use descriptive, stable paths. Keep the original sitemap URL alongside each migrated item. Do not redirect removed content to the homepage; map it to a genuinely relevant destination or leave it out after approval.

The inventory distinguishes candidate content from quarantined portfolio records. Its proposed routes are provisional until full content and SEO review is possible.

## Initial content model

- **Product:** title, slug, concise overview, intended applications, verified benefits/specifications, configurations/finishes, media, downloads, FAQs, related products/cases and enquiry CTA.
- **Service:** title, slug, audience, scope, process, verified commitments and enquiry CTA.
- **Sector:** title, slug, distinct buyer/resident needs, relevant product/service links and FAQs.
- **Case study:** approved customer, sector, approved location, challenge, requirement, solution, products, delivery, evidence/outcome, approved media and related links.
- **Article:** title, slug, author, category, tags, dates, summary, body, review/publication state and SEO metadata.
- **FAQ:** question, answer, approval state and links to related pages.
- **Document:** title, category, version/date where known, description, file and relevant pages.
- **Enquiry:** contact details, request type, optional project context, message, source path, status and creation date.

## Client verification required before launch

1. Current and valid accreditations, frameworks, Secured by Design status and any ISO references.
2. Product-specific security, fire, thermal, accessibility and regulatory evidence.
3. Warranty terms, expected lifetimes, lead times, installation commitments and maintenance scope.
4. Whether the public may be offered a free survey/audit, and the exact scope/terms.
5. Customer names/logos, case-study facts, project photography and testimonial wording/permissions.
6. Current company/contact details, opening hours, notification recipient and legal/privacy/cookie wording.
7. Approved standalone logo files, original photography/video, current brochures/drawings and document versions.
8. Keyword targets from the linked Google Sheet; access has not yet been established.
9. Full page-level crawl, URL-to-destination review, metadata, document/media and redirect verification. Current site pages triggered CAPTCHA in the audit browser.

## Not yet completed

This inventory does not establish that every indexed URL is useful, current, approved, or present in the new site. Full migration, CMS/editor roles, scheduled publishing, media/document administration, enquiry management, configured email delivery, consent/analytics, and final SEO/redirect testing remain later build work.
