---
name: Static rendering dependency identity
description: Shared workspace dependencies may use different peer instances in server rendering even when the client bundle works.
---

When adding server rendering to workspace React code, check identity of both React and context-providing libraries across package boundaries.

**Why:** The initial static-rendering attempt encountered both a null React hook dispatcher and a missing query-provider context. Different workspace peer resolutions can cause two copies of the same library; solving React identity alone does not solve duplicated provider contexts.

**How to apply:** Make the SSR module pipeline and deduplication rules agree on the application's library instance, including provider libraries used by shared hooks. Verify a page that actually uses shared hooks, not only presentational pages. Do not deduplicate transitive-only dependencies against a package root that cannot resolve them.
