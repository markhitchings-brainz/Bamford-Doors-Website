import type { PageSeo } from '@/lib/seo';
import { fetchPublishedCaseStudies } from './client';

export const CASE_STUDIES_SEO = {
  title: 'Security Door Case Studies',
  description: 'Explore Bamford Doors projects, including the brief, entrance solution and outcomes for shared residential and public buildings.',
  path: '/case-studies',
};

// Called during the Vercel build. Read the live published dataset rather than
// the CDN so a publish-triggered build does not snapshot an older listing.
export async function getCaseStudySeoRoutes(): Promise<Array<PageSeo & { requestPath: string }>> {
  const studies = await fetchPublishedCaseStudies({ fresh: true });
  return [
    { ...CASE_STUDIES_SEO, requestPath: '/case-studies', noindex: studies.length === 0 },
    ...studies.map((study) => {
      if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(study.slug)) {
        throw new Error(`Case study ${study._id} has an invalid URL slug. Correct it in Sanity before building.`);
      }
      const path = `/case-studies/${study.slug}`;
      return {
        title: study.seoTitle || study.title,
        description: study.seoDescription || study.excerpt,
        image: study.mainImage?.url,
        path,
        requestPath: path,
      };
    }),
  ];
}
