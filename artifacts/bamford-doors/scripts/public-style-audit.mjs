import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { brotliCompressSync, gzipSync } from 'node:zlib';

const fontFilePattern = /\.(?:woff2?|ttf|otf)(?:[?#].*)?$/i;

export function referencedUrls(css, pattern) {
  return [...css.matchAll(pattern)].map((match) => match[2] || match[1]);
}

export async function fetchRemote(url, cache, fetchImpl = fetch) {
  if (!cache.has(url)) {
    cache.set(url, (async () => {
      let response;
      try {
        response = await fetchImpl(url, {
          headers: {
            accept: 'text/css,*/*;q=0.1',
            'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
          },
          signal: AbortSignal.timeout(15_000),
        });
      } catch (error) {
        throw new Error(`Could not measure public asset ${url}: ${error.message}`, { cause: error });
      }
      assert.ok(response.ok, `Could not measure public asset ${url}: HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    })());
  }
  return cache.get(url);
}

export async function stylesFor(
  keys,
  {
    manifest,
    output,
    readFileImpl = readFile,
    fetchImpl = fetch,
    remoteCssCache = new Map(),
    fontAssetCache = new Map(),
  },
) {
  const cssFiles = new Set();
  const graph = (key, seen = new Set()) => {
    if (seen.has(key)) return seen;
    assert.ok(manifest[key], `Missing manifest entry: ${key}`);
    seen.add(key);
    for (const dependency of manifest[key].imports || []) graph(dependency, seen);
    return seen;
  };

  for (const key of keys.flatMap((item) => [...graph(item)])) {
    for (const file of manifest[key].css || []) cssFiles.add(file);
    if (manifest[key].file.endsWith('.css')) cssFiles.add(manifest[key].file);
  }

  const cssAssets = [];
  const externalStylesheetUrls = new Set();
  const fontResources = new Map();
  const pendingStylesheets = [];
  for (const file of cssFiles) {
    const buffer = await readFileImpl(path.join(output, file));
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
      fontResources.set(path.relative(output, localPath), {
        subset: 'local',
        load: async () => readFileImpl(localPath),
      });
    }
  }

  // Follow imported stylesheets as well as CSS emitted into the build. This
  // includes font files referenced by external @font-face declarations.
  for (let index = 0; index < pendingStylesheets.length; index += 1) {
    const url = pendingStylesheets[index];
    const buffer = await fetchRemote(url, remoteCssCache, fetchImpl);
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
          fontResources.set(fontUrl, {
            subset: subset?.trim().toLowerCase() || 'unlabelled',
            load: () => fetchRemote(fontUrl, fontAssetCache, fetchImpl),
          });
        }
      }
    }
  }

  const externalStylesheets = [];
  for (const url of externalStylesheetUrls) {
    const buffer = await fetchRemote(url, remoteCssCache, fetchImpl);
    externalStylesheets.push({
      url,
      bytes: buffer.length,
      gzip: gzipSync(buffer).length,
      brotli: brotliCompressSync(buffer).length,
    });
  }

  const fontAssets = [];
  for (const [file, resource] of fontResources) {
    const buffer = await resource.load();
    fontAssets.push({
      file,
      subset: resource.subset,
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
  const fontTotalsBySubset = Object.fromEntries(
    [...new Set(fontAssets.map(({ subset }) => subset))]
      .sort()
      .map((subset) => [subset, sum(fontAssets.filter((asset) => asset.subset === subset))]),
  );
  return {
    cssAssets,
    externalStylesheets,
    cssTotal,
    fontAssets,
    fontTotal,
    fontTotalsBySubset,
  };
}

export function assertWithinBudgets(budgetChecks) {
  const failures = budgetChecks.filter(({ actual, limit }) => actual > limit);
  if (failures.length === 0) return;
  const formatKib = (bytes) => `${(bytes / 1000).toFixed(2)} kB`;
  throw new Error([
    'Public transfer budget exceeded:',
    ...failures.map(({ name, actual, limit }) =>
      `- ${name}: ${formatKib(actual)} exceeds ${formatKib(limit)}. Reduce the affected asset group, then rerun build:analyze.`,
    ),
  ].join('\n'));
}
