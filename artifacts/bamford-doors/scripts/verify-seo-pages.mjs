import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { preview } from 'vite';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
process.env.BASE_PATH ||= '/';
process.env.PORT ||= '18092';
process.env.NODE_ENV = 'production';

// Exercise Vite's actual static file serving, not only files on disk.
const server = await preview({
  configFile: path.join(packageRoot, 'vite.config.ts'),
  preview: { host: '127.0.0.1', port: 18092, strictPort: true },
});
const origin = 'http://127.0.0.1:18092';
const text = (html) => html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
const attribute = (html, pattern) => html.match(pattern)?.[1];

try {
  const sitemapResponse = await fetch(`${origin}/sitemap.xml`);
  assert.equal(sitemapResponse.status, 200);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => new URL(match[1]));
  const titles = new Set();
  const descriptions = new Set();
  const pages = new Map();

  for (const url of urls) {
    assert.equal(url.origin, 'https://bamforddoors.com');
    assert.ok(url.pathname.endsWith('/'), `Directory-style canonical: ${url}`);
    const response = await fetch(`${origin}${url.pathname}`);
    assert.equal(response.status, 200, url.pathname);
    const html = await response.text();
    const clientOnly = /^\/case-studies\/[^/]/.test(url.pathname);
    assert.equal((html.match(/<h1\b/g) || []).length, clientOnly ? 0 : 1, `Expected H1 count: ${url.pathname}`);
    assert.equal((html.match(/id="root"/g) || []).length, 1, `One React root: ${url.pathname}`);
    if (clientOnly) {
      assert.ok(html.includes('<div id="root"></div>'), `CMS client-loading shell: ${url.pathname}`);
    } else {
      assert.ok((html.match(/<a\b[^>]*href="\//g) || []).length >= 5, `Internal links: ${url.pathname}`);
      const rootBody = html.split('<div id="root">')[1];
      assert.ok(rootBody && text(rootBody).length > 500, `Useful visible text: ${url.pathname}`);
    }
    assert.equal(attribute(html, /<link rel="canonical" href="([^"]+)"/), url.href);
    const title = attribute(html, /<title>(.*?)<\/title>/);
    const description = attribute(html, /<meta name="description" content="([^"]+)"/);
    assert.ok(title && !titles.has(title), `Unique title: ${url.pathname}`);
    assert.ok(description && !descriptions.has(description), `Unique description: ${url.pathname}`);
    titles.add(title);
    descriptions.add(description);
    pages.set(url.pathname, html);
  }

  const representative = [
    ['/products/aluminium-modular-doors/', 'Built around', 'aluminium'],
    ['/about/', 'Made for the entrance', 'Bamford'],
    ['/services/project-management/', 'Project Management', 'project'],
    ['/services/stock-condition-surveys/', 'Stock Condition Surveys', 'door entry and access systems'],
    ['/sectors/social-housing/', 'Social housing', 'entrance'],
  ];
  for (const [route, heading, copy] of representative) {
    const html = pages.get(route);
    assert.ok(html, route);
    assert.ok(text(attribute(html, /<h1\b[^>]*>([\s\S]*?)<\/h1>/)).includes(heading), `Correct H1: ${route}`);
    assert.ok(text(html).toLowerCase().includes(copy.toLowerCase()), `Correct copy: ${route}`);
    console.log(`PASS served ${route}: H1, content, links and unique metadata`);
  }
  assert.ok(pages.get('/contact/').includes('data-testid="button-submit-enquiry"'));
  const fallback = await (await fetch(`${origin}/spa.html`)).text();
  assert.ok(fallback.includes('<div id="root"></div>'), 'Fallback must remain client-only');
  const unknownRoute = await (await fetch(`${origin}/not-a-generated-page/`)).text();
  assert.ok(unknownRoute.includes('<div id="root"></div>'), 'Unknown served routes must not hydrate the homepage');
  const manifest = await readFile(path.join(packageRoot, '.replit-artifact/artifact.toml'), 'utf8');
  assert.ok(manifest.includes('to = "/spa.html"'), 'Artifact fallback uses the empty shell');
  const vercel = JSON.parse(await readFile(path.join(packageRoot, '../../vercel.json'), 'utf8'));
  assert.equal(vercel.trailingSlash, true);
  assert.equal(vercel.rewrites[0].destination, '/spa.html');
  console.log(`PASS: ${urls.length} served canonical pages, sitemap, contact form and hosting fallbacks.`);
  if (process.argv.includes('--keep-serving')) {
    console.log(`Browser verification server: ${origin}`);
    await new Promise(() => {});
  }
} finally {
  await new Promise((resolve, reject) => server.httpServer.close((error) => error ? reject(error) : resolve()));
}
