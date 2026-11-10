import assert from 'node:assert/strict';
import test from 'node:test';
import { assertWithinBudgets, stylesFor } from './public-style-audit.mjs';

const stylesheetUrl = 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap';
const latinUrl = 'https://fonts.gstatic.com/s/montserrat/v1/latin.woff2';
const latinExtUrl = 'https://fonts.gstatic.com/s/montserrat/v1/latin-ext.woff2';
const cyrillicUrl = 'https://fonts.gstatic.com/s/montserrat/v1/cyrillic.woff2';

function fixtureCss() {
  return `
    @import url("${stylesheetUrl}");
    @import url("${stylesheetUrl}");
  `;
}

function fontFace(subset, url, weight) {
  return `/* ${subset} */
    @font-face {
      font-family: Montserrat;
      font-style: normal;
      font-weight: ${weight};
      src: url("${url}") format("woff2");
    }`;
}

function auditFixture(remoteStylesheet = [
  fontFace('latin', latinUrl, '400'),
  fontFace('latin', latinUrl, '500'),
  fontFace('latin-ext', latinExtUrl, '400'),
  fontFace('cyrillic', cyrillicUrl, '400'),
].join('\n')) {
  const calls = [];
  const files = new Map([['/virtual/assets/main.css', Buffer.from(fixtureCss())]]);
  const bodies = new Map([
    [stylesheetUrl, Buffer.from(remoteStylesheet)],
    [latinUrl, Buffer.from('latin font bytes')],
    [latinExtUrl, Buffer.from('latin extended font bytes')],
    [cyrillicUrl, Buffer.from('cyrillic font bytes')],
  ]);
  const fetchImpl = async (url) => {
    calls.push(url);
    const body = bodies.get(url);
    assert.ok(body, `Unexpected fixture request: ${url}`);
    return new Response(body, { status: 200 });
  };
  const manifest = {
    entry: { file: 'assets/main.js', css: ['assets/main.css'] },
  };
  return {
    calls,
    run: (options = {}) => stylesFor(['entry'], {
      manifest,
      output: '/virtual',
      readFileImpl: async (file) => {
        assert.ok(files.has(file), `Unexpected fixture file: ${file}`);
        return files.get(file);
      },
      fetchImpl,
      ...options,
    }),
  };
}

test('follows a stylesheet import containing multiple font weights offline', async () => {
  const fixture = auditFixture();
  const result = await fixture.run();

  assert.equal(result.externalStylesheets.length, 1);
  assert.equal(result.externalStylesheets[0].url, stylesheetUrl);
  assert.equal(fixture.calls.filter((url) => url === stylesheetUrl).length, 1);
  assert.ok(stylesheetUrl.includes('wght@400;500;600;700;800'));
});

test('counts unique Latin and Latin-ext font URLs and excludes other subsets', async () => {
  const fixture = auditFixture();
  const caches = { remoteCssCache: new Map(), fontAssetCache: new Map() };
  const result = await fixture.run(caches);

  assert.deepEqual(
    result.fontAssets.map(({ file, subset }) => ({ file, subset })),
    [
      { file: latinUrl, subset: 'latin' },
      { file: latinExtUrl, subset: 'latin-ext' },
    ],
  );
  assert.equal(result.fontAssets.length, 2);
  assert.equal(result.fontTotal.bytes, Buffer.byteLength('latin font bytes') + Buffer.byteLength('latin extended font bytes'));
  assert.equal(result.fontTotalsBySubset.latin.bytes, Buffer.byteLength('latin font bytes'));
  assert.equal(result.fontTotalsBySubset['latin-ext'].bytes, Buffer.byteLength('latin extended font bytes'));
  assert.equal(fixture.calls.filter((url) => url === latinUrl).length, 1);
  assert.equal(fixture.calls.filter((url) => url === latinExtUrl).length, 1);
  assert.ok(!fixture.calls.includes(cyrillicUrl));

  await fixture.run(caches);
  assert.equal(fixture.calls.length, 3, 'Shared cache should reuse CSS and font downloads across route groups');
});

test('reports failed stylesheet and font fetches with the asset URL', async () => {
  await assert.rejects(
    stylesFor(['entry'], {
      manifest: { entry: { file: 'assets/main.js', css: ['assets/main.css'] } },
      output: '/virtual',
      readFileImpl: async () => Buffer.from(fixtureCss()),
      fetchImpl: async () => new Response('unavailable', { status: 503 }),
    }),
    new RegExp(`Could not measure public asset ${stylesheetUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: HTTP 503`),
  );

  const remoteCss = fontFace('latin', latinUrl, '400');
  const requestedUrls = [];
  await assert.rejects(
    stylesFor(['entry'], {
      manifest: { entry: { file: 'assets/main.js', css: ['assets/main.css'] } },
      output: '/virtual',
      readFileImpl: async () => Buffer.from(`@import url("${stylesheetUrl}");`),
      fetchImpl: async (url) => {
        requestedUrls.push(url);
        if (url === stylesheetUrl) return new Response(remoteCss, { status: 200 });
        throw new Error('network unavailable');
      },
    }),
    new RegExp(`Could not measure public asset ${latinUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}: network unavailable`),
  );
  assert.deepEqual(requestedUrls, [stylesheetUrl, latinUrl]);
});

test('names exceeded CSS and font budgets in a clear failure', () => {
  assert.throws(
    () => assertWithinBudgets([
      { name: 'Initial public pages CSS', actual: 66_000, limit: 65_000 },
      { name: 'CMS listing fonts', actual: 126_000, limit: 125_000 },
    ]),
    (error) => {
      assert.match(error.message, /Public transfer budget exceeded:/);
      assert.match(error.message, /Initial public pages CSS: 66\.00 kB exceeds 65\.00 kB/);
      assert.match(error.message, /CMS listing fonts: 126\.00 kB exceeds 125\.00 kB/);
      return true;
    },
  );
});

test('accepts assets that are exactly at their budgets', () => {
  assert.doesNotThrow(() => assertWithinBudgets([
    { name: 'CSS', actual: 65_000, limit: 65_000 },
    { name: 'Fonts', actual: 125_000, limit: 125_000 },
  ]));
});
