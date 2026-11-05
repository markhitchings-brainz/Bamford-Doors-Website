---
name: Static SEO routing
description: Why canonical URLs use trailing slashes, why this site uses SSG, and how to verify served static content.
---

Keep canonical and sitemap page URLs in directory form with trailing slashes while the build emits route-specific index.html files.

**Why:** Vite preview serves those generated files at trailing-slash URLs; slashless requests use the SPA fallback and initially expose homepage metadata.

**How to apply:** Check the raw HTTP response at canonical sitemap URLs, not only the generated files. Recheck production routing after publishing before claiming the static metadata is live.

Keep public page rendering build-time/static rather than introducing a runtime server solely for SEO.

**Why:** The hosting contract is static, and these public pages do not need request-time data. Rendering the existing React tree preserves the design and avoids maintaining separate crawler content.

**How to apply:** Verify body text, H1, links and metadata in HTTP responses at the canonical directory URLs, then verify hydration in the browser. Retain an empty client-only shell for fallback routes: using the pre-rendered homepage as the catch-all causes wrong content and hydration mismatches. CMS article SEO remains a separate concern.

Keep synchronous static pages free of unresolved lazy boundaries when reducing public JavaScript.

**Why:** The existing static rendering contract needs complete bodies; synchronous React rendering cannot wait for a lazy route and would serialize its Suspense fallback instead. A smaller entry is not worth losing the rendered content.

**How to apply:** Prefer deferring data SDKs until an actual request or splitting routes that are already client-only. Broader route splitting needs an explicit SSG-compatible loading strategy, not just React.lazy.

Disable client dependency discovery in build-only Vite middleware used to load application modules.

**Why:** Once generated directory HTML exists, discovery can scan those output pages as source entries and report unresolved bundle asset imports. Network-backed build loaders leave enough time for that unnecessary scan to run.

**How to apply:** Keep browser dependency optimisation out of metadata/SSG module-loading servers; verify the build output and raw canonical responses instead.
