import { createClient } from '@sanity/client';

export type NewsStory = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string;
  author?: string;
  publishedAt: string;
  seoTitle?: string;
  seoDescription?: string;
  mainImage?: { url: string; alt?: string } | null;
  body: Array<Record<string, unknown>>;
};

const client = createClient({
  projectId: 'ih9rxf6u',
  dataset: 'production',
  apiVersion: '2025-02-19',
  useCdn: true,
  perspective: 'published',
});

const newsProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  category,
  author,
  publishedAt,
  seoTitle,
  seoDescription,
  "mainImage": mainImage { "url": asset->url, alt },
  "body": body[] {
    ...,
    _type == "image" => { ..., "url": asset->url }
  }
}`;

export async function fetchPublishedNewsStories(): Promise<NewsStory[]> {
  return client.fetch(
    `*[_type == "newsStory" && defined(slug.current) && defined(publishedAt) && publishedAt <= now()] | order(publishedAt desc) ${newsProjection}`,
  );
}

export async function fetchPublishedNewsStory(
  slug: string,
): Promise<NewsStory | null> {
  return client.fetch(
    `*[_type == "newsStory" && slug.current == $slug && defined(publishedAt) && publishedAt <= now()][0] ${newsProjection}`,
    { slug },
  );
}

export type CaseStudyImage = {
  url: string;
  alt?: string;
  caption?: string;
};

export type CaseStudySummary = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  publishedAt: string;
  location?: string;
  sector?: string;
  clientName?: string;
  completedAt?: string;
  productsUsed?: string[];
  mainImage?: CaseStudyImage | null;
  seoTitle?: string;
  seoDescription?: string;
};

export type CaseStudy = CaseStudySummary & {
  brief: Array<Record<string, unknown>>;
  solution: Array<Record<string, unknown>>;
  outcome: Array<Record<string, unknown>>;
  gallery?: Array<CaseStudyImage & { _key: string }>;
  testimonial?: { quote: string; attribution: string; role?: string } | null;
};

const caseStudyFields = `
  _id, title, "slug": slug.current, excerpt, publishedAt,
  location, sector, clientName, completedAt, "productsUsed": coalesce(productsUsed, []),
  seoTitle, seoDescription,
  "mainImage": mainImage { "url": asset->url, alt, caption }
`;
const richTextProjection = `[] {
  ...,
  _type == "image" => { ..., "url": asset->url }
}`;
const caseStudyDetailProjection = `{
  ${caseStudyFields},
  "brief": coalesce(brief${richTextProjection}, []),
  "solution": coalesce(solution${richTextProjection}, []),
  "outcome": coalesce(outcome${richTextProjection}, []),
  "gallery": coalesce(gallery[defined(asset._ref)] { _key, "url": asset->url, alt, caption }, []),
  testimonial
}`;
const publishedCaseStudyFilter =
  `_type == "caseStudy" && !(_id in path("drafts.**")) && defined(slug.current) && defined(publishedAt) && publishedAt <= now()`;

export async function fetchPublishedCaseStudies(
  options: { fresh?: boolean } = {},
): Promise<CaseStudySummary[]> {
  const reader = options.fresh ? client.withConfig({ useCdn: false, timeout: 15_000 }) : client;
  return reader.fetch(
    `*[${publishedCaseStudyFilter}] | order(publishedAt desc) { ${caseStudyFields} }`,
  );
}

export async function fetchPublishedCaseStudy(slug: string): Promise<CaseStudy | null> {
  return client.fetch(
    `*[${publishedCaseStudyFilter} && slug.current == $slug][0] ${caseStudyDetailProjection}`,
    { slug },
  );
}
