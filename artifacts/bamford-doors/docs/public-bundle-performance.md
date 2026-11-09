# Public asset transfer audit

Production builds measured with the same dependency lockfile and Vite settings,
using source maps for attribution and the manifest's full static import graph.
Sizes are decimal kB; gzip uses Node's default gzip settings, matching Vite's
build-size estimates. These are cold-cache compression estimates, not measured
network timings. The JavaScript totals below exclude HTML, CSS, images, video,
headers and source maps.

| Route / required JavaScript | Before raw | After raw | Before gzip | After gzip |
| --- | ---: | ---: | ---: | ---: |
| Home, products, Factory, contact and other static pages | 801.34 kB | 578.28 kB | 227.82 kB | 156.89 kB |
| CMS listing (including deferred SDK) | 801.34 kB | 710.05 kB | 227.82 kB | 197.50 kB |
| CMS case-study detail (including SDK and viewer) | 801.34 kB | 756.81 kB | 227.82 kB | 213.31 kB |

Against the original bundle, the current initial graph saves **223,065 raw bytes
(27.8%)** and **70,926 gzip bytes (31.1%)**. Map-reference comments add a few
bytes to diagnostic builds only.

## Findings and changes

- Sanity Studio was already lazy and was **not** the reason for the large public
  entry. Its editor and internal feature chunks remain client-only at `/admin`.
- The eager public CMS reader pulled in `@sanity/client`, RxJS, HTTP transport,
  and event-source dependencies. The SDK now loads on the first CMS request,
  shares a cached client, and propagates load failures into the existing error
  states. Published filters, projections, CDN usage, and fresh build-time
  case-study reads have not changed.
- The app mounted a toast host and tooltip provider with no consumers. Removing
  those unused wrappers removes their Radix, positioning and style utilities.
  Contact uses its existing inline errors and receipt, not toast notifications.
- The legacy-route CSV is now loaded only for fallback paths, so normal public
  pages do not transfer route inventory they do not use.
- Case-study details already have empty client-only HTML. Their viewer/dialog
  now loads only on that route. The existing skeleton is shared with the
  Suspense fallback, preserving the loading design.
- Factory has no heavyweight animation dependency: it uses React, a few icons,
  native video and CSS. It and other SSG pages remain eagerly renderable.
  Introducing React.lazy there would make synchronous `renderToString` emit a
  Suspense fallback instead of the complete static body. Its photo/video
  transfers are separate from this JavaScript audit and were not changed.
- React DOM, public page content, the enquiry's React Query client and Portable
  Text still enter the initial graph. No arbitrary vendor split or larger
  warning threshold was used to conceal the remaining size warning.
- Studio's multi-megabyte editor and video-tool chunks still produce build
  warnings, but neither belongs to the initial public dependency graph.

## Reproduce

```sh
NODE_ENV=production pnpm --filter @workspace/bamford-doors run build:analyze
pnpm --filter @workspace/bamford-doors run test:ssg
pnpm --filter @workspace/bamford-doors run typecheck
```

The diagnostic command performs the full static build, writes an ignored
`generated-artifacts/bundle-analysis/after.json`, and checks that the initial
graph excludes Studio, the Sanity SDK, the detail viewer, and the removed
toast/tooltip/dialog dependencies. It reports the complete initial graph plus
the CMS listing/detail graphs without double-counting shared chunks. Original
source-character attribution identifies dependencies but is not a measurement
of their minified transfer size.

It then starts Vite's production preview and requests every JavaScript file in
the initial, CMS listing, and CMS detail graphs through a local gzip-enabled
static-host proxy. The check verifies `Content-Encoding: gzip`, `Vary:
Accept-Encoding`, `Content-Length`, the response body after decompression, and
the total downloaded gzip bytes against the build estimate and the budgets
above. It requests only graph JavaScript: HTML, CSS, images, video, hydration,
and enquiry behavior are outside this transfer check. The local proxy models
the compression response expected from a production static host; it does not
make a request to the deployed domain.

Run the entire analysis and response check with:

```sh
NODE_ENV=production pnpm --filter @workspace/bamford-doors run build:analyze
```

It also enforces the cold-cache gzip ceilings:

| Graph | Measured gzip | Maximum gzip |
| --- | ---: | ---: |
| Initial public pages | 156.89 kB | 160 kB |
| CMS listing including initial graph | 197.50 kB | 205 kB |
| CMS case-study detail including initial graph | 213.31 kB | 225 kB |

If a ceiling is exceeded, the command exits unsuccessfully and names the
affected graph, measured size, limit, and recommended direction for reducing
eager JavaScript. All three current graphs are within budget. The analysis
build and its source maps are written under
`generated-artifacts/bundle-analysis/`, not `dist/public`.

## Public CSS and font budgets

The analyzer also walks the emitted CSS listed by the Vite manifest for the
initial public graph, CMS listing graph, and CMS case-study detail graph. It
counts each reachable emitted stylesheet once, follows external CSS `@import`s,
and measures font files referenced by `@font-face`. The imported Montserrat
stylesheet is fetched using a fixed modern Chrome user agent; if the CDN cannot
be reached or an asset fails to load, the analysis exits with an error instead
of silently omitting it. Font bytes are reported by subset as well as in total:
the Latin subset is used by the current English public copy, while Latin-ext is
requested only when rendered text includes characters outside the Latin
subset's Unicode ranges.

Current measurements (November 6, 2026):

| Public route graph | CSS gzip | Latin subset | Conditional Latin-ext | Combined font ceiling |
| --- | ---: | ---: | ---: | ---: |
| Initial public pages | 55.46 kB | 37.96 kB | 70.69 kB | 125 kB |
| CMS listing including initial graph | 55.46 kB | 37.96 kB | 70.69 kB | 125 kB |
| CMS case-study detail including initial graph | 55.46 kB | 37.96 kB | 70.69 kB | 125 kB |

The CSS measurement includes the emitted stylesheet (54.92 kB gzip) and the
imported Google Fonts stylesheet (0.55 kB gzip). Switching the request to the
Montserrat variable range (`400..800`) reduced the imported stylesheet from
0.66 kB to 0.55 kB gzip. It did not reduce the font files: Google Fonts serves
the same two variable WOFF2 files for the previous five-weight request and the
variable-range request (108,644 bytes total). Each file contains the full
variable weight axis, so requesting five separate weights does not create five
unique font downloads. The public styles explicitly use all five weights:
400, 500, 600, 700, and 800.

The Latin file is 37,956 bytes and the Latin-ext file is 70,688 bytes. The
browser's `unicode-range` rules make Latin-ext conditional rather than part of
every English first visit. The source copy and current published Sanity news
and case-study text contain no characters beyond Latin-1, so the normal page
path needs only the 37,956-byte Latin subset. Latin-ext remains available for
future CMS or page copy using additional Latin characters; removing it would
change those glyphs to the fallback font. The combined 108,644-byte total is
therefore a conservative worst case, not the expected download for current
English-only copy.

Each public route graph has these ceilings:

| Asset group | Measured | Maximum |
| --- | ---: | ---: |
| CSS and imported stylesheets (gzip) | 55.46 kB | 65 kB |
| Latin subset (WOFF2) | 37.96 kB | 50 kB |
| Conditional Latin-ext subset (WOFF2) | 70.69 kB | 75 kB |
| Combined worst-case font payload (WOFF2) | 108.64 kB | 125 kB |

The analyzer reports the CSS and font totals by subset and each asset URL/file
in `generated-artifacts/bundle-analysis/after.json`. If any ceiling is exceeded,
the command exits unsuccessfully and names the route graph and asset group,
measured size, and limit.

For normal output, run `pnpm --filter @workspace/bamford-doors run build`.
Normal builds do not emit source maps or the analysis manifest. No CMS article
indexing or hosting configuration was changed. The named `public-bundle-size`
validation runs the diagnostic build and enforces these budgets.

## Verification

- TypeScript and the normal production build pass. All 50 served canonical
  sitemap URLs pass the static-body/metadata checks.
  Normal output has no source maps or analysis manifest.
- Production-mode preview transfer checks pass for the initial, CMS listing,
  and CMS detail JavaScript graphs through the local gzip static-host proxy.
  Downloaded sizes exactly match the gzip estimates; the published domain was
  not queried.
- A production-browser pass confirmed homepage and Factory hydration without
  mismatch errors, contact query defaults, required-field validation, submission
  payload, receipt rendering and form reset. Submission was intercepted with a
  synthetic response; no enquiry was stored and backend persistence was not
  retested.
- The CMS SDK, detail route and Studio chunks loaded without chunk errors or
  circular-dependency errors. CMS reads and Studio sign-in could not be fully
  verified from the local verification origin (`http://127.0.0.1:18092`):
  Sanity blocked that origin with CORS errors. Existing public error states and
  Studio's project-connection screen appeared. No Sanity origin settings were
  changed, and no authenticated editor operation was tested.
