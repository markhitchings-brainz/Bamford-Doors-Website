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
