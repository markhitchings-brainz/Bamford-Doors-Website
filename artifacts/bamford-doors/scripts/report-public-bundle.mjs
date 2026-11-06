import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync } from 'node:zlib';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(packageRoot, '../../generated-artifacts/bundle-analysis/public');
const reportDirectory = path.resolve(packageRoot, '../../generated-artifacts/bundle-analysis');
const gzipBudgets = {
  initial: 160_000,
  cmsListing: 205_000,
  cmsDetail: 225_000,
};
const styleBudgets = {
  cssGzip: 65_000,
  fontBytes: 125_000,
};
const manifest = JSON.parse(await readFile(path.join(output, '.vite/manifest.json'), 'utf8'));
const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
assert.ok(entry, 'Expected a browser entry');

// Count the entire static import graph, not just the named entry chunk.
// Dynamic imports are excluded: they are transferred only on demand.
function graph(key, seen = new Set()) {
  if (seen.has(key)) return seen;
  assert.ok(manifest[key], `Missing manifest entry: ${key}`);
  seen.add(key);
  for (const dependency of manifest[key].imports || []) graph(dependency, seen);
  return seen;
}

const fontFilePattern = /\.(?:woff2?|ttf|otf)(?:[?#].*)?$/i;
const remoteCssCache = new Map();
const fontAssetCache = new Map();

function referencedUrls(css, pattern) {
  return [...css.matchAll(pattern)].map((match) => match[2] || match[1]);
}

async function fetchRemote(url, cache) {
  if (!cache.has(url)) {
    cache.set(url, (async () => {
      const response = await fetch(url, {
        headers: {
          accept: 'text/css,*/*;q=0.1',
          'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        },
        signal: AbortSignal.timeout(15_000),
      });
      assert.ok(response.ok, `Could not measure public asset ${url}: HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    })());
  }
  return cache.get(url);
}

async function stylesFor(keys) {
  const cssFiles = new Set();
  for (const key of keys.flatMap((item) => [...graph(item)])) {
    for (const file of manifest[key].css || []) cssFiles.add(file);
    if (manifest[key].file.endsWith('.css')) cssFiles.add(manifest[key].file);
  }

  const cssAssets = [];
  const externalStylesheetUrls = new Set();
  const fontResources = new Map();
  const pendingStylesheets = [];
  for (const file of cssFiles) {
    const buffer = await readFile(path.join(output, file));
    const css = buffer.toString('utf8');
    cssAssets.push({
      file,
      bytes: buffer.length,
      gzip: gzipSync(buffer).length,
      brotli: brotliCompressSync(buffer).length,
    });
    for (const url of referencedUrls(
      css,
      /@import\s*(?:url\(\s*)?["']?(https?:\/\/[^"')\s]+)["']?\s*\)?[^;]*;/gi,
    )) {
      if (!externalStylesheetUrls.has(url)) {
        externalStylesheetUrls.add(url);
        pendingStylesheets.push(url);
      }
    }
    for (const url of referencedUrls(css, /url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
      if (!fontFilePattern.test(url) || /^(?:data:|https?:\/\/)/i.test(url)) continue;
      const localPath = url.startsWith('/')
        ? path.join(output, url.slice(1).split(/[?#]/)[0])
        : path.resolve(output, path.dirname(file), url.split(/[?#]/)[0]);
      fontResources.set(path.relative(output, localPath), async () => readFile(localPath));
    }
  }

  // Follow imported stylesheets as well as CSS emitted into the build. This
  // includes font files referenced by external @font-face declarations.
  for (let index = 0; index < pendingStylesheets.length; index += 1) {
    const url = pendingStylesheets[index];
    const buffer = await fetchRemote(url, remoteCssCache);
    const css = buffer.toString('utf8');
    for (const importedUrl of referencedUrls(
      css,
      /@import\s*(?:url\(\s*)?["']?(https?:\/\/[^"')\s]+)["']?\s*\)?[^;]*;/gi,
    )) {
      if (!externalStylesheetUrls.has(importedUrl)) {
        externalStylesheetUrls.add(importedUrl);
        pendingStylesheets.push(importedUrl);
      }
    }
    const fontFaces = [...css.matchAll(/(?:\/\*\s*([^*]+?)\s*\*\/\s*)?@font-face\s*\{([^}]+)\}/gi)];
    const hasSubsetLabels = fontFaces.some(([, subset]) => subset);
    for (const [, subset, face] of fontFaces) {
      // The public site is English; count the Latin and Latin-ext files that
      // can serve its text, not unrelated Cyrillic or Vietnamese subsets.
      if (hasSubsetLabels && !['latin', 'latin-ext'].includes(subset?.trim().toLowerCase())) continue;
      for (const fontUrl of referencedUrls(face, /url\(\s*(['"]?)(.*?)\1\s*\)/gi)) {
        if (fontFilePattern.test(fontUrl)) {
          fontResources.set(fontUrl, () => fetchRemote(fontUrl, fontAssetCache));
        }
      }
    }
  }

  const externalStylesheets = [];
  for (const url of externalStylesheetUrls) {
    const buffer = await fetchRemote(url, remoteCssCache);
    externalStylesheets.push({
      url,
      bytes: buffer.length,
      gzip: gzipSync(buffer).length,
      brotli: brotliCompressSync(buffer).length,
    });
  }

  const fontAssets = [];
  for (const [file, load] of fontResources) {
    const buffer = await load();
    fontAssets.push({
      file,
      bytes: buffer.length,
      // WOFF/WOFF2 are already compressed; use their actual payload size.
      gzip: gzipSync(buffer).length,
    });
  }

  const sum = (assets) => assets.reduce((total, asset) => ({
    bytes: total.bytes + asset.bytes,
    gzip: total.gzip + asset.gzip,
    brotli: total.brotli + (asset.brotli || 0),
  }), { bytes: 0, gzip: 0, brotli: 0 });
  const cssTotal = sum([...cssAssets, ...externalStylesheets]);
  const fontTotal = sum(fontAssets);
  return {
    cssAssets,
    externalStylesheets,
    cssTotal,
    fontAssets,
    fontTotal,
  };
}

const initial = graph(entry);
const chunks = [];
const sourceCharacters = new Map();
const initialSources = [];
for (const key of initial) {
  const file = manifest[key].file;
  if (!file.endsWith('.js')) continue;
  const buffer = await readFile(path.join(output, file));
  chunks.push({
    file,
    bytes: buffer.length,
    gzip: gzipSync(buffer).length,
    brotli: brotliCompressSync(buffer).length,
  });
  const map = JSON.parse(await readFile(path.join(output, `${file}.map`), 'utf8'));
  map.sources.forEach((source, index) => {
    initialSources.push(source);
    // Attribution is original source size, not minified/transferred bytes.
    const dependency = source.split('node_modules/.pnpm/')[1]?.split('/')[0];
    const name = dependency || (source.includes('/src/') ? 'application' : 'other');
    sourceCharacters.set(name, (sourceCharacters.get(name) || 0) + (map.sourcesContent[index]?.length || 0));
  });
}

// Rollup may use generated keys rather than source paths for shared chunks.
const studio = Object.keys(manifest).find((key) => manifest[key].name === 'StudioPage' && manifest[key].isDynamicEntry);
const detail = Object.keys(manifest).find((key) => manifest[key].name === 'CaseStudyDetailPage' && manifest[key].isDynamicEntry);
const newsPage = Object.keys(manifest).find((key) => manifest[key].name === 'NewsInsightsPage' && manifest[key].isDynamicEntry);
const caseStudiesIndex = Object.keys(manifest).find((key) => manifest[key].name === 'CaseStudiesPage' && manifest[key].isDynamicEntry);
const legacyInventory = Object.keys(manifest).find((key) => {
  const item = manifest[key];
  return item.isDynamicEntry && [key, item.name, item.src, item.file]
    .some((value) => typeof value === 'string' && value.includes('legacy-route-inventory'));
});
assert.ok(studio && manifest[studio].isDynamicEntry, 'Studio must stay lazy');
assert.ok(!initial.has(studio), 'Studio must not enter the public static graph');
assert.ok(detail && manifest[detail].isDynamicEntry, 'Case study detail must stay lazy');
assert.ok(!initial.has(detail), 'Detail viewer must not enter the public static graph');
assert.ok(newsPage && manifest[newsPage].isDynamicEntry, 'News listing and article pages must stay lazy');
assert.ok(!initial.has(newsPage), 'News pages must not enter the public static graph');
assert.ok(caseStudiesIndex && manifest[caseStudiesIndex].isDynamicEntry, 'Case study listing must stay lazy');
assert.ok(!initial.has(caseStudiesIndex), 'Case study listing must not enter the public static graph');
assert.ok(legacyInventory, 'Legacy route inventory must stay deferred');
assert.ok(!initial.has(legacyInventory), 'Legacy route inventory must not enter the public static graph');
for (const source of initialSources) {
  assert.ok(!/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?(?:sanity|@sanity\/client|@radix-ui\/react-(?:toast|tooltip|dialog))\//.test(source),
    `Unexpected deferred dependency in initial graph: ${source}`);
}
const newsClient = (manifest[newsPage].imports || [])
  .find((key) => manifest[key]?.name === 'client');
assert.ok(newsClient, 'News route must load the deferred Sanity client chunk');
assert.ok(!initial.has(newsClient), 'Sanity client code must not enter the initial public graph');
const cmsReader = manifest[newsClient].dynamicImports || [];
assert.equal(cmsReader.length, 1, 'Expected one deferred CMS SDK dependency');
async function transferFor(keys) {
  const reachable = new Set(keys.flatMap((key) => [...graph(key)]));
  const total = { bytes: 0, gzip: 0, brotli: 0 };
  for (const key of reachable) {
    if (!manifest[key].file.endsWith('.js')) continue;
    const buffer = await readFile(path.join(output, manifest[key].file));
    total.bytes += buffer.length;
    total.gzip += gzipSync(buffer).length;
    total.brotli += brotliCompressSync(buffer).length;
  }
  return total;
}
const publicStyleGroups = {
  initialPublicPages: await stylesFor([entry]),
  cmsListing: await stylesFor([entry, newsPage, ...cmsReader]),
  cmsCaseStudyDetail: await stylesFor([entry, detail, ...cmsReader]),
};
const report = {
  note: 'Cold-cache JavaScript compression estimates, excluding headers, HTML, CSS, images and video. Initial totals exclude dynamic imports; CMS route totals include their required deferred graphs. Source attribution is not transfer size.',
  initialChunks: chunks,
  total: chunks.reduce((sum, chunk) => ({
    bytes: sum.bytes + chunk.bytes,
    gzip: sum.gzip + chunk.gzip,
    brotli: sum.brotli + chunk.brotli,
  }), { bytes: 0, gzip: 0, brotli: 0 }),
  deferredEntries: { studio: manifest[studio].file, detail: manifest[detail].file, news: manifest[newsPage].file },
  cmsListingIncludingInitial: await transferFor([entry, newsPage, ...cmsReader]),
  cmsDetailIncludingInitial: await transferFor([entry, detail, ...cmsReader]),
  originalSourceCharacters: Object.fromEntries([...sourceCharacters].sort((a, b) => b[1] - a[1])),
  publicStyles: {
    note: 'Stylesheet totals include reachable emitted CSS and imported external CSS. Font totals count unique Latin and Latin-ext font payloads required by the English public pages; WOFF/WOFF2 are already compressed and are measured by their delivered file bytes.',
    budgets: styleBudgets,
    groups: publicStyleGroups,
  },
};
const budgetChecks = [
  { name: 'Initial public pages', actual: report.total.gzip, limit: gzipBudgets.initial },
  { name: 'CMS listing including initial graph', actual: report.cmsListingIncludingInitial.gzip, limit: gzipBudgets.cmsListing },
  { name: 'CMS case-study detail including initial graph', actual: report.cmsDetailIncludingInitial.gzip, limit: gzipBudgets.cmsDetail },
];
for (const [group, styles] of Object.entries(publicStyleGroups)) {
  const label = {
    initialPublicPages: 'Initial public pages',
    cmsListing: 'CMS listing including initial graph',
    cmsCaseStudyDetail: 'CMS case-study detail including initial graph',
  }[group];
  budgetChecks.push(
    { name: `${label} CSS`, actual: styles.cssTotal.gzip, limit: styleBudgets.cssGzip },
    { name: `${label} fonts`, actual: styles.fontTotal.bytes, limit: styleBudgets.fontBytes },
  );
}
report.transferBudgetChecks = budgetChecks.map(({ name, actual, limit }) => ({
  name,
  actual,
  limit,
  passed: actual <= limit,
}));
await mkdir(reportDirectory, { recursive: true });
await writeFile(path.join(reportDirectory, 'after.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
const failures = budgetChecks.filter(({ actual, limit }) => actual > limit);
if (failures.length > 0) {
  const formatKib = (bytes) => `${(bytes / 1000).toFixed(2)} kB`;
  throw new Error([
    'Public transfer budget exceeded:',
    ...failures.map(({ name, actual, limit }) =>
      `- ${name}: ${formatKib(actual)} exceeds ${formatKib(limit)}. Reduce the affected asset group, then rerun build:analyze.`,
    ),
  ].join('\n'));
}
console.log('All public JavaScript, CSS and font budgets passed.');
