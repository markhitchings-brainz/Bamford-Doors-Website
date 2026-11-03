---
name: Static SEO routing
description: Why canonical URLs use trailing slashes and how to verify the metadata-only static output.
---

Keep canonical and sitemap page URLs in directory form with trailing slashes while the build emits route-specific index.html files.

**Why:** Vite preview serves those generated files at trailing-slash URLs; slashless requests use the SPA fallback and initially expose homepage metadata.

**How to apply:** Check the raw HTTP response at canonical sitemap URLs, not only the generated files. Recheck production routing after publishing before claiming the static metadata is live.

Describe the current approach as pre-rendered metadata, not full page-body SSR.

**Why:** It preserves the existing React/static application without a framework migration; the visible page body still relies on JavaScript.

**How to apply:** Treat full page-content pre-rendering and CMS article SEO as separate work, and do not imply that all crawler rendering limitations have been eliminated.
