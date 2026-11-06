import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createServer } from "vite";

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = path.join(packageRoot, "dist/public");
const publicDirectory = path.join(packageRoot, "public");
const sitemapPath = path.join(publicDirectory, "sitemap.xml");

process.env.BASE_PATH ||= "/";
process.env.PORT ||= "18091";
process.env.NODE_ENV = "production";

const vite = await createServer({
  configFile: path.join(packageRoot, "vite.config.ts"),
  server: { middlewareMode: true },
  optimizeDeps: { noDiscovery: true, include: [] },
  appType: "custom",
  logLevel: "error",
});

try {
  const [{ getSeoRoutes, renderPage }, { SITE_ORIGIN, canonicalUrl }] = await Promise.all([
    vite.ssrLoadModule("/src/entry-server.tsx"),
    vite.ssrLoadModule("/src/lib/seo.ts"),
  ]);
  const { getCaseStudySeoRoutes } = await vite.ssrLoadModule("/src/sanity/caseStudySeo.ts");
  const routes = [
    ...getSeoRoutes().filter((route) => route.requestPath !== "/case-studies"),
    ...await getCaseStudySeoRoutes(),
  ];
  const template = await readFile(path.join(outputDirectory, "index.html"), "utf8");
  if (!template.includes('<div id="root"></div>')) {
    throw new Error('Expected a fresh Vite build with an empty root. Run the full build before pre-rendering.');
  }
  // Unknown routes and CMS articles must mount normally, not hydrate a copy of
  // the homepage. Hosting fallbacks point here rather than the generated home.
  await writeFile(path.join(outputDirectory, "spa.html"), template);

  const escapeHtml = (value) =>
    String(value)
      .replaceAll("&", "&amp;")
      .replaceAll('"', "&quot;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;");
  const escapeRegExp = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const setHeadTag = (html, pattern, replacement) => {
    if (pattern.test(html)) return html.replace(pattern, replacement);
    return html.replace("</head>", `  ${replacement}\n</head>`);
  };
  const metaPattern = (attribute, key) =>
    new RegExp(
      `<meta\\b(?=[^>]*\\b${attribute}=["']${escapeRegExp(key)}["'])[^>]*>`,
      "i",
    );

  function renderHead(source, page) {
    const pageTitle =
      page.title === "Bamford Doors" ? page.title : `${page.title} | Bamford Doors`;
    const canonicalPageUrl = canonicalUrl(page.path);
    const imageUrl = new URL(page.image || "/media/aluminium.webp", SITE_ORIGIN).toString();
    const robots = page.noindex ? "noindex, nofollow" : "index, follow";
    let html = source.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(pageTitle)}</title>`);

    const metadata = [
      ["name", "description", page.description],
      ["name", "robots", robots],
      ["property", "og:title", pageTitle],
      ["property", "og:description", page.description],
      ["property", "og:type", "website"],
      ["property", "og:url", canonicalPageUrl],
      ["property", "og:image", imageUrl],
      ["property", "og:image:alt", page.title],
      ["property", "og:site_name", "Bamford Doors"],
      ["name", "twitter:card", "summary_large_image"],
      ["name", "twitter:title", pageTitle],
      ["name", "twitter:description", page.description],
      ["name", "twitter:image", imageUrl],
    ];

    for (const [attribute, key, value] of metadata) {
      const tag = `<meta ${attribute}="${key}" content="${escapeHtml(value)}">`;
      html = setHeadTag(html, metaPattern(attribute, key), tag);
    }

    const canonicalTag = `<link rel="canonical" href="${escapeHtml(canonicalPageUrl)}">`;
    html = setHeadTag(
      html,
      /<link\b(?=[^>]*\brel=["']canonical["'])[^>]*>/i,
      canonicalTag,
    );

    const structuredData = [
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "Bamford Doors",
        legalName: "F. Bamford (Engineering) Ltd",
        description:
          "Design, manufacture and installation of custom-made security doors and screens.",
        url: SITE_ORIGIN,
        logo: new URL("/media/bamford-doors-wordmark.png", SITE_ORIGIN).toString(),
      },
      { "@context": "https://schema.org", "@type": "WebSite", name: "Bamford Doors", url: SITE_ORIGIN },
    ];
    const schemaTag = `<script id="bamford-structured-data" type="application/ld+json">${JSON.stringify(structuredData)}</script>`;
    html = setHeadTag(
      html,
      /<script\b(?=[^>]*\bid=["']bamford-structured-data["'])[\s\S]*?<\/script>/i,
      schemaTag,
    );
    return html;
  }

  const indexablePaths = [...new Set(routes.filter((route) => !route.noindex).map((route) => route.path))];
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...indexablePaths.map(
      (routePath) =>
        `  <url><loc>${canonicalUrl(routePath)}</loc></url>`,
    ),
    "</urlset>",
    "",
  ].join("\n");

  await writeFile(sitemapPath, sitemap);
  await writeFile(path.join(outputDirectory, "sitemap.xml"), sitemap);

  for (const route of routes) {
    const body = await renderPage(route.requestPath);
    if (body && !/<h1\b/.test(body)) {
      throw new Error(`Pre-rendered page has no H1: ${route.requestPath}`);
    }
    const routeHtml = renderHead(template, route).replace(
      '<div id="root"></div>',
      () => `<div id="root">${body}</div>`,
    );
    if (route.requestPath === "/") {
      await writeFile(path.join(outputDirectory, "index.html"), routeHtml);
      continue;
    }

    const routeDirectory = path.join(
      outputDirectory,
      route.requestPath.replace(/^\/|\/$/g, ""),
    );
    await mkdir(routeDirectory, { recursive: true });
    await writeFile(path.join(routeDirectory, "index.html"), routeHtml);
  }

  console.log(
    `Generated page bodies and metadata for ${routes.length} URLs and a sitemap with ${indexablePaths.length} indexable URLs.`,
  );
} finally {
  await vite.close();
}
