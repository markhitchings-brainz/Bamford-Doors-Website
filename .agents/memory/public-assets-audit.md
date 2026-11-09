---
name: Public asset budgets
description: How the public CSS and font transfer audit handles remote font assets.
---

Include external stylesheets imported by public-route CSS and the Latin/Latin-ext font payloads they declare in the transfer budgets. Treat a failed CDN fetch as an audit error rather than reporting a partial total.

**Why:** The public CSS imports Montserrat from Google Fonts, so emitted CSS alone omits both the font stylesheet and the font files that affect first-page transfer.

**How to apply:** When changing public font imports or CSS graph measurement, update the analyzer and documented budgets together; keep Studio-only styles out of public-route totals.

Count the CMS client's on-demand SDK dependency as well as the route's static imports when measuring CMS routes.

**Why:** Moving routes behind lazy boundaries can relocate an SDK dynamic import from the root entry into a shared client chunk. Counting only root dynamic imports or route static imports under-reports the transfer.

**How to apply:** Inspect the emitted manifest after route splitting and include nested, required dynamic dependencies in route budgets without including Studio's unrelated dependencies.

For Montserrat, request the public site's used variable range (`400..800`) rather than enumerating weights. Google serves the same two variable WOFF2 files either way, so the range saves stylesheet bytes but not font bytes. Keep Latin-ext available and report it as conditional: the browser's `unicode-range` avoids that file unless page text needs characters outside Latin.

**Why:** The public styles use all five weights from 400 through 800, but modern Google Fonts responses share one variable file per Latin subset. Current English copy only needs the base Latin file; future CMS content can require the extended file.

**How to apply:** Preserve the variable range and separate Latin/Latin-ext reporting in public asset audits. Treat combined font bytes as a worst-case ceiling, not the expected transfer for Latin-only copy.
