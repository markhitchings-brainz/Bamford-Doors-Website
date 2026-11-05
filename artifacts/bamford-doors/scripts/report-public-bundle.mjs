import assert from 'node:assert/strict';
import { readFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync, brotliCompressSync } from 'node:zlib';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.join(packageRoot, 'dist/public');
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
assert.ok(studio && manifest[studio].isDynamicEntry, 'Studio must stay lazy');
assert.ok(!initial.has(studio), 'Studio must not enter the public static graph');
assert.ok(detail && manifest[detail].isDynamicEntry, 'Case study detail must stay lazy');
assert.ok(!initial.has(detail), 'Detail viewer must not enter the public static graph');
for (const source of initialSources) {
  assert.ok(!/node_modules\/(?:\.pnpm\/[^/]+\/node_modules\/)?(?:sanity|@sanity\/client|@radix-ui\/react-(?:toast|tooltip|dialog))\//.test(source),
    `Unexpected deferred dependency in initial graph: ${source}`);
}
const cmsReader = (manifest[entry].dynamicImports || []).filter((key) => key !== studio && key !== detail);
assert.equal(cmsReader.length, 1, 'Expected one deferred CMS SDK entry');
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
const report = {
  note: 'Cold-cache JavaScript compression estimates, excluding headers, HTML, CSS, images and video. Initial totals exclude dynamic imports; CMS route totals include their required deferred graphs. Source attribution is not transfer size.',
  initialChunks: chunks,
  total: chunks.reduce((sum, chunk) => ({
    bytes: sum.bytes + chunk.bytes,
    gzip: sum.gzip + chunk.gzip,
    brotli: sum.brotli + chunk.brotli,
  }), { bytes: 0, gzip: 0, brotli: 0 }),
  deferredEntries: { studio: manifest[studio].file, detail: manifest[detail].file },
  cmsListingIncludingInitial: await transferFor([entry, ...cmsReader]),
  cmsDetailIncludingInitial: await transferFor([entry, ...cmsReader, detail]),
  originalSourceCharacters: Object.fromEntries([...sourceCharacters].sort((a, b) => b[1] - a[1])),
};
const reportDirectory = path.resolve(packageRoot, '../../generated-artifacts/bundle-analysis');
await mkdir(reportDirectory, { recursive: true });
await writeFile(path.join(reportDirectory, 'after.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
