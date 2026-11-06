---
name: Public asset budgets
description: How the public CSS and font transfer audit handles remote font assets.
---

Include external stylesheets imported by public-route CSS and the Latin/Latin-ext font payloads they declare in the transfer budgets. Treat a failed CDN fetch as an audit error rather than reporting a partial total.

**Why:** The public CSS imports Montserrat from Google Fonts, so emitted CSS alone omits both the font stylesheet and the font files that affect first-page transfer.

**How to apply:** When changing public font imports or CSS graph measurement, update the analyzer and documented budgets together; keep Studio-only styles out of public-route totals.
