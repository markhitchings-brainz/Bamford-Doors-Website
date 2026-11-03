export type PageSeo = {
  title: string;
  description: string;
  path: string;
  noindex?: boolean;
  image?: string;
};

export const SITE_ORIGIN = "https://bamforddoors.com";

export function canonicalUrl(path: string) {
  const canonicalPath =
    path === "/" ? "/" : `${path.replace(/\/+$/, "")}/`;
  return new URL(canonicalPath, SITE_ORIGIN).toString();
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = content;
}

export function applyPageSeo({ title, description, path, noindex, image }: PageSeo) {
  const pageTitle = title === "Bamford Doors" ? title : `${title} | Bamford Doors`;
  const canonicalPageUrl = canonicalUrl(path);
  const imageUrl = new URL(image || "/media/aluminium.webp", SITE_ORIGIN).toString();

  document.title = pageTitle;
  upsertMeta("name", "description", description);
  upsertMeta("name", "robots", noindex ? "noindex, nofollow" : "index, follow");
  upsertMeta("property", "og:title", pageTitle);
  upsertMeta("property", "og:description", description);
  upsertMeta("property", "og:type", "website");
  upsertMeta("property", "og:url", canonicalPageUrl);
  upsertMeta("property", "og:image", imageUrl);
  upsertMeta("property", "og:image:alt", title);
  upsertMeta("property", "og:site_name", "Bamford Doors");
  upsertMeta("name", "twitter:card", "summary_large_image");
  upsertMeta("name", "twitter:title", pageTitle);
  upsertMeta("name", "twitter:description", description);
  upsertMeta("name", "twitter:image", imageUrl);

  let canonical = document.head.querySelector<HTMLLinkElement>(
    'link[rel="canonical"]',
  );
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalPageUrl;

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Bamford Doors",
    legalName: "F. Bamford (Engineering) Ltd",
    description:
      "Design, manufacture and installation of custom-made security doors and screens.",
    url: SITE_ORIGIN,
    logo: new URL("/media/bamford-doors-wordmark.png", SITE_ORIGIN).toString(),
  };
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Bamford Doors",
    url: SITE_ORIGIN,
  };

  let schema = document.head.querySelector<HTMLScriptElement>(
    "#bamford-structured-data",
  );
  if (!schema) {
    schema = document.createElement("script");
    schema.id = "bamford-structured-data";
    schema.type = "application/ld+json";
    document.head.appendChild(schema);
  }
  schema.textContent = JSON.stringify([organizationSchema, websiteSchema]);
}
