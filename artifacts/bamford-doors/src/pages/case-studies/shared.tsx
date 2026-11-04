import { PortableText, type PortableTextComponents } from '@portabletext/react';
import type { ReactNode } from 'react';

export function sanityImage(url: string, width: number) {
  if (!url) return url;
  try {
    const u = new URL(url);
    if (!u.hostname.endsWith('sanity.io')) return url;
    u.searchParams.set('w', String(width));
    u.searchParams.set('auto', 'format');
    u.searchParams.set('fit', 'max');
    u.searchParams.set('q', '82');
    return u.toString();
  } catch {
    return url;
  }
}

export function sanitySrcSet(url: string, widths: number[]) {
  return widths.map((w) => `${sanityImage(url, w)} ${w}w`).join(', ');
}

export function formatDate(value?: string) {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
}

export function safeHref(href: unknown): string | null {
  if (typeof href !== 'string') return null;
  const value = href.trim();
  try {
    const u = new URL(value);
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(u.protocol) ? value : null;
  } catch {
    return null;
  }
}

export function hasBlocks(blocks?: Array<Record<string, unknown>> | null) {
  return Array.isArray(blocks) && blocks.length > 0;
}

const components: PortableTextComponents = {
  marks: {
    link: ({ value, children }: { value?: { href?: unknown }; children: ReactNode }) => {
      const href = safeHref(value?.href);
      if (!href) return <>{children}</>;
      const external = href.startsWith('http');
      return <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>{children}</a>;
    },
  },
  types: {
    image: ({ value }: { value: { url?: string; alt?: string; caption?: string } }) => {
      if (!value?.url) return null;
      return (
        <figure className="cs-rich-figure">
          <img src={sanityImage(value.url, 1200)} srcSet={sanitySrcSet(value.url, [640, 960, 1400])} sizes="(max-width: 760px) 100vw, 720px" alt={value.alt || ''} loading="lazy" />
          {value.caption && <figcaption>{value.caption}</figcaption>}
        </figure>
      );
    },
  },
};

export function RichText({ value }: { value: Array<Record<string, unknown>> }) {
  return <div className="cs-rich"><PortableText value={value as never} components={components} /></div>;
}
