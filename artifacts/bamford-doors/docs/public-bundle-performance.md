# Public JavaScript transfer audit

Production builds measured with the same dependency lockfile and Vite settings,
using source maps for attribution and the manifest's full static import graph.
Sizes are decimal kB; gzip uses Node's default gzip settings, matching Vite's
build-size estimates. These are cold-cache compression estimates, not measured
network timings. HTML, CSS, images, video, headers and source maps are excluded.

| Route / required JavaScript | Before raw | After raw | Before gzip | After gzip |
| --- | ---: | ---: | ---: | ---: |
| Home, products, Factory, contact and other static pages | 801.34 kB | 537.87 kB | 227.82 kB | 143.89 kB |
| CMS listing (including deferred SDK) | 801.34 kB | 669.65 kB | 227.82 kB | 184.49 kB |
| CMS case-study detail (including SDK and viewer) | 801.34 kB | 716.40 kB | 227.82 kB | 200.30 kB |

The initial graph saves **263,469 raw bytes (32.9%)** and **83,931 gzip bytes
(36.8%)**. Map-reference comments add a few bytes to diagnostic builds only.

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

It also enforces cold-cache gzip ceilings with modest headroom over the current
measurements:

| Graph | Measured gzip | Maximum gzip |
| --- | ---: | ---: |
| Initial public pages | 143.89 kB | 160 kB |
| CMS listing including initial graph | 184.49 kB | 205 kB |
| CMS case-study detail including initial graph | 200.30 kB | 225 kB |

If a ceiling is exceeded, the command exits unsuccessfully and names the
affected graph, measured size, limit, and recommended direction for reducing
eager JavaScript. The analysis build and its source maps are written under
`generated-artifacts/bundle-analysis/`, not `dist/public`.

For normal output, run `pnpm --filter @workspace/bamford-doors run build`.
Normal builds do not emit source maps or the analysis manifest. No CMS article
indexing or hosting configuration was changed. The named `public-bundle-size`
validation runs the diagnostic build and enforces these budgets.

## Verification

- TypeScript and the normal production build pass. All 48 served canonical
  sitemap URLs pass the static-body/metadata checks; 84 URL variants are built.
  Normal output has no source maps or analysis manifest.
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
