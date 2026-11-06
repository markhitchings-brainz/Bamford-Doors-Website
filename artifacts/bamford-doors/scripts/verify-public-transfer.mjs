import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createServer, request as httpRequest } from 'node:http';
import { once } from 'node:events';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync, gzipSync } from 'node:zlib';

const packageRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const output = path.resolve(packageRoot, '../../generated-artifacts/bundle-analysis/public');
const reportPath = path.resolve(packageRoot, '../../generated-artifacts/bundle-analysis/after.json');
const manifest = JSON.parse(await readFile(path.join(output, '.vite/manifest.json'), 'utf8'));
const report = JSON.parse(await readFile(reportPath, 'utf8'));
const entry = Object.keys(manifest).find((key) => manifest[key].isEntry);
assert.ok(entry, 'Expected a browser entry in the analysis build manifest');

function graph(key, seen = new Set()) {
  assert.ok(manifest[key], `Missing manifest entry: ${key}`);
  if (seen.has(key)) return seen;
  seen.add(key);
  for (const dependency of manifest[key].imports || []) graph(dependency, seen);
  return seen;
}

const studio = Object.keys(manifest).find((key) => manifest[key].name === 'StudioPage' && manifest[key].isDynamicEntry);
const detail = Object.keys(manifest).find((key) => manifest[key].name === 'CaseStudyDetailPage' && manifest[key].isDynamicEntry);
const newsPage = Object.keys(manifest).find((key) => manifest[key].name === 'NewsInsightsPage' && manifest[key].isDynamicEntry);
const caseStudiesIndex = Object.keys(manifest).find((key) => manifest[key].name === 'CaseStudiesPage' && manifest[key].isDynamicEntry);
const legacyInventory = Object.keys(manifest).find((key) => {
  const item = manifest[key];
  return item.isDynamicEntry && [key, item.name, item.src, item.file]
    .some((value) => typeof value === 'string' && value.includes('legacy-route-inventory'));
});
assert.ok(studio && detail && newsPage && caseStudiesIndex && legacyInventory, 'Expected deferred Studio, detail pages, listings, and legacy inventory entries');
const initialGraph = graph(entry);
assert.ok(!initialGraph.has(legacyInventory), 'Legacy route inventory must not enter the initial graph');
assert.ok(!initialGraph.has(newsPage), 'News pages must not enter the initial graph');
assert.ok(!initialGraph.has(caseStudiesIndex), 'Case study listing must not enter the initial graph');
const newsClient = (manifest[newsPage].imports || [])
  .find((key) => manifest[key]?.name === 'client');
assert.ok(newsClient, 'News route must load the deferred Sanity client chunk');
assert.ok(!initialGraph.has(newsClient), 'Sanity client code must not enter the initial public graph');

const graphSpecs = [
  {
    name: 'Initial public pages',
    keys: [entry],
    reportValue: report.total,
    budgetName: 'Initial public pages',
  },
  {
    name: 'CMS listing including initial graph',
    keys: [entry, newsPage],
    reportValue: report.cmsListingIncludingInitial,
    budgetName: 'CMS listing including initial graph',
  },
  {
    name: 'CMS case-study detail including initial graph',
    keys: [entry, detail],
    reportValue: report.cmsDetailIncludingInitial,
    budgetName: 'CMS case-study detail including initial graph',
  },
];

const assets = new Map();
for (const spec of graphSpecs) {
  spec.files = new Set();
  for (const key of spec.keys.flatMap((item) => [...graph(item)])) {
    const file = manifest[key].file;
    if (!file.endsWith('.js')) continue;
    spec.files.add(file);
    if (!assets.has(file)) {
      const bytes = await readFile(path.join(output, file));
      assets.set(file, { bytes, gzipBytes: gzipSync(bytes).length });
    }
  }
}

const port = await new Promise((resolve, reject) => {
  const server = createServer();
  server.once('error', reject);
  server.listen(0, '127.0.0.1', () => {
    const address = server.address();
    const availablePort = address.port;
    server.close((error) => error ? reject(error) : resolve(availablePort));
  });
});

const preview = spawn(
  'pnpm',
  ['exec', 'vite', 'preview', '--config', 'vite.config.ts', '--host', '127.0.0.1', '--port', String(port), '--strictPort'],
  {
    cwd: packageRoot,
    env: {
      ...process.env,
      BASE_PATH: '/',
      BUNDLE_ANALYZE: '1',
      NODE_ENV: 'production',
      PORT: String(port),
    },
    stdio: ['ignore', 'pipe', 'pipe'],
  },
);
let previewLog = '';
preview.stdout.setEncoding('utf8').on('data', (chunk) => { previewLog += chunk; });
preview.stderr.setEncoding('utf8').on('data', (chunk) => { previewLog += chunk; });

async function waitForPreview() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (preview.exitCode !== null) throw new Error(`Vite preview exited before starting:\n${previewLog}`);
    try {
      const response = await fetch(`http://127.0.0.1:${port}/`, { signal: AbortSignal.timeout(500) });
      if (response.ok) return;
    } catch {
      // The preview process may still be starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
  }
  throw new Error(`Vite preview did not become ready:\n${previewLog}`);
}

function requestRaw(url, headers) {
  return new Promise((resolve, reject) => {
    const request = httpRequest(url, { headers }, (response) => {
      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve({
        status: response.statusCode,
        headers: response.headers,
        body: Buffer.concat(chunks),
      }));
    });
    request.once('error', reject);
    request.end();
  });
}

const proxy = createServer(async (request, response) => {
  try {
    assert.equal(request.method, 'GET', 'Transfer check sends GET requests only');
    const url = new URL(request.url || '/', 'http://transfer-check.local');
    const file = decodeURIComponent(url.pathname.replace(/^\/+/, ''));
    const asset = assets.get(file);
    assert.ok(asset, `Refusing to serve an asset outside the JavaScript graphs: ${url.pathname}`);
    assert.match(request.headers['accept-encoding'] || '', /(?:^|,\s*)gzip(?:\s*[,;]|$)/i,
      'Client must request gzip content encoding');

    const upstream = await fetch(`http://127.0.0.1:${port}/${file}`, {
      headers: { 'accept-encoding': 'identity' },
      signal: AbortSignal.timeout(10_000),
    });
    assert.equal(upstream.status, 200, `Vite preview did not serve ${file}`);
    assert.match(upstream.headers.get('content-type') || '', /javascript/i,
      `Vite preview returned a non-JavaScript content type for ${file}`);
    assert.equal(upstream.headers.get('content-encoding'), null,
      `Expected the Vite preview origin to return identity bytes for ${file}`);
    const sourceBytes = Buffer.from(await upstream.arrayBuffer());
    assert.deepEqual(sourceBytes, asset.bytes, `Vite preview bytes differ from the production build for ${file}`);

    const compressed = gzipSync(sourceBytes);
    response.writeHead(200, {
      'content-type': upstream.headers.get('content-type'),
      'content-encoding': 'gzip',
      'content-length': compressed.length,
      'cache-control': 'public, max-age=31536000, immutable',
      vary: 'Accept-Encoding',
    });
    response.end(compressed);
  } catch (error) {
    response.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
    response.end(error instanceof Error ? error.message : String(error));
  }
});

try {
  await waitForPreview();
  await new Promise((resolve, reject) => {
    proxy.once('error', reject);
    proxy.listen(0, '127.0.0.1', resolve);
  });
  const proxyPort = proxy.address().port;
  const results = [];
  const failures = [];
  const budgets = new Map((report.transferBudgetChecks || []).map((check) => [check.name, check.limit]));

  for (const spec of graphSpecs) {
    let downloadedBytes = 0;
    let estimatedGzipBytes = 0;
    for (const file of spec.files) {
      const asset = assets.get(file);
      estimatedGzipBytes += asset.gzipBytes;
      const response = await requestRaw(`http://127.0.0.1:${proxyPort}/${encodeURI(file)}`, {
        'accept-encoding': 'gzip',
        'cache-control': 'no-cache',
      });
      assert.equal(response.status, 200, `Failed to download ${file}: HTTP ${response.status}`);
      assert.equal(response.headers['content-encoding'], 'gzip', `Missing gzip Content-Encoding for ${file}`);
      assert.match(response.headers['content-type'] || '', /javascript/i, `Unexpected content type for ${file}`);
      assert.match(response.headers.vary || '', /accept-encoding/i, `Missing Vary: Accept-Encoding for ${file}`);
      assert.equal(Number(response.headers['content-length']), response.body.length,
        `Content-Length does not match the downloaded body for ${file}`);
      assert.deepEqual(gunzipSync(response.body), asset.bytes, `Gzip response did not reproduce ${file}`);
      assert.equal(response.body.length, asset.gzipBytes,
        `Gzip transfer size differs from the build estimate for ${file}`);
      downloadedBytes += response.body.length;
    }

    const limit = budgets.get(spec.budgetName);
    assert.ok(Number.isFinite(limit), `Missing documented gzip budget for ${spec.name}`);
    assert.equal(downloadedBytes, estimatedGzipBytes, `${spec.name} transfer total differs from the build estimate`);
    assert.equal(downloadedBytes, spec.reportValue.gzip, `${spec.name} transfer total differs from the audit report`);
    const withinBudget = downloadedBytes <= limit;
    if (!withinBudget) {
      failures.push(
        `${spec.name}: ${(downloadedBytes / 1000).toFixed(2)} kB gzip exceeds ${(limit / 1000).toFixed(2)} kB`,
      );
    }
    results.push({
      graph: spec.name,
      javascriptFiles: spec.files.size,
      downloadedGzipBytes: downloadedBytes,
      estimatedGzipBytes,
      maximumGzipBytes: limit,
      compressionHeadersAndBodyPassed: true,
      sizeMatchesEstimate: true,
      withinDocumentedBudget: withinBudget,
    });
  }

  console.log(JSON.stringify({
    server: 'production-mode Vite preview behind a local gzip-enabled static-host proxy',
    scope: 'JavaScript only; HTML, CSS, images, video, hydration and enquiry behavior are excluded',
    results,
  }, null, 2));
  if (failures.length > 0) {
    throw new Error(['Downloaded JavaScript exceeded its documented budget:', ...failures.map((failure) => `- ${failure}`)].join('\n'));
  }
} finally {
  await new Promise((resolve) => proxy.close(resolve));
  preview.kill('SIGTERM');
  await Promise.race([once(preview, 'exit'), new Promise((resolve) => setTimeout(resolve, 2_000))]);
  if (preview.exitCode === null) preview.kill('SIGKILL');
}
